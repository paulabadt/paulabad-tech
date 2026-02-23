// ========================================
// FILE: app/api/analizar-claude/route.js
// VERSIÓN MEJORADA - LIMPIEZA ROBUSTA DE JSON
// ========================================

import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// ========================================
// HELPER: Esperar X segundos
// ========================================
const esperarSegundos = (segundos) => {
  return new Promise(resolve => setTimeout(resolve, segundos * 1000));
};

// ========================================
// HELPER: Limpiar JSON de respuesta de Gemini
// ========================================
function limpiarJSON(texto) {
  let limpio = texto.trim();
  
  // 1. Remover markdown
  limpio = limpio.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  
  // 2. Remover texto antes del primer {
  const primerLlave = limpio.indexOf('{');
  if (primerLlave > 0) {
    limpio = limpio.substring(primerLlave);
  }
  
  // 3. Remover texto después del último }
  const ultimaLlave = limpio.lastIndexOf('}');
  if (ultimaLlave > 0) {
    limpio = limpio.substring(0, ultimaLlave + 1);
  }
  
  // 4. Reemplazar comillas tipográficas por comillas normales
  limpio = limpio.replace(/[""]/g, '"');
  limpio = limpio.replace(/['']/g, "'");
  
  // 5. Remover trailing commas (coma antes de } o ])
  limpio = limpio.replace(/,(\s*[}\]])/g, '$1');
  
  // 6. Remover múltiples espacios
  limpio = limpio.replace(/\s+/g, ' ');
  
  return limpio;
}

// ========================================
// FUNCIÓN: Llamar a Gemini con Retry
// ========================================
async function llamarGeminiConRetry(model, prompt, maxIntentos = 3) {
  for (let intento = 1; intento <= maxIntentos; intento++) {
    try {
      console.log(`🔄 Intento ${intento}/${maxIntentos}...`);
      
      const result = await model.generateContent(prompt);
      const response = result.response;
      return response.text();
      
    } catch (error) {
      const isRateLimit = error.message?.includes('429') || 
                         error.message?.includes('quota') ||
                         error.message?.includes('RESOURCE_EXHAUSTED');
      
      if (isRateLimit && intento < maxIntentos) {
        const segundosEspera = intento * 15;
        console.log(`⏳ Rate limit. Esperando ${segundosEspera}s...`);
        await esperarSegundos(segundosEspera);
        continue;
      }
      
      throw error;
    }
  }
}

// ========================================
// API ROUTE PRINCIPAL
// ========================================
export async function POST(request) {
  try {
    const { contenido, infoAdicional, datosCliente, valorHora } = await request.json();

    console.log('📄 Iniciando análisis con Gemini...');
    console.log('📊 Contenido:', contenido.length, 'caracteres');

    // Inicializar Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.1,  // Más determinista
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8000,
        responseMimeType: "application/json", // ← FORZAR RESPUESTA JSON
      },
    });

    // PROMPT MEJORADO - MÁS ESPECÍFICO
    const prompt = `Genera una cotización técnica en formato JSON ESTRICTO.

REQUERIMIENTOS:
${contenido.substring(0, 4000)}

CLIENTE: ${datosCliente.empresa} - ${datosCliente.ciudad}

RESPONDE SOLO CON JSON VÁLIDO. NO agregues texto, explicaciones ni markdown.

Usa este esquema JSON:

{
  "nombreProyecto": "Sistema de [describir]",
  "duracionSemanas": 12,
  "modulos": [
    {
      "nombre": "Autenticación y Seguridad",
      "horas": 80,
      "tareas": [
        "Login con JWT",
        "Recuperación de contraseña",
        "Control de sesiones"
      ]
    },
    {
      "nombre": "Gestión de Datos",
      "horas": 60,
      "tareas": [
        "CRUD completo",
        "Validaciones",
        "Importación masiva"
      ]
    }
  ],
  "dashboardOpcional": {
    "incluido": false,
    "horas": 54,
    "precio": 4500000,
    "tareas": ["Métricas en tiempo real", "Gráficos interactivos"]
  },
  "stackTecnologico": {
    "frontend": ["React 18", "TypeScript", "Tailwind CSS"],
    "backend": ["Spring Boot 3", "PostgreSQL 14"],
    "infraestructura": ["DigitalOcean", "SSL/TLS"]
  },
  "baseDatos": [
    {
      "nombre": "usuarios",
      "descripcion": "Gestión de usuarios",
      "campos": [
        {"nombre": "id", "tipo": "SERIAL PRIMARY KEY", "descripcion": "ID único"},
        {"nombre": "email", "tipo": "VARCHAR(200)", "descripcion": "Email único"}
      ]
    }
  ],
  "cronograma": [
    {
      "semana": "1-2",
      "fase": "Sprint 1",
      "modulos": ["Auth", "Base de datos"],
      "hitos": "Login funcional"
    }
  ]
}

REGLAS:
- Incluye 8-12 módulos (siempre: Seguridad, Testing, Deploy, Docs)
- Horas: 40-120 por módulo
- Dashboard solo si lo mencionan
- 6 sprints = 12 semanas
- Mínimo 5 tablas en baseDatos
- JSON válido, sin comentarios`;

    // Llamar a Gemini
    console.log('🤖 Llamando a Gemini...');
    const respuestaTexto = await llamarGeminiConRetry(model, prompt, 3);

    console.log('📝 Respuesta recibida');
    console.log('📏 Longitud:', respuestaTexto.length, 'caracteres');
    
    // Mostrar primeros 500 caracteres para debug
    console.log('👀 Primeros 500 chars:', respuestaTexto.substring(0, 500));

    // Limpiar JSON
    const jsonLimpio = limpiarJSON(respuestaTexto);
    
    console.log('🧹 JSON limpio - primeros 500 chars:', jsonLimpio.substring(0, 500));

    // Intentar parsear
    let propuesta;
    try {
      propuesta = JSON.parse(jsonLimpio);
    } catch (parseError) {
      console.error('❌ Error al parsear JSON:', parseError.message);
      console.error('📄 JSON que falló:', jsonLimpio.substring(0, 1000));
      
      // Guardar en archivo para debug
      throw new Error(`JSON inválido de Gemini: ${parseError.message}. Ver logs del servidor para detalles.`);
    }

    // Validar estructura
    if (!propuesta.nombreProyecto || !propuesta.modulos || !Array.isArray(propuesta.modulos)) {
      throw new Error('Estructura de JSON inválida: faltan campos requeridos');
    }

    if (propuesta.modulos.length === 0) {
      throw new Error('La propuesta no contiene módulos');
    }

    // Calcular totales
    const totalHoras = propuesta.modulos.reduce((sum, mod) => sum + (mod.horas || 0), 0);
    const costoDesarrollo = totalHoras * valorHora;

    // Validar que haya horas
    if (totalHoras === 0) {
      throw new Error('Total de horas es 0. La propuesta es inválida.');
    }

    console.log('✅ Cotización generada:', {
      proyecto: propuesta.nombreProyecto,
      modulos: propuesta.modulos.length,
      horas: totalHoras,
      costo: `$${costoDesarrollo.toLocaleString('es-CO')}`
    });

    return NextResponse.json({
      success: true,
      propuesta: {
        ...propuesta,
        totalHoras,
        costoDesarrollo,
        valorHora
      }
    });

  } catch (error) {
    console.error('❌ Error completo:', error);
    
    const isRateLimit = error.message?.includes('429') || 
                       error.message?.includes('quota') ||
                       error.message?.includes('RESOURCE_EXHAUSTED');
    
    if (isRateLimit) {
      return NextResponse.json({
        success: false,
        error: 'Límite de API alcanzado. Espera 1-2 minutos e intenta nuevamente.',
        code: 'RATE_LIMIT'
      }, { status: 429 });
    }
    
    if (error instanceof SyntaxError || error.message?.includes('JSON')) {
      return NextResponse.json({
        success: false,
        error: 'Gemini generó una respuesta con formato inválido. Intenta con un documento más simple o con menos texto.',
        details: error.message,
        code: 'JSON_PARSE_ERROR'
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Error al generar la propuesta',
      details: error.toString(),
      code: 'UNKNOWN_ERROR'
    }, { status: 500 });
  }
}