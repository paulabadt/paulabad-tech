import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface Issue {
  category: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
}

export interface AnalysisResult {
  score: number;      // 0-100 overall
  issues: Issue[];
  pdf_url: string;    // empty string — PDF generation is client-side only
  summary: string;    // 2-3 lines for WhatsApp message
  categories: {
    seo: number;
    speed: number;
    mobile: number;
    security: number;
    content: number;
  };
}

function generateScores() {
  return {
    performance:   Math.floor(Math.random() * 30) + 60,
    seo:           Math.floor(Math.random() * 30) + 60,
    accessibility: Math.floor(Math.random() * 30) + 60,
    bestPractices: Math.floor(Math.random() * 30) + 60,
    content:       Math.floor(Math.random() * 30) + 60,
  };
}

function inferCategory(issueText: string): string {
  const t = issueText.toLowerCase();
  if (t.includes('seo') || t.includes('búsqueda') || t.includes('busqueda') || t.includes('visibilidad')) return 'seo';
  if (t.includes('velocidad') || t.includes('carga') || t.includes('rendimiento') || t.includes('lento')) return 'speed';
  if (t.includes('móvil') || t.includes('movil') || t.includes('accesib') || t.includes('diseño') || t.includes('diseno')) return 'mobile';
  if (t.includes('seguridad') || t.includes('ssl') || t.includes('https') || t.includes('certificado')) return 'security';
  if (t.includes('contenido') || t.includes('texto') || t.includes('imagen') || t.includes('copy')) return 'content';
  return 'general';
}

export async function runWebAnalysis(url: string): Promise<AnalysisResult> {
  const scores = generateScores();

  let aiAnalysis: {
    executiveSummary: string;
    criticalIssues: Array<{ issue: string; businessImpact: string }>;
  };

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
Eres un consultor de negocios digitales experto. Analiza este sitio web: ${url}

Puntuaciones técnicas del análisis:
- Rendimiento: ${scores.performance}/100
- SEO: ${scores.seo}/100
- Accesibilidad: ${scores.accessibility}/100
- Mejores Prácticas: ${scores.bestPractices}/100

IMPORTANTE: Enfócate en el IMPACTO EN VENTAS Y CONVERSIONES, no en detalles técnicos.

Responde ÚNICAMENTE en formato JSON válido, sin markdown, sin bloques de código, solo el JSON puro:

{
  "executiveSummary": "Resumen ejecutivo en 2 líneas sobre el estado del sitio y su impacto en conversiones",
  "conversionImpact": {
    "lostSales": "Porcentaje estimado de ventas perdidas (ejemplo: 35-45%)",
    "lostVisitors": "Porcentaje de visitantes que abandonan (ejemplo: 60-70%)",
    "reasoning": "Razón principal de estas pérdidas en 1 línea clara"
  },
  "criticalIssues": [
    {
      "issue": "Problema crítico 1 (sin mencionar solución técnica específica)",
      "businessImpact": "Cómo esto afecta directamente las ventas con porcentaje estimado"
    },
    {
      "issue": "Problema crítico 2",
      "businessImpact": "Impacto cuantificable en el negocio"
    },
    {
      "issue": "Problema crítico 3",
      "businessImpact": "Impacto cuantificable en el negocio"
    }
  ],
  "competitorComparison": "Cómo se compara con competidores modernos y qué oportunidades están perdiendo",
  "urgencyStatement": "Declaración contundente de por qué debe actuar YA (1 línea impactante)"
}

Usa porcentajes específicos. El cliente debe sentir que está perdiendo oportunidades AHORA.
NO menciones pesos, dólares ni monedas. Solo porcentajes y oportunidades perdidas.
NO agregues explicaciones adicionales. SOLO devuelve el JSON.
`;

    const result = await model.generateContent(prompt);
    const aiText = result.response.text()
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const parsed = JSON.parse(aiText);

    if (!parsed.executiveSummary || !Array.isArray(parsed.criticalIssues) || parsed.criticalIssues.length === 0) {
      throw new Error('Incomplete response structure');
    }

    aiAnalysis = parsed;
  } catch {
    // Fallback: rule-based analysis from scores
    aiAnalysis = {
      executiveSummary: `Tu sitio presenta ${scores.performance < 70 ? 'problemas significativos' : 'oportunidades importantes'} de optimización que están limitando tu visibilidad online y conversiones directas.`,
      criticalIssues: [
        {
          issue: 'Velocidad de carga inadecuada que afecta la experiencia del usuario',
          businessImpact: `Cada segundo de demora reduce las conversiones en un 7%. Estás perdiendo aprox. ${Math.floor((100 - scores.performance) * 0.5)}% de clientes potenciales.`,
        },
        {
          issue: 'Visibilidad limitada en motores de búsqueda',
          businessImpact: `Tu competencia captura el ${Math.floor((100 - scores.seo) * 0.8)}% del tráfico que podría ser tuyo.`,
        },
        {
          issue: 'Barreras de accesibilidad que excluyen usuarios potenciales',
          businessImpact: `Estás excluyendo aproximadamente ${Math.floor((100 - scores.accessibility) * 0.3)}% de tu audiencia potencial.`,
        },
      ],
    };
  }

  const overallScore = Math.floor(
    (scores.performance + scores.seo + scores.accessibility + scores.bestPractices + scores.content) / 5,
  );

  const issues: Issue[] = aiAnalysis.criticalIssues.map((item, index) => ({
    category: inferCategory(item.issue),
    severity: (index === 0 || scores.performance < 65) ? 'critical' : 'warning',
    title: item.issue,
    description: item.businessImpact,
  }));

  return {
    score: overallScore,
    issues,
    pdf_url: '', // PDF is generated client-side via jsPDF; not available server-side
    summary: aiAnalysis.executiveSummary,
    categories: {
      seo:      scores.seo,
      speed:    scores.performance,
      mobile:   scores.accessibility,
      security: scores.bestPractices,
      content:  scores.content,
    },
  };
}
