// ========================================
// FILE: app/cotizador/page.jsx
// ========================================

'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import PasoSubirArchivo from '@/components/cotizador/PasoSubirArchivo';
import PasoDatosCliente from '@/components/cotizador/PasoDatosCliente';
import PasoConfiguracion from '@/components/cotizador/PasoConfiguracion';
import PropuestaGenerada from '@/components/cotizador/PropuestaGenerada';

export default function CotizadorPage() {
  const [paso, setPaso] = useState(1);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // Estados del formulario
  const [archivo, setArchivo] = useState(null);
  const [contenidoArchivo, setContenidoArchivo] = useState('');
  
  const [datosCliente, setDatosCliente] = useState({
    empresa: '',
    nit: '',
    contacto: '',
    telefono: '',
    email: '',
    ciudad: ''
  });

  const [configuracion, setConfiguracion] = useState({
    valorHora: 40000,
    numeroCotizacion: `COT-${Date.now()}`,
    infoAdicional: ''
  });

  const [propuestaGenerada, setPropuestaGenerada] = useState(null);

  // Manejar generación
  const handleGenerar = async () => {
    setCargando(true);
    setError(null);

    try {
      const response = await fetch('/api/analizar-claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contenido: contenidoArchivo,
          infoAdicional: configuracion.infoAdicional,
          datosCliente,
          valorHora: configuracion.valorHora
        })
      });

      const data = await response.json();

      if (!data.success) {
        // Si es rate limit, dar mensaje amigable
        if (response.status === 429) {
          throw new Error('⏳ Límite de API alcanzado. Por favor espera 1 minuto e intenta de nuevo.');
        }
        throw new Error(data.error || 'Error al generar propuesta');
      }

      setPropuestaGenerada({
        ...data.propuesta,
        datosCliente,
        numeroCotizacion: configuracion.numeroCotizacion,
        fecha: new Date().toLocaleDateString('es-CO', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      });

      setPaso(4);

    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
      
      // Scroll al error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setCargando(false);
    }
  };
  // Validar paso actual
  const puedeAvanzar = () => {
    switch (paso) {
      case 1:
        return archivo && contenidoArchivo;
      case 2:
        return datosCliente.empresa && datosCliente.contacto && datosCliente.email;
      case 3:
        return configuracion.valorHora > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Generador de Cotizaciones Técnicas
          </h1>
          <p className="text-gray-600 mt-2">
            Sube los requerimientos, ingresa los datos del cliente y genera una propuesta profesional automáticamente
          </p>
        </div>

        {/* Progress Bar */}
        {paso < 4 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              {['Subir Archivo', 'Datos Cliente', 'Configuración', 'Propuesta'].map((nombre, idx) => (
                <div key={idx} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    paso > idx + 1 ? 'bg-green-500 text-white' :
                    paso === idx + 1 ? 'bg-indigo-600 text-white' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {paso > idx + 1 ? '✓' : idx + 1}
                  </div>
                  {idx < 3 && (
                    <div className={`w-24 h-1 mx-2 ${paso > idx + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center font-semibold text-gray-700">
              Paso {paso}/3
            </div>
          </div>
        )}

        {/* Contenido del Paso */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          {paso === 1 && (
            <PasoSubirArchivo
              archivo={archivo}
              setArchivo={setArchivo}
              contenidoArchivo={contenidoArchivo}
              setContenidoArchivo={setContenidoArchivo}
            />
          )}

          {paso === 2 && (
            <PasoDatosCliente
              datosCliente={datosCliente}
              setDatosCliente={setDatosCliente}
            />
          )}

          {paso === 3 && (
            <PasoConfiguracion
              configuracion={configuracion}
              setConfiguracion={setConfiguracion}
            />
          )}

          {paso === 4 && propuestaGenerada && (
            <PropuestaGenerada
              propuesta={propuestaGenerada}
              onVolver={() => setPaso(1)}
            />
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-700 font-semibold">Error:</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Botones de navegación */}
          {paso < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                onClick={() => setPaso(paso - 1)}
                disabled={paso === 1 || cargando}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={20} />
                Anterior
              </button>

              {paso < 3 ? (
                <button
                  onClick={() => setPaso(paso + 1)}
                  disabled={!puedeAvanzar() || cargando}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                  <ArrowRight size={20} />
                </button>
              ) : (
                <button
                  onClick={handleGenerar}
                  disabled={!puedeAvanzar() || cargando}
                  className="flex items-center gap-2 px-8 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                >
                  {cargando ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      ✨ Generar Propuesta
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}