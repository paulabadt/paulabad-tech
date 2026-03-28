import { NextRequest, NextResponse } from 'next/server';
import { runWebAnalysis } from '@/lib/web-analysis/analyzer';

// In-memory rate limiter: max 10 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }

  if (entry.count >= 10) return false;

  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const timestamp = new Date().toISOString();
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown';

  console.log(`[${timestamp}] POST /api/analyze-website from ${ip}`);

  // 1. Authenticate
  const apiKey = request.headers.get('x-internal-api-key');
  if (!apiKey || apiKey !== process.env.INTERNAL_API_KEY) {
    console.log(`[${timestamp}] 401 — missing or invalid API key`);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Rate limit
  if (!checkRateLimit(ip)) {
    console.log(`[${timestamp}] 429 — rate limit exceeded for ${ip}`);
    return NextResponse.json({ error: 'Too many requests. Maximum 10 per minute.' }, { status: 429 });
  }

  // 3. Parse body
  let body: { url?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { url } = body;

  if (!url || typeof url !== 'string' || url.trim() === '') {
    return NextResponse.json({ error: 'Missing required field: url' }, { status: 400 });
  }

  // 4. Validate URL format
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
  } catch {
    return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
  }

  // 5. Check URL reachability (10 s timeout)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10_000);

    try {
      const res = await fetch(parsedUrl.toString(), {
        method: 'HEAD',
        signal: controller.signal,
        redirect: 'follow',
      });
      clearTimeout(timeoutId);

      // Treat 4xx/5xx from the *target* as unreachable for analysis purposes
      if (res.status >= 400) {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (headErr: any) {
      clearTimeout(timeoutId);
      // Some servers reject HEAD — fall back to GET with early abort
      if (headErr?.name !== 'AbortError' && !String(headErr?.message).startsWith('HTTP')) {
        const controller2 = new AbortController();
        const timeoutId2 = setTimeout(() => controller2.abort(), 10_000);
        const res2 = await fetch(parsedUrl.toString(), {
          method: 'GET',
          signal: controller2.signal,
          redirect: 'follow',
        });
        clearTimeout(timeoutId2);
        if (res2.status >= 400) throw new Error(`HTTP ${res2.status}`);
      } else {
        throw headErr;
      }
    }
  } catch (err: any) {
    const isTimeout = err?.name === 'AbortError';
    const msg = isTimeout
      ? 'URL timed out (>10 s)'
      : `URL not reachable: ${err?.message ?? 'unknown error'}`;
    console.log(`[${timestamp}] 422 — ${msg}`);
    return NextResponse.json({ error: msg }, { status: 422 });
  }

  // 6. Run analysis
  try {
    console.log(`[${timestamp}] Starting analysis for ${parsedUrl.toString()}`);
    const result = await runWebAnalysis(parsedUrl.toString());
    console.log(`[${timestamp}] Analysis complete — score: ${result.score} for ${parsedUrl.toString()}`);

    return NextResponse.json({
      success: true,
      score:      result.score,
      issues:     result.issues,
      pdf_url:    result.pdf_url,
      summary:    result.summary,
      categories: result.categories,
    });
  } catch (err: any) {
    console.error(`[${timestamp}] Analysis failed for ${parsedUrl.toString()}:`, err?.message);
    return NextResponse.json(
      { error: 'Analysis failed', details: err?.message ?? 'unknown error' },
      { status: 500 },
    );
  }
}
