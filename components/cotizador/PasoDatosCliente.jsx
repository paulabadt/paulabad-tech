// ========================================
// FILE: components/cotizador/PasoDatosCliente.jsx
// ========================================

'use client';

import { Building2, User, Phone, Mail, MapPin, FileText } from 'lucide-react';

export default function PasoDatosCliente({ datosCliente, setDatosCliente }) {
  
  const handleChange = (campo, valor) => {
    setDatosCliente(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          👤 Datos del Cliente
        </h2>
        <p className="text-gray-600">
          Ingresa la información del cliente que aparecerá en la propuesta comercial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Empresa */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Building2 size={16} className="inline mr-2" />
            Nombre de la Empresa *
          </label>
          <input
            type="text"
            value={datosCliente.empresa}
            onChange={(e) => handleChange('empresa', e.target.value)}
            placeholder="Ej: Soluciones JMO SAS"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black placeholder-gray-400"
            required
          />
        </div>

        {/* NIT */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FileText size={16} className="inline mr-2" />
            NIT / Documento
          </label>
          <input
            type="text"
            value={datosCliente.nit}
            onChange={(e) => handleChange('nit', e.target.value)}
            placeholder="Ej: 900.845.434-4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black placeholder-gray-400"
          />
        </div>

        {/* Contacto */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <User size={16} className="inline mr-2" />
            Persona de Contacto *
          </label>
          <input
            type="text"
            value={datosCliente.contacto}
            onChange={(e) => handleChange('contacto', e.target.value)}
            placeholder="Ej: Jenny Gordillo"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black placeholder-gray-400"
            required
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone size={16} className="inline mr-2" />
            Teléfono
          </label>
          <input
            type="tel"
            value={datosCliente.telefono}
            onChange={(e) => handleChange('telefono', e.target.value)}
            placeholder="Ej: 311 215 7507"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black placeholder-gray-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Mail size={16} className="inline mr-2" />
            Email *
          </label>
          <input
            type="email"
            value={datosCliente.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Ej: contacto@empresa.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black placeholder-gray-400"
            required
          />
        </div>

        {/* Ciudad */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <MapPin size={16} className="inline mr-2" />
            Ciudad
          </label>
          <input
            type="text"
            value={datosCliente.ciudad}
            onChange={(e) => handleChange('ciudad', e.target.value)}
            placeholder="Ej: Pereira, Risaralda"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black placeholder-gray-400"
          />
        </div>

      </div>

      {/* Ayuda */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
        <p className="text-sm text-yellow-900">
          <strong>📝 Nota:</strong> Los campos marcados con (*) son obligatorios. 
          Esta información aparecerá en la portada de la propuesta comercial y en el PDF generado.
        </p>
      </div>

      {/* Preview */}
      {(datosCliente.empresa || datosCliente.contacto) && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
          <h3 className="font-semibold text-indigo-900 mb-3">👁️ Vista previa en la propuesta:</h3>
          <div className="bg-white p-4 rounded-lg border border-indigo-200">
            <p className="text-sm text-gray-500 mb-1">DATOS DEL CLIENTE</p>
            {datosCliente.empresa && (
              <p className="font-semibold text-gray-900">Empresa: {datosCliente.empresa}</p>
            )}
            {datosCliente.nit && (
              <p className="text-sm text-gray-700">NIT: {datosCliente.nit}</p>
            )}
            {datosCliente.contacto && (
              <p className="text-sm text-gray-700">Contacto: {datosCliente.contacto}</p>
            )}
            {datosCliente.telefono && (
              <p className="text-sm text-gray-700">Teléfono: {datosCliente.telefono}</p>
            )}
            {datosCliente.email && (
              <p className="text-sm text-gray-700">Email: {datosCliente.email}</p>
            )}
            {datosCliente.ciudad && (
              <p className="text-sm text-gray-700">Ciudad: {datosCliente.ciudad}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}