// ========================================
// FILE: components/cotizador/PasoConfiguracion.jsx
// ========================================

'use client';

import { DollarSign, Hash, FileText } from 'lucide-react';

export default function PasoConfiguracion({ configuracion, setConfiguracion }) {
  
  const handleChange = (campo, valor) => {
    setConfiguracion(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  // Calcular ejemplo
  const horasEjemplo = 781;
  const costoEjemplo = horasEjemplo * configuracion.valorHora;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ⚙️ Configuración de la Cotización
        </h2>
        <p className="text-gray-600">
          Configura el valor por hora, número de cotización y agrega información adicional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Valor Hora */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <DollarSign size={16} className="inline mr-2" />
            Valor por Hora (COP) *
          </label>
          <input
            type="number"
            value={configuracion.valorHora}
            onChange={(e) => handleChange('valorHora', parseInt(e.target.value) || 0)}
            placeholder="37500"
            min="0"
            step="1000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-lg text-black placeholder-gray-400"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Valor estándar recomendado: $37,500 COP/hora
          </p>
        </div>

        {/* Número de Cotización */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Hash size={16} className="inline mr-2" />
            Número de Cotización
          </label>
          <input
            type="text"
            value={configuracion.numeroCotizacion}
            onChange={(e) => handleChange('numeroCotizacion', e.target.value)}
            placeholder="COT-123456"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-black placeholder-gray-400"
          />
          <p className="text-xs text-gray-500 mt-1">
            Se genera automáticamente, pero puedes cambiarlo
          </p>
        </div>

      </div>

      {/* Información Adicional */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <FileText size={16} className="inline mr-2" />
          Información Adicional (Opcional)
        </label>
        <textarea
          value={configuracion.infoAdicional}
          onChange={(e) => handleChange('infoAdicional', e.target.value)}
          placeholder="Agrega cualquier información adicional que quieras que Claude considere al generar la propuesta...&#10;&#10;Ejemplo:&#10;- El cliente prefiere tecnologías open source&#10;- Requiere integración con sistema contable existente&#10;- Timeline ajustado, necesitan entrega en 6 semanas"
          rows={8}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-black placeholder-gray-400"
        />
        <p className="text-xs text-gray-500 mt-1">
          Esta información ayudará a Claude a personalizar mejor la propuesta
        </p>
      </div>

      {/* Preview de Cálculo */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 border-l-4 border-green-500 p-6 rounded-lg">
        <h3 className="font-semibold text-green-900 mb-3">💰 Ejemplo de Cálculo</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-700">Horas estimadas (ejemplo):</span>
            <span className="font-mono font-semibold text-gray-900">{horasEjemplo}h</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Valor por hora:</span>
            <span className="font-mono font-semibold text-gray-900">
              ${configuracion.valorHora.toLocaleString('es-CO')} COP
            </span>
          </div>
          <div className="border-t border-green-300 pt-2 mt-2">
            <div className="flex justify-between">
              <span className="text-gray-900 font-semibold">Costo estimado:</span>
              <span className="font-mono font-bold text-green-700 text-lg">
                ${costoEjemplo.toLocaleString('es-CO')} COP
              </span>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-3">
          * Este es solo un ejemplo. El cálculo real dependerá de los módulos detectados en el documento.
        </p>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>💡 Tips para mejores resultados:</strong>
        </p>
        <ul className="text-sm text-blue-800 mt-2 space-y-1 ml-4 list-disc">
          <li>Especifica si hay integraciones con sistemas existentes</li>
          <li>Menciona preferencias tecnológicas del cliente</li>
          <li>Indica si hay restricciones de tiempo o presupuesto</li>
          <li>Detalla si requieren capacitación especial del equipo</li>
        </ul>
      </div>

    </div>
  );
}