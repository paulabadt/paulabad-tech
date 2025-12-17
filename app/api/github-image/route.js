import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');
  const branch = searchParams.get('branch') || 'main';
  const path = searchParams.get('path');
  
  console.log('🔍 Proxy request:', { owner, repo, branch, path });
  
  if (!owner || !repo || !path) {
    return new NextResponse('Missing parameters', { status: 400 });
  }

  try {
    // ⭐ USAR GITHUB RAW URL (cambiado de raw.githubusercontent a github.com/raw)
    const imageUrl = `https://github.com/${owner}/${repo}/raw/${branch}/${path}`;
    
    console.log('📥 Fetching from:', imageUrl);
    
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
    });

    if (!response.ok) {
      console.error(`❌ Failed: ${response.status} ${response.statusText}`);
      return new NextResponse(`Image not found: ${response.statusText}`, { 
        status: response.status 
      });
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    console.log('✅ Image fetched successfully, type:', contentType);

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
    });
  } catch (error) {
    console.error('❌ Error proxying image:', error);
    return new NextResponse(`Error: ${error.message}`, { status: 500 });
  }
}

// ⭐ AGREGAR SOPORTE PARA OPTIONS (CORS preflight)
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}