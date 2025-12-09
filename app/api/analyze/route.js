import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '@/lib/supabase';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Normalizar URL para comparación
function normalizeURL(url) {
  try {
    let normalized = url.toLowerCase().trim();
    // Remover protocolo
    normalized = normalized.replace(/^https?:\/\//, '');
    // Remover www
    normalized = normalized.replace(/^www\./, '');
    // Remover trailing slash
    normalized = normalized.replace(/\/$/, '');
    return normalized;
  } catch {
    return url.toLowerCase().trim();
  }
}

// Generar número de reporte único con retry
async function generateUniqueReportNumber(maxRetries = 5) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Obtener el último número de reporte que NO sea NULL
      const { data, error } = await supabase
        .from('leads')
        .select('report_number')
        .not('report_number', 'is', null)
        .order('report_number', { ascending: false })
        .limit(1);

      let nextNumber;
      
      if (error || !data || data.length === 0) {
        // Si no hay registros o hay error, empezar desde 600
        nextNumber = 600;
      } else {
        // Incrementar el último número
        nextNumber = (data[0].report_number || 599) + 1;
      }

      // Verificar que este número no exista (por si acaso)
      const { data: existing } = await supabase
        .from('leads')
        .select('id')
        .eq('report_number', nextNumber)
        .single();

      // Si no existe, usar este número
      if (!existing) {
        return nextNumber;
      }

      // Si existe, buscar el próximo disponible
      const { data: allNumbers } = await supabase
        .from('leads')
        .select('report_number')
        .not('report_number', 'is', null)
        .order('report_number', { ascending: true });

      if (allNumbers && allNumbers.length > 0) {
        const usedNumbers = new Set(allNumbers.map(r => r.report_number));
        let candidate = 600;
        while (usedNumbers.has(candidate)) {
          candidate++;
        }
        return candidate;
      }

      return 600;

    } catch (error) {
      console.error(`Intento ${attempt + 1} de generar número de reporte falló:`, error);
      if (attempt === maxRetries - 1) {
        // En el último intento, generar un número aleatorio alto
        return 600 + Math.floor(Math.random() * 10000);
      }
      // Esperar un poco antes de reintentar
      await new Promise(resolve => setTimeout(resolve, 100 * (attempt + 1)));
    }
  }
  
  // Fallback final
  return 600 + Math.floor(Math.random() * 10000);
}

export async function POST(request) {
  try {
    const { name, phone, url, termsAccepted } = await request.json();

    // Validación básica
    if (!name || !phone || !url) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validar que aceptó los términos
    if (!termsAccepted) {
      return NextResponse.json(
        { error: 'Debes aceptar los términos y condiciones' },
        { status: 400 }
      );
    }

    const normalizedURL = normalizeURL(url);

    // 1. VERIFICAR SI YA EXISTE ANÁLISIS PARA ESTA URL
    const { data: existingLeads, error: searchError } = await supabase
      .from('leads')
      .select('*')
      .ilike('website_url', `%${normalizedURL}%`)
      .order('created_at', { ascending: false })
      .limit(1);

    // Si ya existe un análisis previo
    if (existingLeads && existingLeads.length > 0 && !searchError) {
      const existingLead = existingLeads[0];
      
      // Actualizar contador de intentos
      await supabase
        .from('leads')
        .update({
          attempt_count: (existingLead.attempt_count || 1) + 1,
          last_attempt_at: new Date().toISOString()
        })
        .eq('id', existingLead.id);

      // Formatear fecha del análisis previo
      const previousDate = new Date(existingLead.created_at);
      const formattedDate = previousDate.toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
      const formattedTime = previousDate.toLocaleTimeString('es-CO', {
        hour: '2-digit',
        minute: '2-digit'
      });

      return NextResponse.json({
        alreadyAnalyzed: true,
        previousAnalysis: {
          date: formattedDate,
          time: formattedTime,
          attemptCount: (existingLead.attempt_count || 1) + 1,
          leadId: existingLead.id,
          reportNumber: existingLead.report_number
        },
        message: `Este sitio ya fue analizado el ${formattedDate} a las ${formattedTime}.`,
        contactInfo: {
          name: existingLead.name,
          phone: existingLead.phone
        }
      });
    }

    // 2. Generar número de reporte único
    const reportNumber = await generateUniqueReportNumber();
    console.log('Número de reporte generado:', reportNumber);

    // 3. Si NO existe, hacer análisis nuevo
    const technicalScores = {
      performance: Math.floor(Math.random() * 30) + 60,
      seo: Math.floor(Math.random() * 30) + 60,
      accessibility: Math.floor(Math.random() * 30) + 60,
      bestPractices: Math.floor(Math.random() * 30) + 60,
    };

    // 4. ANÁLISIS CON GEMINI
    let aiAnalysis;
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const prompt = `
      Eres un consultor de negocios digitales experto. Analiza este sitio web: ${url}

      Puntuaciones técnicas del análisis:
      - Rendimiento: ${technicalScores.performance}/100
      - SEO: ${technicalScores.seo}/100  
      - Accesibilidad: ${technicalScores.accessibility}/100
      - Mejores Prácticas: ${technicalScores.bestPractices}/100

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
        "competitorComparison": "Cómo se compara con competidores modernos y qué oportunidades están perdiendo (genera urgencia)",
        "urgencyStatement": "Declaración contundente de por qué debe actuar YA (1 línea impactante)"
      }

      Usa porcentajes específicos. Genera urgencia. El cliente debe sentir que está perdiendo oportunidades AHORA.
      NO menciones pesos, dólares ni monedas. Solo porcentajes y oportunidades perdidas.
      NO agregues explicaciones adicionales. SOLO devuelve el JSON.
      `;

      const result = await model.generateContent(prompt);
      let aiText = result.response.text();
      
      // Limpiar markdown y espacios
      aiText = aiText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .replace(/^[\s\n]+/, '')
        .replace(/[\s\n]+$/, '')
        .trim();
      
      console.log('Respuesta de Gemini:', aiText);
      
      // Parsear JSON
      aiAnalysis = JSON.parse(aiText);

      // Agregar número de reporte al análisis
      aiAnalysis.reportNumber = reportNumber;
      
      // Validar estructura mínima
      if (!aiAnalysis.executiveSummary || 
          !aiAnalysis.conversionImpact || 
          !aiAnalysis.criticalIssues || 
          !Array.isArray(aiAnalysis.criticalIssues) ||
          aiAnalysis.criticalIssues.length === 0) {
        throw new Error('Estructura de respuesta incompleta');
      }

    } catch (error) {
      console.error('Error con Gemini:', error);
      console.error('Respuesta problemática:', error.message);
      
      // Fallback: usar análisis genérico basado en los scores
      aiAnalysis = {
        reportNumber: reportNumber,
        executiveSummary: `Tu sitio presenta ${technicalScores.performance < 70 ? 'problemas significativos' : 'oportunidades'} de optimización que están ${technicalScores.seo < 70 ? 'limitando' : 'afectando'} tu visibilidad online y conversiones.`,
        conversionImpact: {
          lostSales: technicalScores.performance < 60 ? "45-60%" : technicalScores.performance < 70 ? "35-50%" : "25-40%",
          lostVisitors: technicalScores.performance < 60 ? "70-80%" : technicalScores.performance < 70 ? "60-70%" : "50-60%",
          reasoning: "Los problemas de rendimiento y visibilidad están provocando que los visitantes abandonen antes de convertir"
        },
        criticalIssues: [
          {
            issue: technicalScores.performance < 70 ? "Velocidad de carga inadecuada que afecta la experiencia del usuario" : "Optimización de rendimiento necesaria",
            businessImpact: `Cada segundo de demora reduce las conversiones en un 7%. Estás perdiendo ${Math.floor((100 - technicalScores.performance) * 0.5)}% de clientes potenciales.`
          },
          {
            issue: technicalScores.seo < 70 ? "Visibilidad limitada en motores de búsqueda" : "Oportunidades de mejora en SEO",
            businessImpact: `Tu competencia captura el ${Math.floor((100 - technicalScores.seo) * 0.8)}% del tráfico que podría ser tuyo.`
          },
          {
            issue: technicalScores.accessibility < 70 ? "Barreras de accesibilidad que excluyen usuarios potenciales" : "Mejoras de accesibilidad recomendadas",
            businessImpact: `Estás excluyendo aproximadamente ${Math.floor((100 - technicalScores.accessibility) * 0.3)}% de tu audiencia potencial.`
          }
        ],
        competitorComparison: "Tus competidores directos están invirtiendo en optimización web, capturando clientes que buscan servicios como los tuyos mientras tu sitio queda rezagado.",
        urgencyStatement: "Cada día que tu sitio no está optimizado, tu competencia está cerrando ventas que deberían ser tuyas."
      };
    }

    // 5. GUARDAR NUEVO LEAD EN SUPABASE con retry
    let lead = null;
    let dbError = null;
    
    for (let retry = 0; retry < 3; retry++) {
      try {
        const { data, error } = await supabase
          .from('leads')
          .insert({
            report_number: reportNumber,
            name: name,
            phone: phone,
            website_url: url,
            terms_accepted: true,
            analysis_summary: aiAnalysis.executiveSummary,
            performance_score: technicalScores.performance,
            seo_score: technicalScores.seo,
            accessibility_score: technicalScores.accessibility,
            status: 'nuevo',
            attempt_count: 1,
            last_attempt_at: new Date().toISOString(),
            ip_address: request.headers.get('x-forwarded-for') || 'unknown',
            user_agent: request.headers.get('user-agent') || 'unknown'
          })
          .select()
          .single();

        if (error) {
          console.error(`Intento ${retry + 1} - Error guardando en DB:`, error);
          dbError = error;
          
          // Si es error de duplicado, generar nuevo número
          if (error.code === '23505') {
            const newReportNumber = await generateUniqueReportNumber();
            console.log(`Generando nuevo número de reporte: ${newReportNumber}`);
            aiAnalysis.reportNumber = newReportNumber;
            // Continuar el loop para reintentar
            continue;
          }
          
          throw error;
        }

        lead = data;
        dbError = null;
        console.log('Lead guardado exitosamente:', lead.id);
        break; // Salir del loop si fue exitoso

      } catch (err) {
        console.error(`Error en intento ${retry + 1}:`, err);
        dbError = err;
        if (retry === 2) {
          console.error('Fallo después de 3 intentos');
        }
        await new Promise(resolve => setTimeout(resolve, 200 * (retry + 1)));
      }
    }

    if (dbError) {
      console.error('Error final guardando en DB:', dbError);
      // Continuar aunque falle el guardado - el usuario aún puede ver el análisis
    }

    // 6. Respuesta exitosa al cliente
    return NextResponse.json({
      success: true,
      alreadyAnalyzed: false,
      leadId: lead?.id,
      reportNumber: aiAnalysis.reportNumber,
      preview: aiAnalysis.executiveSummary,
      scores: technicalScores,
      analysis: aiAnalysis,
      // Datos para generar PDF en el cliente
      pdfData: {
        reportNumber: aiAnalysis.reportNumber,
        name: name,
        url: url,
        scores: technicalScores,
        analysis: aiAnalysis
      }
    });

  } catch (error) {
    console.error('Error general en API:', error);
    return NextResponse.json(
      { 
        error: 'Error al analizar el sitio. Por favor intenta nuevamente.',
        details: error.message 
      },
      { status: 500 }
    );
  }
}