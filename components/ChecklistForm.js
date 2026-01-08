// components/ChecklistForm.js
'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import ChecklistSummary from './ChecklistSummary';
import { validateFormData } from '@/lib/formValidation';
import { Save } from 'lucide-react';

const sections = [
  {
    id: 'clientData',
    title: 'Datos del Cliente',
    icon: '👤',
    description: 'Información de contacto y empresa'
  },
  {
    id: 'functionality',
    title: 'Funcionalidad y Procesos',
    icon: '⚙️',
    description: 'Flujos de usuario y funcionalidades principales'
  },
  {
    id: 'database',
    title: 'Base de Datos',
    icon: '🗄️',
    description: 'Estructura, tablas, relaciones y lógica BD'
  },
  {
    id: 'businessLogic',
    title: 'Lógica de Negocio',
    icon: '🧠',
    description: 'Reglas, validaciones y cálculos complejos'
  },
  {
    id: 'integrations',
    title: 'Integración y APIs',
    icon: '🔗',
    description: 'Conexiones externas y comunicación'
  },
  {
    id: 'security',
    title: 'Seguridad y Autenticación',
    icon: '🔐',
    description: 'Roles, permisos y encriptación'
  },
  {
    id: 'performance',
    title: 'Rendimiento',
    icon: '⚡',
    description: 'Velocidad, carga y usuarios simultáneos'
  },
  {
    id: 'reports',
    title: 'Reportes y Exportación',
    icon: '📊',
    description: 'Formatos de salida (Excel, PDF, etc.)'
  },
  {
    id: 'validations',
    title: 'Validaciones y Restricciones',
    icon: '✅',
    description: 'Reglas de campos y mensajes de error'
  },
  {
    id: 'configuration',
    title: 'Configuración y Parámetros',
    icon: '⚙️',
    description: 'Variables y archivos de configuración'
  },
  {
    id: 'edgeCases',
    title: 'Casos Especiales y Edge Cases',
    icon: '⚠️',
    description: 'Comportamientos especiales y excepciones'
  }
];


export default function ChecklistForm({ onSubmit, isLoading }) {
  const [expandedSections, setExpandedSections] = useState({
    clientData: true,
    functionality: false,
    database: false,
    businessLogic: false
  });

  const [formData, setFormData] = useState({
    clientData: {
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      businessName: '',
      businessType: ''
    },
    functionality: {
      description: '',
      mainScreens: [{ name: '', description: '' }],
      userActions: ''
    },
    database: {
      currentStructure: '',
      criticalTables: '',
      storedProcedures: '',
      architectureChanges: ''
    },
    businessLogic: {
      logicLocation: '',
      customDescription: '',
      validationRules: '',
      complexCalculations: '',
      // NUEVO CAMPO:
      flowDescription: '' // Aquí el cliente describe su flujo paso a paso
    },
    integrations: {
      externalSystems: '',
      communicationProtocols: '',
      authentication: '',
      syncFrequency: ''
    },
    security: {
      userManagement: '',
      roles: '',
      authMechanism: '',
      dataEncryption: ''
    },
    performance: {
      slowQueries: '',
      simultaneousUsers: '',
      dataVolume: ''
    },
    reports: {
      reportsList: [{ name: '', format: '', parameters: '' }]
    },
    validations: {
      fieldValidations: '',
      businessRules: '',
      errorMessages: ''
    },
    configuration: {
      configFiles: '',
      environmentVariables: '',
      maintainability: ''
    },
    edgeCases: {
      specialBehaviors: '',
      exceptions: '',
      complexScenarios: ''
    }
  });

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleInputChange = (sectionId, field, value) => {
    setFormData(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [field]: value
      }
    }));
  };

  const handleArrayAdd = (sectionId, field) => {
    const currentArray = formData[sectionId][field];
    const newItem = field === 'mainScreens' 
      ? { name: '', description: '' }
      : { name: '', format: '', parameters: '' };
    
    setFormData(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [field]: [...currentArray, newItem]
      }
    }));
  };

  const handleArrayUpdate = (sectionId, field, index, subfield, value) => {
    setFormData(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [field]: prev[sectionId][field].map((item, i) =>
          i === index ? { ...item, [subfield]: value } : item
        )
      }
    }));
  };

  const handleArrayRemove = (sectionId, field, index) => {
    setFormData(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [field]: prev[sectionId][field].filter((_, i) => i !== index)
      }
    }));
  };

  const [showSummary, setShowSummary] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { isValid, errors, warnings } = validateFormData(formData);
    
    if (!isValid) {
      alert('Errores encontrados:\n\n' + errors.join('\n'));
      return;
    }
    
    if (warnings.length > 0) {
      const confirmed = confirm(
        'Advertencias:\n\n' + 
        warnings.join('\n') + 
        '\n\n¿Deseas continuar de todas formas?'
      );
      if (!confirmed) return;
    }
    
    // Mostrar resumen antes de generar PDF
    setShowSummary(true);
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {sections.map((section) => (
        <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
          {/* Header de Sección */}
          <button
            type="button"
            onClick={() => toggleSection(section.id)}
            className="w-full px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-4 text-left">
              <span className="text-2xl">{section.icon}</span>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>
                <p className="text-sm text-gray-600">{section.description}</p>
              </div>
            </div>
            {expandedSections[section.id] ? (
              <ChevronUp className="text-purple-600" size={24} />
            ) : (
              <ChevronDown className="text-gray-400 group-hover:text-gray-600" size={24} />
            )}
          </button>

          {/* Contenido de Sección */}
          {expandedSections[section.id] && (
            <div className="px-6 py-6 border-t border-gray-200 bg-gray-50">
              {/* DATOS DEL CLIENTE */}
              {section.id === 'clientData' && (
                <div className="space-y-4 bg-white p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre del Cliente *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.clientData.clientName}
                        onChange={(e) => handleInputChange('clientData', 'clientName', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Juan García"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email del Cliente *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.clientData.clientEmail}
                        onChange={(e) => handleInputChange('clientData', 'clientEmail', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="juan@empresa.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Teléfono del Cliente
                      </label>
                      <input
                        type="tel"
                        value={formData.clientData.clientPhone}
                        onChange={(e) => handleInputChange('clientData', 'clientPhone', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="+57 3054434287"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre de la Empresa *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.clientData.businessName}
                        onChange={(e) => handleInputChange('clientData', 'businessName', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Soluciones TI S.A.S"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tipo de Negocio
                      </label>
                      <input
                        type="text"
                        value={formData.clientData.businessType}
                        onChange={(e) => handleInputChange('clientData', 'businessType', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Ej: Retail, Manufactura, Servicios, etc."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* FUNCIONALIDAD Y PROCESOS */}
              {section.id === 'functionality' && (
                <div className="space-y-4 bg-white p-6 rounded-lg">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Descripción General de Funcionalidades
                    </label>
                    <textarea
                      value={formData.functionality.description}
                      onChange={(e) => handleInputChange('functionality', 'description', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="4"
                      placeholder="Describe brevemente qué hace tu aplicación..."
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-sm font-semibold text-gray-700">
                        Pantallas Principales
                      </label>
                      <button
                        type="button"
                        onClick={() => handleArrayAdd('functionality', 'mainScreens')}
                        className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors"
                      >
                        <Plus size={16} /> Agregar
                      </button>
                    </div>
                    <div className="space-y-3">
                      {formData.functionality.mainScreens.map((screen, index) => (
                        <div key={index} className="flex gap-3 p-3 bg-gray-100 rounded-lg">
                          <input
                            type="text"
                            value={screen.name}
                            onChange={(e) => handleArrayUpdate('functionality', 'mainScreens', index, 'name', e.target.value)}
                            placeholder="Nombre de la pantalla"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            value={screen.description}
                            onChange={(e) => handleArrayUpdate('functionality', 'mainScreens', index, 'description', e.target.value)}
                            placeholder="¿Qué hace?"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleArrayRemove('functionality', 'mainScreens', index)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Acciones de Usuario en Cada Módulo
                    </label>
                    <textarea
                      value={formData.functionality.userActions}
                      onChange={(e) => handleInputChange('functionality', 'userActions', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="Describe cómo interactúan los usuarios con los datos..."
                    />
                  </div>
                </div>
              )}

              {/* BASE DE DATOS */}
              {section.id === 'database' && (
                <div className="space-y-4 bg-white p-6 rounded-lg">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Estructura Actual (Tablas, Relaciones, Tipos de Datos)
                    </label>
                    <textarea
                      value={formData.database.currentStructure}
                      onChange={(e) => handleInputChange('database', 'currentStructure', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="Describe tu esquema de BD..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tablas Críticas y Datos Maestros
                    </label>
                    <textarea
                      value={formData.database.criticalTables}
                      onChange={(e) => handleInputChange('database', 'criticalTables', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="¿Qué tablas son críticas? ¿Hay datos maestros?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Stored Procedures, Triggers o Lógica en BD
                    </label>
                    <textarea
                      value={formData.database.storedProcedures}
                      onChange={(e) => handleInputChange('database', 'storedProcedures', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="Detalla los procedimientos almacenados..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ¿Cambios Necesarios en la Arquitectura de Datos?
                    </label>
                    <textarea
                      value={formData.database.architectureChanges}
                      onChange={(e) => handleInputChange('database', 'architectureChanges', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="2"
                      placeholder="¿Necesitas cambios en la BD para la versión web?"
                    />
                  </div>
                </div>
              )}

              {/* LÓGICA DE NEGOCIO */}
              {section.id === 'businessLogic' && (
                <div className="space-y-4 bg-white p-6 rounded-lg border-l-4 border-purple-600">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-900">
                      Esta sección es crítica. Documenta exactamente dónde está tu lógica de negocio.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ¿Dónde está la Lógica? (Interfaz, Librerías, Servicios, BD)
                    </label>
                    <textarea
                      value={formData.businessLogic.logicLocation}
                      onChange={(e) => handleInputChange('businessLogic', 'logicLocation', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="Describe dónde está distribuida tu lógica de negocio..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Descripción Breve de la Lógica de Negocio
                    </label>
                    <textarea
                      value={formData.businessLogic.customDescription}
                      onChange={(e) => handleInputChange('businessLogic', 'customDescription', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="4"
                      placeholder="Explica brevemente cómo funciona tu negocio en la aplicación..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Reglas de Validación
                    </label>
                    <textarea
                      value={formData.businessLogic.validationRules}
                      onChange={(e) => handleInputChange('businessLogic', 'validationRules', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="Ej: Un cliente no puede tener más de 5 órdenes pendientes..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cálculos Complejos
                    </label>
                    <textarea
                      value={formData.businessLogic.complexCalculations}
                      onChange={(e) => handleInputChange('businessLogic', 'complexCalculations', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="Ej: Cálculo de comisiones, descuentos por volumen, etc..."
                    />
                  </div>
                </div>
              )}

              {/* INTEGRACIÓN Y APIs */}
              {section.id === 'integrations' && (
                <div className="space-y-4 bg-white p-6 rounded-lg">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sistemas Externos Conectados
                    </label>
                    <textarea
                      value={formData.integrations.externalSystems}
                      onChange={(e) => handleInputChange('integrations', 'externalSystems', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="Ej: ERP SAP, CRM Salesforce, bases de datos remotas..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Protocolos de Comunicación
                    </label>
                    <textarea
                      value={formData.integrations.communicationProtocols}
                      onChange={(e) => handleInputChange('integrations', 'communicationProtocols', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="2"
                      placeholder="Ej: REST, SOAP, WebServices, FTP, etc..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Autenticación en Integraciones
                    </label>
                    <textarea
                      value={formData.integrations.authentication}
                      onChange={(e) => handleInputChange('integrations', 'authentication', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="2"
                      placeholder="Ej: OAuth2, API Keys, Tokens, JWT..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Frecuencia de Sincronización
                    </label>
                    <textarea
                      value={formData.integrations.syncFrequency}
                      onChange={(e) => handleInputChange('integrations', 'syncFrequency', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="2"
                      placeholder="Ej: Tiempo real, cada hora, diario, por demanda..."
                    />
                  </div>
                </div>
              )}

              {/* SEGURIDAD Y AUTENTICACIÓN */}
              {section.id === 'security' && (
                <div className="space-y-4 bg-white p-6 rounded-lg border-l-4 border-red-600">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Gestión de Usuarios y Permisos
                    </label>
                    <textarea
                      value={formData.security.userManagement}
                      onChange={(e) => handleInputChange('security', 'userManagement', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="Describe cómo se gestionan usuarios y accesos..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Roles Existentes
                    </label>
                    <textarea
                      value={formData.security.roles}
                      onChange={(e) => handleInputChange('security', 'roles', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="Ej: Administrador, Supervisor, Operario, Cliente..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mecanismo de Autenticación
                    </label>
                    <textarea
                      value={formData.security.authMechanism}
                      onChange={(e) => handleInputChange('security', 'authMechanism', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="2"
                      placeholder="Ej: Usuario/Contraseña, Biometría, 2FA, SSO..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Encriptación de Datos Sensibles
                    </label>
                    <textarea
                      value={formData.security.dataEncryption}
                      onChange={(e) => handleInputChange('security', 'dataEncryption', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="2"
                      placeholder="Ej: Qué datos se encriptan, métodos utilizados..."
                    />
                  </div>
                </div>
              )}

              {/* RENDIMIENTO */}
              {section.id === 'performance' && (
                <div className="space-y-4 bg-white p-6 rounded-lg">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Consultas Pesadas o Lentas
                    </label>
                    <textarea
                      value={formData.performance.slowQueries}
                      onChange={(e) => handleInputChange('performance', 'slowQueries', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="¿Qué operaciones son lentas? ¿Cuáles son cuellos de botella?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Usuarios Simultáneos
                    </label>
                    <textarea
                      value={formData.performance.simultaneousUsers}
                      onChange={(e) => handleInputChange('performance', 'simultaneousUsers', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="2"
                      placeholder="Ej: 50 usuarios, 500 usuarios, 5000 usuarios simultáneos"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Volumen de Datos
                    </label>
                    <textarea
                      value={formData.performance.dataVolume}
                      onChange={(e) => handleInputChange('performance', 'dataVolume', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="2"
                      placeholder="Ej: 1M de registros en clientes, 50M en transacciones..."
                    />
                  </div>
                </div>
              )}

              {/* REPORTES Y EXPORTACIÓN */}
              {section.id === 'reports' && (
                <div className="space-y-4 bg-white p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-semibold text-gray-700">
                      Reportes Disponibles
                    </label>
                    <button
                      type="button"
                      onClick={() => handleArrayAdd('reports', 'reportsList')}
                      className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors"
                    >
                      <Plus size={16} /> Agregar Reporte
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formData.reports.reportsList.map((report, index) => (
                      <div key={index} className="p-4 bg-gray-100 rounded-lg space-y-3">
                        <input
                          type="text"
                          value={report.name}
                          onChange={(e) => handleArrayUpdate('reports', 'reportsList', index, 'name', e.target.value)}
                          placeholder="Nombre del reporte"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="text"
                          value={report.format}
                          onChange={(e) => handleArrayUpdate('reports', 'reportsList', index, 'format', e.target.value)}
                          placeholder="Ej: Excel, PDF, CSV"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="text"
                          value={report.parameters}
                          onChange={(e) => handleArrayUpdate('reports', 'reportsList', index, 'parameters', e.target.value)}
                          placeholder="Parámetros de filtrado"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleArrayRemove('reports', 'reportsList', index)}
                          className="w-full p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600 flex items-center justify-center gap-2"
                        >
                          <Trash2 size={18} /> Eliminar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* VALIDACIONES Y RESTRICCIONES */}
              {section.id === 'validations' && (
                <div className="space-y-4 bg-white p-6 rounded-lg">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Validaciones de Campos
                    </label>
                    <textarea
                      value={formData.validations.fieldValidations}
                      onChange={(e) => handleInputChange('validations', 'fieldValidations', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="Ej: Campo requerido, formato email, números solo, máximo 100 caracteres..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Reglas de Negocio que Impiden Acciones
                    </label>
                    <textarea
                      value={formData.validations.businessRules}
                      onChange={(e) => handleInputChange('validations', 'businessRules', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="Ej: No se puede eliminar un cliente que tiene órdenes..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mensajes de Error
                    </label>
                    <textarea
                      value={formData.validations.errorMessages}
                      onChange={(e) => handleInputChange('validations', 'errorMessages', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="2"
                      placeholder="Describe los mensajes de error que se muestran..."
                    />
                  </div>
                </div>
              )}

              {/* CONFIGURACIÓN */}
              {section.id === 'configuration' && (
                <div className="space-y-4 bg-white p-6 rounded-lg">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Archivos de Configuración
                    </label>
                    <textarea
                      value={formData.configuration.configFiles}
                      onChange={(e) => handleInputChange('configuration', 'configFiles', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="Ej: config.xml, appsettings.json, .env, etc..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Variables de Entorno
                    </label>
                    <textarea
                      value={formData.configuration.environmentVariables}
                      onChange={(e) => handleInputChange('configuration', 'environmentVariables', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="Ej: DATABASE_URL, API_KEY, LOG_LEVEL..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ¿Cómo se Mantiene y Actualiza la Configuración?
                    </label>
                    <textarea
                      value={formData.configuration.maintainability}
                      onChange={(e) => handleInputChange('configuration', 'maintainability', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="2"
                      placeholder="Describe el proceso de mantenimiento..."
                    />
                  </div>
                </div>
              )}

              {/* CASOS ESPECIALES */}
              {section.id === 'edgeCases' && (
                <div className="space-y-4 bg-white p-6 rounded-lg border-l-4 border-yellow-500">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Comportamientos Especiales
                    </label>
                    <textarea
                      value={formData.edgeCases.specialBehaviors}
                      onChange={(e) => handleInputChange('edgeCases', 'specialBehaviors', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="Ej: Cálculos especiales en fin de mes, importación de datos..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Excepciones Manejadas
                    </label>
                    <textarea
                      value={formData.edgeCases.exceptions}
                      onChange={(e) => handleInputChange('edgeCases', 'exceptions', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="¿Qué pasa si falla la conexión a BD? ¿Si el archivo es muy grande?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Casuística Compleja (Detalles Fáciles de Olvidar)
                    </label>
                    <textarea
                      value={formData.edgeCases.complexScenarios}
                      onChange={(e) => handleInputChange('edgeCases', 'complexScenarios', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="Detalles que son fáciles de pasar por alto en migraciones..."
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* En el JSX, antes del botón submit actual: */}
      {showSummary && (
        <ChecklistSummary
          formData={formData}
          onClose={() => {
            setShowSummary(false);
            onSubmit(formData); // Generar PDF después de confirmar
          }}
        />
      )}

      {/* Botón Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
            Generando PDF...
          </>
        ) : (
          '📄 Generar Reporte en PDF'
        )}
      </button>
    </form>
  );
}