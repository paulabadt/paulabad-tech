// components/ChecklistSummary.js
'use client';

import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function ChecklistSummary({ formData, onClose }) {
  const sections = [
    {
      id: 'clientData',
      title: '👤 Datos del Cliente',
      fields: ['clientName', 'clientEmail', 'businessName'],
      data: formData.clientData
    },
    {
      id: 'functionality',
      title: '⚙️ Funcionalidad y Procesos',
      fields: ['description', 'userActions'],
      data: formData.functionality
    },
    {
      id: 'database',
      title: '🗄️ Base de Datos',
      fields: ['currentStructure', 'criticalTables'],
      data: formData.database
    },
    {
      id: 'businessLogic',
      title: '🧠 Lógica de Negocio',
      fields: ['customDescription', 'validationRules'],
      data: formData.businessLogic
    },
    {
      id: 'integrations',
      title: '🔗 Integración y APIs',
      fields: ['externalSystems', 'communicationProtocols'],
      data: formData.integrations
    },
    {
      id: 'security',
      title: '🔐 Seguridad y Autenticación',
      fields: ['userManagement', 'roles'],
      data: formData.security
    },
    {
      id: 'performance',
      title: '⚡ Rendimiento',
      fields: ['slowQueries', 'simultaneousUsers'],
      data: formData.performance
    },
    {
      id: 'reports',
      title: '📊 Reportes y Exportación',
      fields: ['reportsList'],
      data: formData.reports
    },
    {
      id: 'validations',
      title: '✅ Validaciones',
      fields: ['fieldValidations', 'businessRules'],
      data: formData.validations
    },
    {
      id: 'configuration',
      title: '⚙️ Configuración',
      fields: ['configFiles', 'environmentVariables'],
      data: formData.configuration
    },
    {
      id: 'edgeCases',
      title: '⚠️ Casos Especiales',
      fields: ['specialBehaviors', 'exceptions'],
      data: formData.edgeCases
    }
  ];

  const calculateCompleteness = () => {
    let totalFields = 0;
    let completedFields = 0;

    sections.forEach(section => {
      section.fields.forEach(field => {
        const value = section.data[field];
        totalFields++;
        
        if (Array.isArray(value)) {
          if (value.length > 0 && value.some(item => Object.values(item).some(v => v))) {
            completedFields++;
          }
        } else if (value && value.trim && value.trim() !== '') {
          completedFields++;
        }
      });
    });

    return { completedFields, totalFields, percentage: Math.round((completedFields / totalFields) * 100) };
  };

  const getCompletionStatus = () => {
    const { percentage } = calculateCompleteness();
    if (percentage >= 80) return { status: 'completo', color: 'green' };
    if (percentage >= 50) return { status: 'intermedio', color: 'yellow' };
    return { status: 'incompleto', color: 'red' };
  };

  const { completedFields, totalFields, percentage } = calculateCompleteness();
  const { status, color } = getCompletionStatus();

  const statusColors = {
    green: 'bg-green-50 border-green-200 text-green-900',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    red: 'bg-red-50 border-red-200 text-red-900'
  };

  const statusBgColors = {
    green: 'bg-green-100',
    yellow: 'bg-yellow-100',
    red: 'bg-red-100'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 border-b">
          <h2 className="text-2xl font-bold">Resumen del Checklist</h2>
          <p className="text-purple-100 mt-1">Revisa la información antes de generar el PDF</p>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          {/* Barra de Progreso */}
          <div className={`border-2 rounded-lg p-4 ${statusColors[color]}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {status === 'completo' && <CheckCircle2 size={24} className="text-green-600" />}
                {status === 'intermedio' && <AlertCircle size={24} className="text-yellow-600" />}
                {status === 'incompleto' && <AlertCircle size={24} className="text-red-600" />}
                <div>
                  <h3 className="font-bold capitalize">Checklist {status}</h3>
                  <p className="text-sm">
                    {completedFields} de {totalFields} campos completados
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{percentage}%</div>
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-3">
              <div
                className={`${statusBgColors[color]} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Datos del Cliente */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span>👤</span> Datos del Cliente
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-600">Nombre</p>
                <p className="font-semibold">{formData.clientData.clientName || '-'}</p>
              </div>
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-semibold">{formData.clientData.clientEmail || '-'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">Empresa</p>
                <p className="font-semibold">{formData.clientData.businessName || '-'}</p>
              </div>
            </div>
          </div>

          {/* Secciones */}
          {sections.map((section, index) => {
            const hasContent = section.fields.some(field => {
              const value = section.data[field];
              if (Array.isArray(value)) {
                return value.length > 0 && value.some(item => Object.values(item).some(v => v));
              }
              return value && value.trim && value.trim() !== '';
            });

            return (
              <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-900">{section.title}</h4>
                  {hasContent ? (
                    <CheckCircle2 size={20} className="text-green-600" />
                  ) : (
                    <AlertCircle size={20} className="text-gray-400" />
                  )}
                </div>
                
                {/* Preview de contenido */}
                <div className="mt-3 space-y-2 text-sm">
                  {section.fields.map(field => {
                    const value = section.data[field];
                    
                    if (Array.isArray(value) && value.length > 0) {
                      return (
                        <div key={field}>
                          <p className="text-gray-600 text-xs uppercase tracking-wide">{field}</p>
                          <p className="text-gray-900 font-medium">{value.length} elemento(s)</p>
                        </div>
                      );
                    }
                    
                    if (value && typeof value === 'string' && value.trim()) {
                      const preview = value.substring(0, 80) + (value.length > 80 ? '...' : '');
                      return (
                        <div key={field}>
                          <p className="text-gray-600 text-xs uppercase tracking-wide">{field}</p>
                          <p className="text-gray-900 font-medium">{preview}</p>
                        </div>
                      );
                    }
                    
                    return null;
                  })}
                  {!hasContent && (
                    <p className="text-gray-500 italic">No hay información completada</p>
                  )}
                </div>
              </div>
            );
          })}

          {/* Info importante */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
            <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900">Consejo:</p>
              <p className="text-blue-800 mt-1">
                Cuanta más información proporciones, más completo y útil será el PDF generado. Especialmente la sección de "Lógica de Negocio".
              </p>
            </div>
          </div>
        </div>

        {/* Footer - Botones */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
          >
            Volver a Editar
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-white hover:from-purple-700 hover:to-blue-700 transition-colors"
          >
            Generar PDF Ahora
          </button>
        </div>
      </div>
    </div>
  );
}

