// ========================================
// FILE: components/cotizador/PropuestaGenerada.jsx
// ========================================

'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Database, 
  Code, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  Users, 
  Printer, 
  BarChart3, 
  Settings, 
  Download,
  Shield,
  Zap,
  TrendingUp,
  Clock,
  ArrowLeft
} from 'lucide-react';

export default function PropuestaGenerada({ propuesta, onVolver }) {
  const [activeTab, setActiveTab] = useState('resumen');

  const sections = [
    { id: 'resumen', name: 'Resumen Ejecutivo', icon: FileText },
    { id: 'requerimientos', name: 'Requerimientos', icon: CheckCircle },
    { id: 'database', name: 'Base de Datos', icon: Database },
    { id: 'arquitectura', name: 'Arquitectura', icon: Code },
    { id: 'propuestas', name: 'Propuestas Comerciales', icon: DollarSign },
    { id: 'cronograma', name: 'Cronograma', icon: Calendar },
  ];

  const valorHora = propuesta.valorHora;
  const modulos = propuesta.modulos;
  const totalHoras = propuesta.totalHoras;
  const costoDesarrollo = propuesta.costoDesarrollo;
  const dashboardAddon = propuesta.dashboardOpcional;

  // Propuestas comerciales
  const propuestaSaaS = {
    nombre: "Modelo SaaS",
    inversionInicial: 8000000,
    cuotaMensual: 850000,
    permanenciaMinima: 24,
    opcionCompra: 12000000,
    ajusteAnual: "IPC + 2%"
  };

  const propuestaCompra = {
    nombre: "Compra Directa",
    inversionTotal: costoDesarrollo,
    pagos: [
      { momento: "Inicio del proyecto", porcentaje: 50, monto: costoDesarrollo * 0.5 },
      { momento: "Mitad del proyecto (6 semanas)", porcentaje: 30, monto: costoDesarrollo * 0.3 },
      { momento: "Entrega final", porcentaje: 20, monto: costoDesarrollo * 0.2 }
    ],
    soporteIncluido: 6,
    mantenimientoMensual: 650000
  };

  // FUNCIÓN PARA GENERAR PDF
  const generarPDF = async () => {
    const jsPDF = (await import('jspdf')).default;
    await import('jspdf-autotable');
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    let yPos = 20;

    // Función para agregar encabezado
    const agregarEncabezado = () => {
      try {
        doc.addImage('/logo.png', 'PNG', 15, 10, 30, 30);
      } catch (e) {
        console.log('Logo no disponible');
      }
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Paula Abad', 50, 20);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Software Developer', 50, 26);
      
      try {
        doc.addImage('/frame.png', 'PNG', pageWidth - 35, 10, 25, 25);
      } catch (e) {
        console.log('QR no disponible');
      }
    };

    // Función para agregar pie de página
    const agregarPieDePagina = (pageNum) => {
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.setFont('helvetica', 'normal');
      
      const pieTexto = [
        'Cra 10 # 50-44 Barrio Maraya, Pereira, Colombia',
        'WhatsApp: +57 305 443 4287 | www.paulabad.tech | paula@paulabad.tech'
      ];
      
      doc.text(pieTexto[0], pageWidth / 2, pageHeight - 15, { align: 'center' });
      doc.text(pieTexto[1], pageWidth / 2, pageHeight - 10, { align: 'center' });
      doc.text(`Página ${pageNum}`, pageWidth - 20, pageHeight - 10);
    };

    // PÁGINA 1: PORTADA
    agregarEncabezado();
    yPos = 50;
    
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(63, 81, 181);
    doc.text('PROPUESTA COMERCIAL', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 10;
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(propuesta.nombreProyecto || 'Sistema de Gestión', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 30;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('COTIZACIÓN N°:', 15, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(propuesta.numeroCotizacion, 55, yPos);
    
    yPos += 8;
    doc.setFont('helvetica', 'bold');
    doc.text('FECHA:', 15, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(propuesta.fecha, 55, yPos);
    
    yPos += 8;
    doc.setFont('helvetica', 'bold');
    doc.text('VALIDEZ:', 15, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text('30 días calendario', 55, yPos);
    
    yPos += 20;
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('DATOS DEL CLIENTE', 15, yPos);
    
    yPos += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const clienteInfo = [
      ['Empresa:', propuesta.datosCliente.empresa],
      ['NIT:', propuesta.datosCliente.nit || 'N/A'],
      ['Contacto:', propuesta.datosCliente.contacto],
      ['Teléfono:', propuesta.datosCliente.telefono || 'N/A'],
      ['Email:', propuesta.datosCliente.email],
      ['Ciudad:', propuesta.datosCliente.ciudad || 'N/A']
    ];
    
    clienteInfo.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label, 15, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(value, 50, yPos);
      yPos += 7;
    });
    
    yPos += 15;
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('RESUMEN EJECUTIVO', 15, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const resumen = [
      `Desarrollo de ${propuesta.nombreProyecto} con ${totalHoras} horas estimadas`,
      `de trabajo profesional. Incluye ${modulos.length} módulos principales con`,
      `tecnologías modernas y arquitectura escalable.`,
      '',
      `Inversión total: $${costoDesarrollo.toLocaleString('es-CO')} COP`
    ];
    
    resumen.forEach(linea => {
      doc.text(linea, 15, yPos);
      yPos += 5;
    });
    
    agregarPieDePagina(1);
    
    // PÁGINA 2: PROPUESTAS COMERCIALES
    doc.addPage();
    agregarEncabezado();
    yPos = 50;
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(63, 81, 181);
    doc.text('OPCIONES COMERCIALES', 15, yPos);
    
    yPos += 12;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text('Ofrecemos dos modalidades de contratación adaptadas a sus necesidades:', 15, yPos);
    
    yPos += 15;
    
    // Tabla comparativa
    doc.autoTable({
      startY: yPos,
      head: [['Concepto', 'Opción 1: SaaS', 'Opción 2: Compra']],
      body: [
        ['Inversión Inicial', '$8,000,000', `$${(propuestaCompra.inversionTotal/1000000).toFixed(1)}M`],
        ['Cuota Mensual', '$850,000', '$650,000 (opcional)*'],
        ['Costo Año 1', '$18,200,000', `$${((propuestaCompra.inversionTotal + 3900000)/1000000).toFixed(1)}M`],
        ['Propiedad Código', 'Opción compra $12M*', 'Inmediata'],
        ['Permanencia Mínima', '24 meses', 'Ninguna'],
        ['Soporte Incluido', 'Ilimitado', '6 meses'],
        ['Ideal Para', 'Bajo presupuesto inicial', 'Inversión disponible']
      ],
      theme: 'grid',
      headStyles: { 
        fillColor: [63, 81, 181],
        fontSize: 9,
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: { 
        fontSize: 9 
      },
      columnStyles: {
        0: { cellWidth: 50, fontStyle: 'bold' },
        1: { cellWidth: 65, halign: 'center' },
        2: { cellWidth: 65, halign: 'center' }
      }
    });
    
    yPos = doc.lastAutoTable.finalY + 5;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('* Mantenimiento opcional después de 6 meses incluidos', 15, yPos);
    
    agregarPieDePagina(2);
    
    // PÁGINA 3: MÓDULOS DEL SISTEMA
    doc.addPage();
    agregarEncabezado();
    yPos = 50;
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(63, 81, 181);
    doc.text('MÓDULOS DEL SISTEMA', 15, yPos);
    
    yPos += 12;
    
    modulos.slice(0, 5).forEach((modulo, idx) => {
      if (yPos > 250) {
        agregarPieDePagina(3);
        doc.addPage();
        agregarEncabezado();
        yPos = 50;
      }
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(63, 81, 181);
      doc.text(`${idx + 1}. ${modulo.nombre}`, 15, yPos);
      
      yPos += 6;
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      doc.text(`${modulo.horas} horas - $${(modulo.horas * valorHora).toLocaleString('es-CO')} COP`, 15, yPos);
      
      yPos += 6;
      doc.setFontSize(8);
      
      modulo.tareas.slice(0, 3).forEach(tarea => {
        if (yPos > 270) {
          agregarPieDePagina(3);
          doc.addPage();
          agregarEncabezado();
          yPos = 50;
        }
        const lines = doc.splitTextToSize(`• ${tarea}`, 170);
        doc.text(lines, 20, yPos);
        yPos += lines.length * 4;
      });
      
      yPos += 5;
    });
    
    agregarPieDePagina(3);
    
    // PÁGINA 4: CRONOGRAMA
    doc.addPage();
    agregarEncabezado();
    yPos = 50;
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(63, 81, 181);
    doc.text('CRONOGRAMA DE DESARROLLO', 15, yPos);
    
    yPos += 12;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`Duración total: ${propuesta.duracionSemanas} semanas`, 15, yPos);
    
    yPos += 15;
    
    if (propuesta.cronograma && propuesta.cronograma.length > 0) {
      propuesta.cronograma.forEach((sprint, idx) => {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(`${sprint.fase} - Semanas ${sprint.semana}`, 15, yPos);
        yPos += 6;
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text(`Hito: ${sprint.hitos}`, 20, yPos);
        yPos += 10;
      });
    }
    
    agregarPieDePagina(4);
    
    // PÁGINA FINAL: CONDICIONES
    doc.addPage();
    agregarEncabezado();
    yPos = 50;
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(63, 81, 181);
    doc.text('CONDICIONES COMERCIALES', 15, yPos);
    
    yPos += 15;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    
    const condiciones = [
      'Validez de la Propuesta:',
      '  • Esta cotización es válida por 30 días calendario',
      '',
      'Forma de Pago (Compra Directa):',
      `  • 50% al iniciar: $${(propuestaCompra.pagos[0].monto/1000000).toFixed(1)}M`,
      `  • 30% a mitad: $${(propuestaCompra.pagos[1].monto/1000000).toFixed(1)}M`,
      `  • 20% al finalizar: $${(propuestaCompra.pagos[2].monto/1000000).toFixed(1)}M`,
    ];
    
    condiciones.forEach(linea => {
      doc.text(linea, 15, yPos);
      yPos += 5;
    });
    
    yPos += 15;
    
    doc.setFillColor(76, 175, 80);
    doc.rect(15, yPos, pageWidth - 30, 35, 'F');
    
    yPos += 10;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('PRÓXIMOS PASOS', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const proximosPasos = [
      '1. Revise y apruebe esta propuesta',
      '2. Firme el contrato de desarrollo',
      '3. Realice el pago inicial según opción elegida',
      '4. Iniciamos desarrollo en 7 días hábiles'
    ];
    
    proximosPasos.forEach(paso => {
      doc.text(paso, pageWidth / 2, yPos, { align: 'center' });
      yPos += 6;
    });
    
    agregarPieDePagina(5);
    
    // Guardar PDF
    const timestamp = new Date().getTime();
    const nombreArchivo = `Cotizacion_${propuesta.numeroCotizacion}_${propuesta.datosCliente.empresa.replace(/\s+/g, '')}_${timestamp}.pdf`;
    doc.save(nombreArchivo);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER PRINCIPAL */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {propuesta.nombreProyecto}
              </h1>
              <p className="text-xl text-gray-600">{propuesta.datosCliente.empresa}</p>
              <p className="text-sm text-gray-500 mt-2">
                Cliente: {propuesta.datosCliente.contacto} | {propuesta.datosCliente.email} | Tel: {propuesta.datosCliente.telefono}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {propuesta.datosCliente.nit && `NIT: ${propuesta.datosCliente.nit} | `}
                {propuesta.datosCliente.ciudad}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Propuesta Técnica y Comercial</div>
              <div className="text-3xl font-bold text-indigo-600 mb-1">
                ${(costoDesarrollo / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-600">{totalHoras} horas | {propuesta.duracionSemanas} semanas</div>
              <div className="text-xs text-gray-500 mt-2">
                Cotización: {propuesta.numeroCotizacion}
              </div>
              <div className="text-xs text-gray-500">
                Fecha: {propuesta.fecha}
              </div>
            </div>
          </div>
        </div>

        {/* NAVEGACIÓN TABS */}
        <div className="bg-white rounded-lg shadow-lg mb-6 overflow-hidden">
          <div className="flex overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap border-b-4 ${
                    activeTab === section.id
                      ? 'bg-indigo-600 text-white border-indigo-800'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-transparent'
                  }`}
                >
                  <Icon size={20} />
                  {section.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          {/* TAB RESUMEN EJECUTIVO */}
          {activeTab === 'resumen' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Resumen Ejecutivo</h2>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-6 rounded-lg">
                <h3 className="font-bold text-blue-900 mb-3 text-xl flex items-center gap-2">
                  <FileText size={24} />
                  Objetivo del Proyecto
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Desarrollar <strong>{propuesta.nombreProyecto}</strong> mediante un enfoque 
                  ágil y profesional, implementando <strong>{modulos.length} módulos principales</strong> que 
                  cubren todas las necesidades del negocio con tecnologías modernas y arquitectura escalable.
                </p>
              </div>

              {/* Métricas Clave */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                  <Clock size={32} className="mb-2" />
                  <div className="text-3xl font-bold">{totalHoras}</div>
                  <div className="text-sm opacity-90">Horas de Desarrollo</div>
                  <div className="text-xs opacity-75 mt-1">Incluye todo el desarrollo</div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white p-6 rounded-lg shadow-lg">
                  <Calendar size={32} className="mb-2" />
                  <div className="text-3xl font-bold">{propuesta.duracionSemanas}</div>
                  <div className="text-sm opacity-90">Semanas</div>
                  <div className="text-xs opacity-75 mt-1">{propuesta.duracionSemanas / 2} sprints de 2 semanas</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
                  <CheckCircle size={32} className="mb-2" />
                  <div className="text-3xl font-bold">{modulos.length}</div>
                  <div className="text-sm opacity-90">Módulos Principales</div>
                  <div className="text-xs opacity-75 mt-1">Desarrollo completo</div>
                </div>
                <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white p-6 rounded-lg shadow-lg">
                  <DollarSign size={32} className="mb-2" />
                  <div className="text-3xl font-bold">${(costoDesarrollo/1000000).toFixed(1)}M</div>
                  <div className="text-sm opacity-90">Inversión Total</div>
                  <div className="text-xs opacity-75 mt-1">Valor hora: ${valorHora.toLocaleString()}</div>
                </div>
              </div>

              {/* Stack Tecnológico */}
              {propuesta.stackTecnologico && (
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-lg">
                  <h3 className="font-bold mb-4 text-xl flex items-center gap-2">
                    <Code size={24} />
                    Stack Tecnológico Propuesto
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                    <div>
                      <div className="font-semibold text-blue-300 mb-2">Frontend:</div>
                      <div className="space-y-1 text-gray-300">
                        {propuesta.stackTecnologico.frontend?.map((tech, idx) => (
                          <div key={idx}>• {tech}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-green-300 mb-2">Backend:</div>
                      <div className="space-y-1 text-gray-300">
                        {propuesta.stackTecnologico.backend?.map((tech, idx) => (
                          <div key={idx}>• {tech}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-orange-300 mb-2">Infraestructura:</div>
                      <div className="space-y-1 text-gray-300">
                        {propuesta.stackTecnologico.infraestructura?.map((tech, idx) => (
                          <div key={idx}>• {tech}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Dashboard Opcional */}
              {dashboardAddon && dashboardAddon.incluido && (
                <div className="border-2 border-yellow-400 rounded-lg overflow-hidden bg-yellow-50">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-5">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <BarChart3 size={32} />
                        <div>
                          <h3 className="text-xl font-bold">Dashboard Ejecutivo</h3>
                          <div className="text-sm opacity-90">Módulo Adicional Premium</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">{dashboardAddon.horas}h</div>
                        <div className="text-sm opacity-90">
                          ${dashboardAddon.precio.toLocaleString('es-CO')} COP
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB REQUERIMIENTOS */}
          {activeTab === 'requerimientos' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Requerimientos Funcionales Detallados</h2>
              
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mb-6">
                <p className="text-gray-700">
                  <strong>Total de horas de desarrollo:</strong> {totalHoras} horas. 
                  Todos los módulos incluyen desarrollo completo, testing y documentación.
                </p>
              </div>

              {/* Módulos */}
              {modulos.map((modulo, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5">
                    <div className="flex justify-between items-center flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-white text-indigo-600 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                          {idx + 1}
                        </div>
                        <h3 className="text-xl font-bold">{modulo.nombre}</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">{modulo.horas}h</div>
                        <div className="text-sm opacity-90">
                          ${(modulo.horas * valorHora).toLocaleString('es-CO')} COP
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 bg-gray-50">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle size={18} className="text-green-600" />
                      Funcionalidades incluidas:
                    </h4>
                    <ul className="space-y-2">
                      {modulo.tareas.map((tarea, tidx) => (
                        <li key={tidx} className="flex items-start gap-3 text-gray-700 p-2 hover:bg-white rounded transition-colors">
                          <CheckCircle size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{tarea}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {/* Resumen Total */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">📊 Resumen de Desarrollo</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm opacity-90 mb-1">Total Horas</div>
                    <div className="text-4xl font-bold">{totalHoras}h</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-90 mb-1">Costo de Desarrollo</div>
                    <div className="text-4xl font-bold">
                      ${(costoDesarrollo / 1000000).toFixed(1)}M
                    </div>
                  </div>
                  <div>
                    <div className="text-sm opacity-90 mb-1">Módulos Incluidos</div>
                    <div className="text-4xl font-bold">{modulos.length}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB BASE DE DATOS */}
          {activeTab === 'database' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Modelo de Base de Datos</h2>
              
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-600 p-6 rounded-lg">
                <h3 className="font-bold text-purple-900 mb-3 text-xl flex items-center gap-2">
                  <Database size={24} />
                  PostgreSQL con Alta Disponibilidad
                </h3>
                <p className="text-gray-700">
                  Base de datos relacional robusta diseñada para manejar el volumen de datos 
                  del proyecto con alta concurrencia. Incluye índices optimizados, transacciones 
                  ACID, y backups automáticos.
                </p>
              </div>

              {/* Tablas */}
              {propuesta.baseDatos && propuesta.baseDatos.map((tabla, idx) => (
                <div key={idx} className="border-2 border-gray-300 rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-5">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <Database size={28} />
                        <div>
                          <h3 className="text-2xl font-bold font-mono">{tabla.nombre}</h3>
                          <p className="text-sm opacity-90 mt-1">{tabla.descripcion}</p>
                        </div>
                      </div>
                      <div className="bg-white text-gray-900 px-4 py-2 rounded font-bold">
                        {tabla.campos.length} campos
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100 border-b-2 border-gray-300">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 w-1/4">Campo</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 w-1/3">Tipo de Dato</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 w-5/12">Descripción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tabla.campos.map((campo, cidx) => (
                          <tr key={cidx} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3 font-mono text-sm text-gray-900 font-semibold">
                              {campo.nombre}
                            </td>
                            <td className="px-4 py-3 font-mono text-sm text-gray-600">
                              {campo.tipo}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {campo.descripcion}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB ARQUITECTURA */}
          {activeTab === 'arquitectura' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Arquitectura del Sistema</h2>
              
              <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg">
                <h3 className="font-bold text-red-900 mb-3 text-xl flex items-center gap-2">
                  <Shield size={24} />
                  Seguridad y Alta Disponibilidad
                </h3>
                <p className="text-gray-700 mb-3">
                  Sistema diseñado con múltiples capas de seguridad y arquitectura de alta 
                  disponibilidad para garantizar operación continua 24/7.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">Protección:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>✅ Encriptación de contraseñas (bcrypt)</li>
                      <li>✅ JWT con refresh tokens</li>
                      <li>✅ HTTPS obligatorio (SSL/TLS)</li>
                      <li>✅ Sanitización de inputs</li>
                      <li>✅ Rate limiting</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">Disponibilidad:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>✅ Backups cada 6 horas</li>
                      <li>✅ Servidor standby</li>
                      <li>✅ Recuperación en 30-60 min</li>
                      <li>✅ SLA 99.5% uptime</li>
                      <li>✅ Monitoreo 24/7</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB PROPUESTAS COMERCIALES */}
          {activeTab === 'propuestas' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Propuestas Comerciales</h2>
              
              {/* Comparativa */}
              <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-gray-800 text-white p-4">
                  <h3 className="text-xl font-bold text-center">⚖️ Comparativa Rápida</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Aspecto</th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-blue-700">Opción 1: SaaS</th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-green-700">Opción 2: Compra</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold">Inversión Inicial</td>
                        <td className="px-6 py-4 text-center text-2xl font-bold text-blue-600">$8M</td>
                        <td className="px-6 py-4 text-center text-2xl font-bold text-green-600">
                          ${(propuestaCompra.inversionTotal/1000000).toFixed(1)}M
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold">Cuota Mensual</td>
                        <td className="px-6 py-4 text-center text-xl font-bold text-blue-600">$850k</td>
                        <td className="px-6 py-4 text-center text-xl font-bold text-green-600">$650k*</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold">Cliente es Dueño</td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-orange-600 font-bold">Opción $12M</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-green-600 font-bold text-xl">✓ Inmediato</span>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold">Permanencia</td>
                        <td className="px-6 py-4 text-center font-bold text-blue-600">24 meses</td>
                        <td className="px-6 py-4 text-center font-bold text-green-600">Ninguna</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Opción SaaS */}
              <div className="border-4 border-blue-500 rounded-lg overflow-hidden shadow-xl">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="text-sm opacity-90 mb-1">OPCIÓN 1</div>
                      <h3 className="text-3xl font-bold">Modelo SaaS</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-bold">$8M</div>
                      <div className="text-sm opacity-90">+ $850k/mes</div>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <p className="text-gray-700 mb-4">
                    Todo incluido en la cuota mensual: hosting, soporte ilimitado, actualizaciones, 
                    backups cifrados, monitoreo 24/7 y corrección de errores. Sin costos ocultos.
                  </p>
                  <div className="bg-orange-50 p-4 rounded border border-orange-200">
                    <p className="text-sm font-semibold text-orange-900">
                      Opción de compra: Después de 24 meses puede adquirir el código por $12M adicionales.
                    </p>
                  </div>
                </div>
              </div>

              {/* Opción Compra */}
              <div className="border-4 border-green-500 rounded-lg overflow-hidden shadow-xl">
                <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="text-sm opacity-90 mb-1">OPCIÓN 2 ⭐ RECOMENDADA</div>
                      <h3 className="text-3xl font-bold">Compra Directa</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-bold">${(propuestaCompra.inversionTotal/1000000).toFixed(1)}M</div>
                      <div className="text-sm opacity-90">3 pagos</div>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {propuestaCompra.pagos.map((pago, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-lg border-2 border-green-200 shadow">
                        <div className="text-sm text-gray-600 mb-1">{pago.momento}</div>
                        <div className="text-3xl font-bold text-green-700">{pago.porcentaje}%</div>
                        <div className="text-xl font-bold text-gray-900 mt-2">
                          ${(pago.monto / 1000000).toFixed(1)}M
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-green-50 p-4 rounded border border-green-200">
                    <p className="text-sm font-semibold text-green-900">
                      ✅ Incluye código fuente, 6 meses de soporte GRATIS, capacitación completa, 
                      manuales y documentación. Es dueño desde el día 1.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CRONOGRAMA */}
          {activeTab === 'cronograma' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Cronograma de Desarrollo</h2>
              
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg mb-6">
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Calendar size={28} />
                  Metodología Ágil - Scrum
                </h3>
                <p className="opacity-90">
                  Desarrollo iterativo en sprints de 2 semanas. Entregas incrementales 
                  con demos al final de cada sprint para feedback continuo.
                </p>
              </div>

              {/* Sprints */}
              {propuesta.cronograma && propuesta.cronograma.length > 0 ? (
                <div className="space-y-4">
                  {propuesta.cronograma.map((sprint, idx) => (
                    <div key={idx} className="border-2 border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-5 flex justify-between items-center flex-wrap gap-4">
                        <div>
                          <div className="text-sm opacity-90">Semanas {sprint.semana}</div>
                          <h3 className="text-2xl font-bold">{sprint.fase}</h3>
                          <div className="text-sm opacity-90 mt-1">🎯 {sprint.hitos}</div>
                        </div>
                        <div className="text-4xl font-bold">{idx + 1}/{propuesta.cronograma.length}</div>
                      </div>
                      <div className="p-5 bg-gray-50">
                        <div className="font-semibold text-gray-900 mb-3">Módulos a desarrollar:</div>
                        <ul className="space-y-2">
                          {sprint.modulos.map((modulo, midx) => (
                            <li key={midx} className="flex items-start gap-2 text-gray-700 p-2 bg-white rounded">
                              <CheckCircle size={18} className="text-purple-600 mt-0.5 flex-shrink-0" />
                              <span>{modulo}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-100 p-8 rounded-lg text-center">
                  <p className="text-gray-600">Cronograma será definido durante el kick-off del proyecto</p>
                </div>
              )}

              {/* Resumen Timeline */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-center">⏱️ Resumen del Timeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold mb-1">{propuesta.duracionSemanas}</div>
                    <div className="text-sm opacity-90">Semanas Totales</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold mb-1">{totalHoras}</div>
                    <div className="text-sm opacity-90">Horas de Desarrollo</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold mb-1">{propuesta.cronograma?.length || 6}</div>
                    <div className="text-sm opacity-90">Sprints</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* FOOTER CON BOTONES */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <div className="flex justify-center gap-4 flex-wrap mb-6">
            <button 
              onClick={generarPDF}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg font-bold text-lg"
            >
              <Download size={24} />
              Descargar PDF
            </button>
            <button 
              onClick={onVolver}
              className="bg-gray-600 text-white px-8 py-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 shadow-lg font-bold text-lg"
            >
              <ArrowLeft size={24} />
              Nueva Cotización
            </button>
          </div>

          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-gray-600 mb-2">
              Documento generado por <strong>Paula Abad</strong> - Senior Software Developer
            </p>
            <p className="text-sm text-gray-500 mb-1">
              🌐 www.paulabad.tech | 📧 paula@paulabad.tech | 📱 +57 305 443 4287
            </p>
            <p className="text-xs text-gray-500 mt-4">
              Esta propuesta es válida por 30 días desde la fecha de emisión.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}