'use client';
// PARTE 1: IMPORTS Y CONFIGURACIÓN INICIAL
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
  Clock
} from 'lucide-react';

const ProjectDocument = () => {
  const [activeTab, setActiveTab] = useState('resumen');

  const sections = [
    { id: 'resumen', name: 'Resumen Ejecutivo', icon: FileText },
    { id: 'requerimientos', name: 'Requerimientos', icon: CheckCircle },
    { id: 'database', name: 'Base de Datos', icon: Database },
    { id: 'arquitectura', name: 'Arquitectura', icon: Code },
    { id: 'propuestas', name: 'Propuestas Comerciales', icon: DollarSign },
    { id: 'cronograma', name: 'Cronograma', icon: Calendar },
  ];

  const valorHora = 37500;

  // Módulos sin Dashboard
  const modulos = [
    {
      nombre: "Autenticación y Gestión de Usuarios",
      horas: 97,
      tareas: [
        "Login con usuario y contraseña + JWT con refresh tokens",
        "Recuperación de contraseña por email con token temporal",
        "Cambio de contraseña del usuario con validación de fortaleza",
        "CRUD de usuarios (solo admins)",
        "Gestión de roles (Administrador, Responsable)",
        "Sistema de permisos por rol con control granular",
        "Bloqueo automático tras 5 intentos fallidos",
        "Sesiones con expiración por inactividad",
        "2FA opcional para administradores",
        "Auditoría completa de accesos"
      ]
    },
    {
      nombre: "Gestión de Datos Maestros",
      horas: 66,
      tareas: [
        "CRUD Botaderos (nombre, dirección, teléfonos, responsable, estado)",
        "CRUD Clientes (razón social, NIT, dirección obra, teléfono, email, contacto, estado)",
        "CRUD Materiales (Tierra, Escombros, Ladrillo Triturado + nuevos)",
        "CRUD Obras (nombre, ubicación, cliente asociado)",
        "CRUD Responsables/Vendedores",
        "Configuración de precios estándar (m³ y bultos por material)",
        "Gestión de precios especiales por botadero",
        "Validaciones de datos con sanitización",
        "Importación masiva de datos desde Excel"
      ]
    },
    {
      nombre: "Generación de Tickets",
      horas: 115,
      tareas: [
        "Formulario de registro con validaciones en tiempo real",
        "Selección de botadero (carga automática de dirección en encabezado)",
        "Selección de cliente con autocomplete y búsqueda por NIT",
        "Selección de obra asociada al cliente",
        "Selección de tipo de transacción: Volqueta (7 o 16 m³) o Bultos",
        "Cálculo automático de totales según tipo y material",
        "Ingreso manual de precio cuando es necesario",
        "Selección de forma de pago (Efectivo/Crédito)",
        "Campo obligatorio: Placa del vehículo con formato validado",
        "Consecutivo global automático (no reutilizable, sin duplicados)",
        "Vista previa del ticket antes de guardar",
        "Validación de campos obligatorios con mensajes claros",
        "Registro de auditoría completo (quién creó, fecha/hora, IP)",
        "Protección contra ataques de inyección SQL y XSS"
      ]
    },
    {
      nombre: "Impresión Térmica",
      horas: 74,
      tareas: [
        "Integración con impresora térmica GOOJPRT PT-210 (protocolo ESC/POS)",
        "Impresión desde PC vía USB/Bluetooth",
        "Impresión desde móvil vía Bluetooth Low Energy",
        "Formato de ticket térmico 58mm con todos los campos requeridos",
        "Encabezado: Empresa, NIT, Régimen Común, dirección botadero, teléfonos",
        "Cuerpo: N° remisión, fecha/hora, placa, obra, vendedor, cliente, NIT cliente, forma pago",
        "Detalle: Material, cantidad, total",
        "Pie: Total IVA (0), Descuento (0), Total, Abono (0), Saldo",
        "Pie: Mensaje legal, espacio firma/cédula, diseñado por www.paulabad.tech",
        "Re-impresión de tickets existentes",
        "Control de errores de impresión con reintentos automáticos",
        "Cola de impresión para múltiples tickets",
        "Testing en diferentes modelos de impresoras térmicas"
      ]
    },
    {
      nombre: "Gestión de Tickets",
      horas: 70,
      tareas: [
        "Listado de tickets con paginación eficiente (lazy loading)",
        "Filtros múltiples: fecha, botadero, cliente, responsable, estado, tipo",
        "Búsqueda rápida por número de remisión",
        "Ver detalle completo del ticket con historial",
        "Anular ticket (admin + responsable creador)",
        "Ticket anulado mantiene número y se marca como ANULADO visualmente",
        "No permite modificación de tickets (error = anular + crear nuevo)",
        "Historial de auditoría completo por ticket",
        "Validación: no duplicar números de remisión",
        "Exportación de lista de tickets a Excel/PDF"
      ]
    },
    {
      nombre: "Reportes e Informes",
      horas: 91,
      tareas: [
        "Filtros múltiples: rango fecha, botadero, cliente, responsable, forma pago, tipo (7m³/16m³/bultos)",
        "Generación de reportes en PDF con diseño profesional",
        "Generación de reportes en Excel con formato y fórmulas",
        "Estructura del reporte: encabezado empresa, fecha expedición, admin emisor, datos filtrados",
        "Columnas: fecha, recibo, cantidad, material, placa, obra, valor cobrar",
        "Totales por tipo de material (como Excel actual del cliente)",
        "Total general del reporte con subtotales",
        "Vista previa antes de descargar",
        "Incluir tickets anulados marcados visualmente en rojo",
        "Diseño profesional y legible con logo de empresa",
        "Gráficos básicos de resumen (barras, pasteles)",
        "Caché de reportes para generación rápida"
      ]
    },
    {
      nombre: "Seguridad Avanzada",
      horas: 50,
      tareas: [
        "Rate limiting para prevenir ataques de fuerza bruta",
        "CORS configurado correctamente",
        "Helmet.js para headers de seguridad",
        "CSP (Content Security Policy)",
        "CSRF protection en todos los formularios",
        "Encriptación de datos sensibles en BD",
        "SSL/TLS obligatorio (HTTPS)",
        "Políticas de contraseñas fuertes",
        "Sanitización completa de inputs",
        "Prepared statements para prevenir SQL injection"
      ]
    },
    {
      nombre: "Performance y Escalabilidad",
      horas: 35,
      tareas: [
        "Caching con Redis para consultas frecuentes",
        "Índices optimizados en base de datos",
        "Connection pooling en BD",
        "Compresión de respuestas API (gzip)",
        "Lazy loading de módulos en frontend",
        "Code splitting para reducir bundle size",
        "Optimización de queries (evitar N+1)"
      ]
    },
    {
      nombre: "Logging y Auditoría",
      horas: 25,
      tareas: [
        "Sistema de logs estructurado (Winston)",
        "Logs de todas las acciones críticas",
        "Auditoría de cambios en datos maestros",
        "Logs de errores con stack trace",
        "Retención de logs 90 días"
      ]
    },
    {
      nombre: "Monitoreo y Alertas",
      horas: 35,
      tareas: [
        "Monitoreo 24/7 con UptimeRobot",
        "Error tracking con Sentry",
        "Alertas automáticas por email/SMS",
        "Dashboard de salud del sistema",
        "Métricas de rendimiento (APM)"
      ]
    },
    {
      nombre: "Testing Completo",
      horas: 40,
      tareas: [
        "Testing unitario (cobertura 70%+)",
        "Testing de integración de APIs",
        "Testing de seguridad (OWASP Top 10)",
        "Testing de performance (300 tickets simultáneos)",
        "Testing de impresión en diferentes dispositivos"
      ]
    },
    {
      nombre: "Deploy y CI/CD",
      horas: 25,
      tareas: [
        "Pipeline CI/CD automatizado (GitHub Actions)",
        "Deploy automático a staging y producción",
        "Rollback automático en caso de fallo",
        "Ambientes: Dev, Staging, Production",
        "Scripts de migración de BD"
      ]
    },
    {
      nombre: "Documentación y Capacitación",
      horas: 58,
      tareas: [
        "Documentación técnica completa",
        "Manual de usuario para Administradores",
        "Manual de usuario para Responsables",
        "Videos tutoriales de capacitación",
        "3 sesiones de capacitación en vivo (6 horas totales)",
        "Documentación de API (Swagger)",
        "Guía de troubleshooting"
      ]
    }
  ];

  const totalHoras = modulos.reduce((sum, mod) => sum + mod.horas, 0);
  const costoDesarrollo = totalHoras * valorHora;

  // Dashboard como add-on
  const dashboardAddon = {
    nombre: "Dashboard Ejecutivo con Métricas Avanzadas",
    horas: 54,
    precio: 4500000,
    tareas: [
      "Métricas en tiempo real del día actual",
      "Total tickets generados hoy + total en dinero",
      "Análisis por botadero (gráfico barras + pastel)",
      "Análisis por vendedor con ranking",
      "Top 5 clientes del día/mes/año",
      "Gráfico de tendencias últimos 7 días y mes actual",
      "Comparativa tipo transacción (volqueta vs bultos)",
      "Análisis de tickets anulados",
      "Diseño responsive (PC, tablet, móvil)",
      "Actualización automática cada 30 segundos"
    ]
  };

  // PARTE 2: CRONOGRAMA Y TABLAS DE BASE DE DATOS

  const cronograma = [
    { 
      semana: "1-2", 
      fase: "Sprint 1", 
      modulos: ["Autenticación y Usuarios", "Datos Maestros (60%)"],
      hitos: "Login funcional, CRUD básico de maestros"
    },
    { 
      semana: "3-4", 
      fase: "Sprint 2", 
      modulos: ["Datos Maestros (40%)", "Generación Tickets (50%)"],
      hitos: "Maestros completos, formulario de tickets base"
    },
    { 
      semana: "5-6", 
      fase: "Sprint 3", 
      modulos: ["Generación Tickets (50%)", "Impresión Térmica (60%)"],
      hitos: "Tickets funcionales, primera impresión exitosa"
    },
    { 
      semana: "7-8", 
      fase: "Sprint 4", 
      modulos: ["Impresión Térmica (40%)", "Gestión de Tickets"],
      hitos: "Impresión móvil/PC completa, listado y filtros"
    },
    { 
      semana: "9-10", 
      fase: "Sprint 5", 
      modulos: ["Reportes (60%)", "Seguridad Avanzada"],
      hitos: "Reportes PDF/Excel, seguridad implementada"
    },
    { 
      semana: "11-12", 
      fase: "Sprint 6", 
      modulos: ["Reportes (40%)", "Testing", "Deploy"],
      hitos: "Sistema completo, testing aprobado, producción"
    },
  ];

  const tablas = [
    {
      nombre: "usuarios",
      descripcion: "Gestión de usuarios del sistema (admins y responsables)",
      campos: [
        { nombre: "id", tipo: "SERIAL PRIMARY KEY", descripcion: "ID único" },
        { nombre: "nombre_completo", tipo: "VARCHAR(200) NOT NULL", descripcion: "Nombre del usuario" },
        { nombre: "usuario", tipo: "VARCHAR(100) UNIQUE NOT NULL", descripcion: "Username para login" },
        { nombre: "email", tipo: "VARCHAR(200) UNIQUE NOT NULL", descripcion: "Email del usuario" },
        { nombre: "password_hash", tipo: "VARCHAR(255) NOT NULL", descripcion: "Password encriptado bcrypt" },
        { nombre: "rol", tipo: "ENUM('ADMIN','RESPONSABLE')", descripcion: "Rol del usuario" },
        { nombre: "intentos_fallidos", tipo: "INT DEFAULT 0", descripcion: "Intentos login fallidos" },
        { nombre: "bloqueado_hasta", tipo: "TIMESTAMP NULL", descripcion: "Fecha bloqueo temporal" },
        { nombre: "activo", tipo: "BOOLEAN DEFAULT true", descripcion: "Usuario activo/inactivo" },
        { nombre: "creado_en", tipo: "TIMESTAMP DEFAULT NOW()", descripcion: "Fecha creación" },
        { nombre: "actualizado_en", tipo: "TIMESTAMP", descripcion: "Última actualización" }
      ]
    },
    {
      nombre: "botaderos",
      descripcion: "Información de los 4 botaderos de disposición de escombros",
      campos: [
        { nombre: "id", tipo: "SERIAL PRIMARY KEY", descripcion: "ID único" },
        { nombre: "nombre", tipo: "VARCHAR(200) NOT NULL", descripcion: "Nombre del botadero" },
        { nombre: "direccion", tipo: "TEXT NOT NULL", descripcion: "Dirección completa (va en ticket)" },
        { nombre: "telefono1", tipo: "VARCHAR(20)", descripcion: "Teléfono principal" },
        { nombre: "telefono2", tipo: "VARCHAR(20)", descripcion: "Teléfono secundario" },
        { nombre: "responsable_id", tipo: "INT REFERENCES usuarios(id)", descripcion: "Responsable asignado" },
        { nombre: "activo", tipo: "BOOLEAN DEFAULT true", descripcion: "Botadero activo/inactivo" },
        { nombre: "creado_en", tipo: "TIMESTAMP DEFAULT NOW()", descripcion: "Fecha creación" }
      ]
    },
    {
      nombre: "clientes",
      descripcion: "Empresas constructoras que utilizan el servicio",
      campos: [
        { nombre: "id", tipo: "SERIAL PRIMARY KEY", descripcion: "ID único" },
        { nombre: "razon_social", tipo: "VARCHAR(200) NOT NULL", descripcion: "Nombre empresa" },
        { nombre: "nit", tipo: "VARCHAR(50) UNIQUE NOT NULL", descripcion: "NIT único" },
        { nombre: "telefono", tipo: "VARCHAR(20)", descripcion: "Teléfono contacto" },
        { nombre: "email", tipo: "VARCHAR(200)", descripcion: "Email contacto" },
        { nombre: "contacto_principal", tipo: "VARCHAR(200)", descripcion: "Persona de contacto" },
        { nombre: "activo", tipo: "BOOLEAN DEFAULT true", descripcion: "Cliente activo/inactivo" },
        { nombre: "creado_en", tipo: "TIMESTAMP DEFAULT NOW()", descripcion: "Fecha creación" }
      ]
    },
    {
      nombre: "obras",
      descripcion: "Obras de construcción asociadas a cada cliente",
      campos: [
        { nombre: "id", tipo: "SERIAL PRIMARY KEY", descripcion: "ID único" },
        { nombre: "nombre", tipo: "VARCHAR(200) NOT NULL", descripcion: "Nombre de la obra" },
        { nombre: "direccion", tipo: "TEXT", descripcion: "Ubicación de la obra" },
        { nombre: "cliente_id", tipo: "INT REFERENCES clientes(id)", descripcion: "Cliente dueño" },
        { nombre: "activo", tipo: "BOOLEAN DEFAULT true", descripcion: "Obra activa/inactiva" },
        { nombre: "creado_en", tipo: "TIMESTAMP DEFAULT NOW()", descripcion: "Fecha creación" }
      ]
    },
    {
      nombre: "materiales",
      descripcion: "Catálogo de materiales: Tierra, Escombros, Ladrillo Triturado",
      campos: [
        { nombre: "id", tipo: "SERIAL PRIMARY KEY", descripcion: "ID único" },
        { nombre: "nombre", tipo: "VARCHAR(100) UNIQUE NOT NULL", descripcion: "Nombre del material" },
        { nombre: "precio_m3_estandar", tipo: "DECIMAL(10,2) DEFAULT 0", descripcion: "Precio por m³ estándar" },
        { nombre: "precio_bulto_estandar", tipo: "DECIMAL(10,2) DEFAULT 0", descripcion: "Precio por bulto estándar" },
        { nombre: "activo", tipo: "BOOLEAN DEFAULT true", descripcion: "Material activo/inactivo" },
        { nombre: "creado_en", tipo: "TIMESTAMP DEFAULT NOW()", descripcion: "Fecha creación" }
      ]
    },
    {
      nombre: "precios_especiales_botadero",
      descripcion: "Precios personalizados por botadero (solo uno tiene precios diferentes)",
      campos: [
        { nombre: "id", tipo: "SERIAL PRIMARY KEY", descripcion: "ID único" },
        { nombre: "botadero_id", tipo: "INT REFERENCES botaderos(id)", descripcion: "Botadero" },
        { nombre: "material_id", tipo: "INT REFERENCES materiales(id)", descripcion: "Material" },
        { nombre: "precio_m3", tipo: "DECIMAL(10,2)", descripcion: "Precio especial m³" },
        { nombre: "precio_bulto", tipo: "DECIMAL(10,2)", descripcion: "Precio especial bulto" },
        { nombre: "UNIQUE", tipo: "(botadero_id, material_id)", descripcion: "Un precio por botadero-material" }
      ]
    },
    {
      nombre: "tickets",
      descripcion: "Registro de todos los tickets de disposición de escombros",
      campos: [
        { nombre: "id", tipo: "SERIAL PRIMARY KEY", descripcion: "ID único interno" },
        { nombre: "numero_remision", tipo: "INT UNIQUE NOT NULL", descripcion: "Consecutivo global único" },
        { nombre: "fecha", tipo: "TIMESTAMP NOT NULL", descripcion: "Fecha y hora del ticket" },
        { nombre: "botadero_id", tipo: "INT REFERENCES botaderos(id)", descripcion: "Botadero donde se generó" },
        { nombre: "cliente_id", tipo: "INT REFERENCES clientes(id)", descripcion: "Cliente" },
        { nombre: "obra_id", tipo: "INT REFERENCES obras(id)", descripcion: "Obra asociada" },
        { nombre: "vendedor_id", tipo: "INT REFERENCES usuarios(id)", descripcion: "Responsable que creó" },
        { nombre: "placa", tipo: "VARCHAR(20) NOT NULL", descripcion: "Placa del vehículo" },
        { nombre: "material_id", tipo: "INT REFERENCES materiales(id)", descripcion: "Material transportado" },
        { nombre: "tipo_transaccion", tipo: "ENUM('VOLQUETA_7','VOLQUETA_16','BULTOS')", descripcion: "Tipo de carga" },
        { nombre: "cantidad", tipo: "DECIMAL(10,2) NOT NULL", descripcion: "Cantidad (m³ o bultos)" },
        { nombre: "precio_unitario", tipo: "DECIMAL(10,2) NOT NULL", descripcion: "Precio por unidad" },
        { nombre: "total", tipo: "DECIMAL(12,2) NOT NULL", descripcion: "Total a pagar" },
        { nombre: "forma_pago", tipo: "ENUM('EFECTIVO','CREDITO')", descripcion: "Forma de pago" },
        { nombre: "estado", tipo: "ENUM('ACTIVO','ANULADO') DEFAULT 'ACTIVO'", descripcion: "Estado del ticket" },
        { nombre: "anulado_por_id", tipo: "INT REFERENCES usuarios(id)", descripcion: "Quién anuló (si aplica)" },
        { nombre: "anulado_en", tipo: "TIMESTAMP", descripcion: "Fecha anulación" },
        { nombre: "creado_por_id", tipo: "INT REFERENCES usuarios(id)", descripcion: "Quién creó el ticket" },
        { nombre: "creado_en", tipo: "TIMESTAMP DEFAULT NOW()", descripcion: "Fecha creación" },
        { nombre: "ip_creacion", tipo: "VARCHAR(45)", descripcion: "IP desde donde se creó" }
      ]
    },
    {
      nombre: "auditoria_tickets",
      descripcion: "Historial completo de acciones sobre tickets (creación, anulación, impresión)",
      campos: [
        { nombre: "id", tipo: "SERIAL PRIMARY KEY", descripcion: "ID único" },
        { nombre: "ticket_id", tipo: "INT REFERENCES tickets(id)", descripcion: "Ticket auditado" },
        { nombre: "accion", tipo: "ENUM('CREADO','ANULADO','IMPRESO','REIMPRESO')", descripcion: "Tipo de acción" },
        { nombre: "usuario_id", tipo: "INT REFERENCES usuarios(id)", descripcion: "Usuario que ejecutó" },
        { nombre: "fecha", tipo: "TIMESTAMP DEFAULT NOW()", descripcion: "Fecha de la acción" },
        { nombre: "ip", tipo: "VARCHAR(45)", descripcion: "IP del usuario" },
        { nombre: "detalles", tipo: "TEXT", descripcion: "Información adicional" }
      ]
    },
    {
      nombre: "sesiones",
      descripcion: "Control de sesiones activas para seguridad",
      campos: [
        { nombre: "id", tipo: "SERIAL PRIMARY KEY", descripcion: "ID único" },
        { nombre: "usuario_id", tipo: "INT REFERENCES usuarios(id)", descripcion: "Usuario de la sesión" },
        { nombre: "token", tipo: "VARCHAR(500) UNIQUE NOT NULL", descripcion: "JWT token" },
        { nombre: "refresh_token", tipo: "VARCHAR(500) UNIQUE", descripcion: "Refresh token" },
        { nombre: "ip", tipo: "VARCHAR(45)", descripcion: "IP del cliente" },
        { nombre: "user_agent", tipo: "TEXT", descripcion: "Navegador/dispositivo" },
        { nombre: "expira_en", tipo: "TIMESTAMP NOT NULL", descripcion: "Expiración del token" },
        { nombre: "ultima_actividad", tipo: "TIMESTAMP DEFAULT NOW()", descripcion: "Última actividad" },
        { nombre: "creado_en", tipo: "TIMESTAMP DEFAULT NOW()", descripcion: "Fecha creación" }
      ]
    }
  ];

  // Configuraciones de propuestas
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
    inversionTotal: 32000000,
    pagos: [
      { momento: "Inicio del proyecto", porcentaje: 50, monto: 16000000 },
      { momento: "Mitad del proyecto (6 semanas)", porcentaje: 30, monto: 9600000 },
      { momento: "Entrega final", porcentaje: 20, monto: 6400000 }
    ],
    soporteIncluido: 6,
    mantenimientoMensual: 650000
  };

  // FUNCIÓN PARA GENERAR PDF
  const generarPDF = async () => {
    const jsPDF = (await import('jspdf')).default;
    const autoTable = (await import('jspdf-autotable')).default;
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    let yPos = 20;

    // Función para agregar encabezado
    const agregarEncabezado = () => {
      try {
        // Logo
        doc.addImage('/logo.png', 'PNG', 15, 10, 30, 30);
      } catch (e) {
        console.log('Logo no disponible');
      }
      
      // Información desarrollador
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Paula Abad', 50, 20);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Software Developer', 50, 26);
      
      try {
        // QR Code
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
        'Cra 10 # 50-44 Barrio Maraya, Cali, Colombia',
        'WhatsApp: +57 300 123 4567 | www.paulabad.tech | paula@paulabad.tech'
      ];
      
      doc.text(pieTexto[0], pageWidth / 2, pageHeight - 15, { align: 'center' });
      doc.text(pieTexto[1], pageWidth / 2, pageHeight - 10, { align: 'center' });
      doc.text(`Página ${pageNum}`, pageWidth - 20, pageHeight - 10);
    };

    // PÁGINA 1: PORTADA
    agregarEncabezado();
    
    yPos = 50;
    
    // Título principal
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(63, 81, 181); // Indigo
    doc.text('PROPUESTA COMERCIAL', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 10;
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Sistema de Gestión de Tickets', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 30;
    
    // Información de la cotización
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('COTIZACIÓN N°:', 15, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text('102525', 55, yPos);
    
    yPos += 8;
    doc.setFont('helvetica', 'bold');
    doc.text('FECHA:', 15, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(new Date().toLocaleDateString('es-CO', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }), 55, yPos);
    
    yPos += 8;
    doc.setFont('helvetica', 'bold');
    doc.text('VALIDEZ:', 15, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text('30 días calendario', 55, yPos);
    
    yPos += 20;
    
    // Información del cliente
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('DATOS DEL CLIENTE', 15, yPos);
    
    yPos += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const clienteInfo = [
      ['Empresa:', 'Soluciones JMO SAS'],
      ['NIT:', '900.845.434-4'],
      ['Contacto:', 'Jenny Gordillo'],
      ['Teléfono:', '311 215 7507'],
      ['Email:', 'solicionesjmosas@gmail.com'],
      ['Ciudad:', 'Pereira, Risaralda']
    ];
    
    clienteInfo.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label, 15, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(value, 50, yPos);
      yPos += 7;
    });
    
    yPos += 15;
    
    // Resumen ejecutivo
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('RESUMEN EJECUTIVO', 15, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const resumen = [
      'Desarrollo de aplicación web para gestión de tickets de disposición de',
      'escombros en 4 botaderos. Incluye impresión térmica móvil, reportes',
      'automatizados y control total de operaciones en tiempo real.',
      '',
      'Elimina proceso manual actual, reduce errores y proporciona trazabilidad',
      'completa de 200-300 tickets diarios (aprox. $20M/mes).'
    ];
    
    resumen.forEach(linea => {
      doc.text(linea, 15, yPos);
      yPos += 5;
    });
    
    agregarPieDePagina(1);
    
    // PÁGINA 2: PROPUESTAS
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
    
    // Tabla comparativa usando autoTable
    autoTable(doc, {
      startY: yPos,
      head: [['Concepto', 'Opción 1: SaaS', 'Opción 2: Compra']],
      body: [
        ['Inversión Inicial', '$8,000,000', '$32,000,000'],
        ['Cuota Mensual', '$850,000', '$650,000 (opcional)*'],
        ['Costo Año 1', '$18,200,000', '$35,900,000'],
        ['Costo Año 3', '$39,200,000', '$51,500,000'],
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
    
    yPos += 15;
    
    // Detalles Opción 1: SaaS
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(33, 150, 243);
    doc.text('OPCIÓN 1: MODELO SaaS', 15, yPos);
    
    yPos += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    
    const saasDetalle = [
      'Inversión inicial: $8,000,000 COP (pago único)',
      'Cuota mensual: $850,000 COP',
      'Contrato mínimo: 24 meses',
      '',
      'Incluye TODO en la cuota mensual:',
      '  • Hosting premium en la nube',
      '  • Soporte técnico ilimitado',
      '  • Actualizaciones automáticas',
      '  • Backups diarios cifrados',
      '  • Monitoreo 24/7',
      '  • Corrección de errores',
      '',
      'Opción de compra: Después de 24 meses puede adquirir el código',
      'por $12,000,000 (precio sujeto a cambio, IPC e inflación al momento de la negociación.)' ,'adicionales y ser dueño del software.'
    ];
    
    saasDetalle.forEach(linea => {
      doc.text(linea, 15, yPos);
      yPos += 5;
    });
    
    agregarPieDePagina(2);
    
    // PÁGINA 3: OPCIÓN 2 Y ALCANCE
    doc.addPage();
    agregarEncabezado();
    yPos = 50;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(76, 175, 80);
    doc.text('OPCIÓN 2: COMPRA DIRECTA (Recomendada)', 15, yPos);
    
    yPos += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    
    const compraDetalle = [
      'Inversión total: $32,000,000 COP',
      'Forma de pago: 50% inicio | 30% mitad proyecto | 20% entrega',
      '',
      'Incluye:',
      '  • Desarrollo completo del sistema',
      '  • Código fuente con licencia perpetua',
      '  • 6 meses de soporte y hosting GRATIS',
      '  • Capacitación completa del equipo',
      '  • Manuales y documentación',
      '  • Es dueño desde el día 1',
      '',
      'Mantenimiento opcional: Desde $650,000/mes',
      '  • Puede cancelar cuando desee',
      '  • Puede gestionar su propio servidor'
    ];
    
    compraDetalle.forEach(linea => {
      doc.text(linea, 15, yPos);
      yPos += 5;
    });
    
    yPos += 10;
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(63, 81, 181);
    doc.text('ALCANCE DEL PROYECTO', 15, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    
    const alcance = [
      'Gestión de Usuarios',
      '  • Login seguro con encriptación',
      '  • 2 roles: Administrador y Responsable',
      '  • Recuperación de contraseña por email',
      '',
      'Gestión de Datos',
      '  • Registro de 4 botaderos',
      '  • Gestión de clientes y obras',
      '  • Catálogo de materiales',
      '  • Configuración de precios',
      '',
      'Generación de Tickets',
      '  • Creación rápida con cálculo automático',
      '  • Consecutivo único sin duplicados',
      '  • Tipos: Volqueta 7m³, 16m³ o Bultos',
      '  • Impresión térmica en móvil y PC',
      '',
      'Reportes',
      '  • Exportación a PDF y Excel',
      '  • Filtros por fecha, botadero, cliente, vendedor',
      '  • Totales automáticos por material',
      ''
    ];
    
    alcance.forEach(linea => {
      if (yPos > 260) {
        agregarPieDePagina(3);
        doc.addPage();
        agregarEncabezado();
        yPos = 50;
      }
      doc.text(linea, 15, yPos);
      yPos += 5;
    });
    
    agregarPieDePagina(3);
    
    // PÁGINA 4: CRONOGRAMA Y BENEFICIOS
    doc.addPage();
    agregarEncabezado();
    yPos = 50;
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(63, 81, 181);
    doc.text('CRONOGRAMA DE DESARROLLO', 15, yPos);
    
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Duración total: 4 semanas (1 mes)', 15, yPos);
    
    yPos += 10;
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(63, 81, 181);
    doc.text('BENEFICIOS PARA SU EMPRESA', 15, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    
    const beneficios = [
      'Operacionales',
      '  • Elimina proceso manual 100%',
      '  • Reduce errores de digitación',
      '  • Información en tiempo real',
      '  • Acelera generación de tickets',
      '',
      'Financieros',
      '  • Control total de ingresos diarios',
      '  • Trazabilidad de cada transacción',
      '  • Reportes instantáneos para facturación',
      '  • Detección automática de inconsistencias',
      '',
      'Control y Seguridad',
      '  • Consecutivo único sin duplicados',
      '  • Auditoría completa de acciones',
      '  • Backups automáticos cifrados',
      '  • Acceso desde cualquier dispositivo',
      '',
      'Estratégicos',
      '  • Profesionalización de operaciones',
      '  • Preparado para crecer a más botaderos',
      '  • Ventaja competitiva en el mercado'
    ];
    
    beneficios.forEach(linea => {
      if (yPos > 260) {
        agregarPieDePagina(4);
        doc.addPage();
        agregarEncabezado();
        yPos = 50;
      }
      
      if (!linea.startsWith('  ')) {
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setFont('helvetica', 'normal');
      }
      
      doc.text(linea, 15, yPos);
      yPos += 5;
    });
    
    agregarPieDePagina(4);
    
    // PÁGINA 5: CONDICIONES Y CIERRE
    doc.addPage();
    agregarEncabezado();
    yPos = 50;
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(63, 81, 181);
    doc.text('CONDICIONES COMERCIALES', 15, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    
    const condiciones = [
      'Validez de la Propuesta',
      '  • Esta cotización es válida por 30 días calendario',
      '',
      'Forma de Pago (Compra Directa)',
      '  • 50% al iniciar el proyecto: $16,000,000',
      '  • 30% a mitad del proyecto: $9,600,000',
      '  • 20% al finalizar y entregar: $6,400,000',
      '',
      'Forma de Pago (SaaS)',
      '  • Inversión inicial: $8,000,000',
      '  • Para iniciar el proyecto: $3.000.000',
      '  • A mitad del proyecto: $2.000.000',
      '  • Al finalizar y entregar: $3.000,000',
      '  • Cuotas mensuales anticipadas: $850,000 (a partir del mes 1, se paga en los 5 primeros días de cada mes)',
      '',
      'Garantías',
      '  • Corrección de errores sin costo durante periodo de garantía',
      '  • SLA 99.5% disponibilidad del sistema',
      '  • Soporte técnico según plan contratado',
      '',
      'Exclusiones',
      '  • Nuevas funcionalidades fuera del alcance inicial',
      '  • Integraciones con sistemas externos no contemplados',
      '  • Capacitaciones adicionales después de las incluidas',
      '  • Hardware (impresoras térmicas, servidores propios)'
    ];
    
    condiciones.forEach(linea => {
      if (!linea.startsWith('  ')) {
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setFont('helvetica', 'normal');
      }
      doc.text(linea, 15, yPos);
      yPos += 5;
    });
    
    yPos += 15;
    
    // Call to action
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
    
    yPos += 15;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Para aprobar esta propuesta o solicitar aclaraciones:', 15, yPos);
    
    yPos += 7;
    doc.setFont('helvetica', 'normal');
    doc.text('Paula Abad | +57 305 443 4287 | paula@paulabad.tech', 15, yPos);
    
    yPos += 7;
    doc.text('www.paulabad.tech', 15, yPos);
    
    agregarPieDePagina(5);
    
    // Guardar PDF
    doc.save(`Cotizacion_102525_SolucionesJMO_${new Date().getTime()}.pdf`);
  };

  // PARTE 3: JSX - HEADER, NAVEGACIÓN Y ESTRUCTURA BASE

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER PRINCIPAL */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Sistema de Gestión de Tickets
              </h1>
              <p className="text-xl text-gray-600">Soluciones JMO SAS</p>
              <p className="text-sm text-gray-500 mt-2">
                Cliente: Jenny Gordillo | solicionesjmosas@gmail.com | Tel: 314 850 7068
              </p>
              <p className="text-xs text-gray-400 mt-1">
                NIT: 900.845.434-4 | Pereira, Risaralda
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Propuesta Técnica y Comercial</div>
              <div className="text-3xl font-bold text-indigo-600 mb-1">
                Desde $8,000,000
              </div>
              <div className="text-sm text-gray-600">{totalHoras} horas | 12 semanas</div>
              <div className="text-xs text-gray-500 mt-2">
                Fecha: {new Date().toLocaleDateString('es-CO', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
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
          {/* PARTE 4: TAB RESUMEN EJECUTIVO */}
          {activeTab === 'resumen' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Resumen Ejecutivo</h2>
              
              {/* Objetivo del Proyecto */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-6 rounded-lg">
                <h3 className="font-bold text-blue-900 mb-3 text-xl flex items-center gap-2">
                  <FileText size={24} />
                  Objetivo del Proyecto
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Desarrollar una <strong>aplicación web híbrida</strong> (responsive para PC, tablets y móviles) 
                  para la gestión integral de tickets de disposición de escombros en <strong>4 botaderos</strong>, 
                  con impresión térmica en dispositivos móviles y PC, generación de reportes consolidados en PDF 
                  y Excel, y gestión de usuarios con roles diferenciados (Administradores y Responsables).
                </p>
                <div className="mt-4 p-4 bg-white rounded border border-blue-200">
                  <p className="text-sm text-gray-600">
                    <strong>Necesidad del Cliente:</strong> Actualmente operan de forma 100% manual con recibos 
                    en papel y consolidación en Excel. Generan entre <strong>200-300 tickets diarios</strong> 
                    (~$15M-$25M/mes) y requieren urgentemente automatización, control y trazabilidad.
                  </p>
                </div>
              </div>

              {/* Métricas Clave */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                  <Clock size={32} className="mb-2" />
                  <div className="text-3xl font-bold">{totalHoras}</div>
                  <div className="text-sm opacity-90">Horas de Desarrollo</div>
                  <div className="text-xs opacity-75 mt-1">Incluye seguridad y testing</div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white p-6 rounded-lg shadow-lg">
                  <Calendar size={32} className="mb-2" />
                  <div className="text-3xl font-bold">12</div>
                  <div className="text-sm opacity-90">Semanas (3 meses)</div>
                  <div className="text-xs opacity-75 mt-1">6 sprints de 2 semanas</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
                  <CheckCircle size={32} className="mb-2" />
                  <div className="text-3xl font-bold">13</div>
                  <div className="text-sm opacity-90">Módulos Principales</div>
                  <div className="text-xs opacity-75 mt-1">Sin dashboard básico</div>
                </div>
                <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white p-6 rounded-lg shadow-lg">
                  <Users size={32} className="mb-2" />
                  <div className="text-3xl font-bold">8</div>
                  <div className="text-sm opacity-90">Usuarios Concurrentes</div>
                  <div className="text-xs opacity-75 mt-1">3 admins + 5 responsables</div>
                </div>
              </div>

              {/* Características Principales */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Zap size={24} className="text-yellow-500" />
                  Características Principales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "✅ Gestión de usuarios con 2 roles (Admin y Responsable)",
                    "✅ Gestión de 4 botaderos con información completa",
                    "✅ Gestión de clientes y obras asociadas",
                    "✅ Generación de tickets con consecutivo global único",
                    "✅ Cálculo automático: Volquetas (7/16 m³) y Bultos",
                    "✅ Impresión térmica en móviles y PC (GOOJPRT PT-210)",
                    "✅ Reportes PDF y Excel con filtros múltiples",
                    "✅ Sistema de auditoría completo para trazabilidad",
                    "✅ Recuperación de contraseña por email",
                    "✅ Aplicación híbrida (web responsive para todos los dispositivos)",
                    "✅ Seguridad avanzada (encriptación, JWT, rate limiting)",
                    "✅ Alta disponibilidad con backup redundante",
                    "✅ Monitoreo 24/7 con alertas automáticas",
                    "✅ Testing completo (70%+ cobertura)",
                    "✅ Arquitectura escalable y mantenible",
                    "✅ Documentación técnica y manuales de usuario"
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="text-green-600 font-bold flex-shrink-0">{feature.substring(0, 2)}</div>
                      <div className="text-gray-700">{feature.substring(3)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beneficios para el Cliente */}
              <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg">
                <h3 className="font-bold text-green-900 mb-3 text-xl flex items-center gap-2">
                  <TrendingUp size={24} />
                  Beneficios para Soluciones JMO
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Operacionales:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Elimina proceso manual 100%</li>
                      <li>• Reduce errores de digitación</li>
                      <li>• Acelera generación de tickets</li>
                      <li>• Información en tiempo real</li>
                      <li>• No más Excel manuales</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Financieros:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Control total de ingresos diarios</li>
                      <li>• Trazabilidad de cada transacción</li>
                      <li>• Reportes para facturación instantáneos</li>
                      <li>• Detección de inconsistencias automática</li>
                      <li>• Auditoría completa para contabilidad</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Control:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Consecutivo único sin duplicados</li>
                      <li>• Historial completo de anulaciones</li>
                      <li>• Quién creó/modificó cada ticket</li>
                      <li>• Análisis por botadero y vendedor</li>
                      <li>• Identificación de clientes top</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Estratégicos:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Profesionalización de la operación</li>
                      <li>• Escalabilidad a más botaderos</li>
                      <li>• Base para crecimiento del negocio</li>
                      <li>• Imagen corporativa mejorada</li>
                      <li>• Ventaja competitiva en el mercado</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Stack Tecnológico */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-lg">
                <h3 className="font-bold mb-4 text-xl flex items-center gap-2">
                  <Code size={24} />
                  Stack Tecnológico Propuesto
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                  <div>
                    <div className="font-semibold text-blue-300 mb-2">Frontend:</div>
                    <div className="space-y-1 text-gray-300">
                      <div>• React 18 + TypeScript</div>
                      <div>• Tailwind CSS 3</div>
                      <div>• React Router v6</div>
                      <div>• PWA para móviles</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-green-300 mb-2">Backend:</div>
                    <div className="space-y-1 text-gray-300">
                      <div>• Java Spring Boot 3</div>
                      <div>• Spring Security + JWT</div>
                      <div>• RESTful API</div>
                      <div>• Lombok + MapStruct</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-purple-300 mb-2">Base de Datos:</div>
                    <div className="space-y-1 text-gray-300">
                      <div>• PostgreSQL 14+</div>
                      <div>• Redis (caching)</div>
                      <div>• Backups diarios</div>
                      <div>• Índices optimizados</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-orange-300 mb-2">Infraestructura:</div>
                    <div className="space-y-1 text-gray-300">
                      <div>• DigitalOcean Cloud</div>
                      <div>• 4GB RAM / 2 vCPU</div>
                      <div>• SSL/TLS (HTTPS)</div>
                      <div>• Monitoreo 24/7</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seguridad y Alta Disponibilidad */}
              <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg">
                <h3 className="font-bold text-red-900 mb-3 text-xl flex items-center gap-2">
                  <Shield size={24} />
                  Seguridad y Alta Disponibilidad
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">Protección de Datos:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>✅ Encriptación de contraseñas (bcrypt cost 12)</li>
                      <li>✅ JWT con refresh tokens</li>
                      <li>✅ HTTPS obligatorio (SSL/TLS)</li>
                      <li>✅ Sanitización de inputs (SQL injection, XSS)</li>
                      <li>✅ Rate limiting anti fuerza bruta</li>
                      <li>✅ Bloqueo automático tras 5 intentos</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">Disponibilidad:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>✅ Backups cada 6 horas en proveedor diferente</li>
                      <li>✅ Servidor standby en región diferente</li>
                      <li>✅ Recuperación en 30-60 minutos</li>
                      <li>✅ SLA 99.5% uptime mensual</li>
                      <li>✅ Monitoreo 24/7 con alertas proactivas</li>
                      <li>✅ Plan de recuperación ante desastres</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white rounded border border-red-200">
                  <p className="text-sm text-gray-600">
                    <strong>Protección contra caídas de AWS/DigitalOcean:</strong> Incluye arquitectura 
                    de Alta Disponibilidad con backup en proveedor diferente (AWS S3) y servidor standby 
                    listo para activar en caso de caída total del proveedor principal.
                  </p>
                </div>
              </div>

              {/* Módulos No Incluidos */}
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-lg">
                <h3 className="font-bold text-yellow-900 mb-3 text-xl">
                  📊 Dashboard Ejecutivo - Servicio Adicional Premium
                </h3>
                <p className="text-gray-700 mb-3">
                  El sistema base incluye todos los reportes necesarios en PDF y Excel con filtros completos. 
                  El <strong>Dashboard Ejecutivo con Métricas Avanzadas</strong> es un módulo adicional 
                  opcional para visualización ejecutiva en tiempo real.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">Incluye:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Métricas en tiempo real del día</li>
                      <li>• Gráficos interactivos (barras, pastel, líneas)</li>
                      <li>• Análisis por botadero y vendedor</li>
                      <li>• Top 5 clientes y obras</li>
                      <li>• Tendencias de 7 días y mensuales</li>
                      <li>• Actualización automática cada 30 seg</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">Precio:</h4>
                    <div className="text-2xl font-bold text-yellow-900 mb-2">
                      ${dashboardAddon.precio.toLocaleString('es-CO')} COP
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Pago único (one-time)</p>
                    <p className="text-xs text-gray-500">
                      O incluido en cuota mensual: +$250,000/mes (SaaS) o +$150,000/mes (Mantenimiento)
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* PARTE 5: TAB REQUERIMIENTOS FUNCIONALES */}
          {activeTab === 'requerimientos' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Requerimientos Funcionales Detallados</h2>
              
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mb-6">
                <p className="text-gray-700">
                  <strong>Total de horas de desarrollo:</strong> {totalHoras} horas sin incluir Dashboard. 
                  Todos los módulos incluyen seguridad avanzada, testing, y documentación completa.
                </p>
              </div>

              {/* Módulos del Sistema */}
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

              {/* Dashboard como Add-on */}
              <div className="border-2 border-yellow-400 rounded-lg overflow-hidden bg-yellow-50">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-5">
                  <div className="flex justify-between items-center flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <BarChart3 size={32} />
                      <div>
                        <h3 className="text-xl font-bold">{dashboardAddon.nombre}</h3>
                        <div className="text-sm opacity-90">Módulo Adicional Premium (Opcional)</div>
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
                <div className="p-5">
                  <div className="bg-white border border-yellow-300 rounded-lg p-4 mb-4">
                    <p className="text-gray-700 text-sm">
                      <strong>💡 Nota:</strong> Este módulo NO está incluido en el precio base. 
                      Es un servicio adicional recomendado para gerencia que desee visualización 
                      ejecutiva avanzada en tiempo real.
                    </p>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <BarChart3 size={18} className="text-yellow-600" />
                    Funcionalidades Premium:
                  </h4>
                  <ul className="space-y-2">
                    {dashboardAddon.tareas.map((tarea, tidx) => (
                      <li key={tidx} className="flex items-start gap-3 text-gray-700 p-2 hover:bg-yellow-100 rounded transition-colors">
                        <CheckCircle size={18} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span>{tarea}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-yellow-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Opciones de Contratación:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div className="bg-white p-3 rounded border border-yellow-300">
                        <div className="font-bold text-yellow-800">Opción A: One-Time</div>
                        <div className="text-2xl font-bold text-yellow-900 my-1">
                          ${dashboardAddon.precio.toLocaleString('es-CO')}
                        </div>
                        <div className="text-gray-600">Pago único</div>
                      </div>
                      <div className="bg-white p-3 rounded border border-yellow-300">
                        <div className="font-bold text-yellow-800">Opción B: SaaS</div>
                        <div className="text-2xl font-bold text-yellow-900 my-1">
                          +$250,000
                        </div>
                        <div className="text-gray-600">Adicional/mes</div>
                      </div>
                      <div className="bg-white p-3 rounded border border-yellow-300">
                        <div className="font-bold text-yellow-800">Opción C: Mantenimiento</div>
                        <div className="text-2xl font-bold text-yellow-900 my-1">
                          +$150,000
                        </div>
                        <div className="text-gray-600">Adicional/mes</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resumen Total */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">📊 Resumen de Desarrollo</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm opacity-90 mb-1">Total Horas Base</div>
                    <div className="text-4xl font-bold">{totalHoras}h</div>
                    <div className="text-xs opacity-75 mt-1">Sin dashboard</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-90 mb-1">Costo de Desarrollo</div>
                    <div className="text-4xl font-bold">
                      ${(costoDesarrollo / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-xs opacity-75 mt-1">
                      ${costoDesarrollo.toLocaleString('es-CO')} COP
                    </div>
                  </div>
                  <div>
                    <div className="text-sm opacity-90 mb-1">Módulos Incluidos</div>
                    <div className="text-4xl font-bold">{modulos.length}</div>
                    <div className="text-xs opacity-75 mt-1">Todos con testing completo</div>
                  </div>
                </div>
              </div>

              {/* Qué NO está incluido */}
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  ⚠️ Lo que NO está incluido en el precio base:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">❌</span>
                    <span>Dashboard Ejecutivo con Métricas Avanzadas (${dashboardAddon.precio.toLocaleString('es-CO')} adicional)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">❌</span>
                    <span>Nuevas funcionalidades fuera del alcance inicial (se cotizan por separado a $37,500/hora)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">❌</span>
                    <span>Integraciones con sistemas externos no contemplados (ERP, contabilidad, etc)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">❌</span>
                    <span>Apps móviles nativas (iOS/Android) - El sistema es web responsive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">❌</span>
                    <span>Capacitaciones adicionales después de las 3 sesiones incluidas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">❌</span>
                    <span>Consultoría o asesoría especializada fuera del soporte técnico</span>
                  </li>
                </ul>
              </div>

            </div>
          )}

          {/* PARTE 6: TAB BASE DE DATOS */}
          {activeTab === 'database' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Modelo de Base de Datos</h2>
              
              {/* Descripción General */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-600 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-purple-900 mb-3 text-xl flex items-center gap-2">
                  <Database size={24} />
                  PostgreSQL 14+ con Alta Disponibilidad
                </h3>
                <p className="text-gray-700 mb-4">
                  Base de datos relacional robusta diseñada para manejar <strong>200-300 tickets diarios</strong> 
                  con alta concurrencia (8 usuarios simultáneos). Incluye índices optimizados, transacciones ACID, 
                  y backups automáticos cada 6 horas.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white p-4 rounded shadow">
                    <div className="font-bold text-purple-900 mb-2">Características:</div>
                    <ul className="space-y-1 text-gray-700">
                      <li>✅ {tablas.length} tablas relacionales</li>
                      <li>✅ Integridad referencial</li>
                      <li>✅ Índices optimizados</li>
                      <li>✅ Triggers para auditoría</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded shadow">
                    <div className="font-bold text-purple-900 mb-2">Seguridad:</div>
                    <ul className="space-y-1 text-gray-700">
                      <li>✅ Contraseñas encriptadas (bcrypt)</li>
                      <li>✅ Campos sensibles encriptados</li>
                      <li>✅ Usuario BD con privilegios mínimos</li>
                      <li>✅ Conexión solo desde servidor app</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded shadow">
                    <div className="font-bold text-purple-900 mb-2">Backups:</div>
                    <ul className="space-y-1 text-gray-700">
                      <li>✅ Backup cada 6 horas</li>
                      <li>✅ Retención 30 días</li>
                      <li>✅ Backup offsite (AWS S3)</li>
                      <li>✅ Recovery en 2 horas</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Diagrama de Relaciones */}
              <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">📊 Diagrama de Relaciones</h3>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <pre className="text-xs text-gray-700 overflow-x-auto">
{`
    ┌─────────────┐
    │  usuarios   │
    └──────┬──────┘
           │
           ├──────────────────┬───────────────┬──────────────┐
           │                  │               │              │
           ▼                  ▼               ▼              ▼
    ┌─────────────┐    ┌──────────┐   ┌──────────┐  ┌─────────────┐
    │  botaderos  │    │ tickets  │   │ sesiones │  │  auditoria  │
    └──────┬──────┘    └────┬─────┘   └──────────┘  └─────────────┘
           │                │
           │                ├──────────┬───────────┐
           │                │          │           │
           │                ▼          ▼           ▼
           │         ┌──────────┐ ┌────────┐ ┌──────────┐
           │         │ clientes │ │ obras  │ │materiales│
           │         └──────────┘ └────────┘ └──────────┘
           │                                       │
           │                                       │
           └───────────────────────────────────────┤
                                                   ▼
                                    ┌──────────────────────────┐
                                    │ precios_especiales_bot.  │
                                    └──────────────────────────┘
`}
                  </pre>
                </div>
              </div>

              {/* Tablas Detalladas */}
              {tablas.map((tabla, idx) => (
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
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 w-1/4">
                            Campo
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 w-1/3">
                            Tipo de Dato
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 w-5/12">
                            Descripción
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tabla.campos.map((campo, cidx) => (
                          <tr 
                            key={cidx} 
                            className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                              campo.nombre === 'id' || campo.tipo.includes('PRIMARY KEY') 
                                ? 'bg-blue-50' 
                                : ''
                            }`}
                          >
                            <td className="px-4 py-3 font-mono text-sm text-gray-900 font-semibold">
                              {campo.nombre}
                              {campo.tipo.includes('PRIMARY KEY') && (
                                <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded">PK</span>
                              )}
                              {campo.tipo.includes('REFERENCES') && (
                                <span className="ml-2 text-xs bg-green-600 text-white px-2 py-0.5 rounded">FK</span>
                              )}
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

              {/* Índices y Optimizaciones */}
              <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg">
                <h3 className="font-bold text-green-900 mb-4 text-xl flex items-center gap-2">
                  <Zap size={24} />
                  Índices y Optimizaciones
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Índices Principales:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>✅ <code className="bg-white px-2 py-0.5 rounded">tickets.numero_remision</code> (UNIQUE)</li>
                      <li>✅ <code className="bg-white px-2 py-0.5 rounded">tickets.fecha</code> (INDEX)</li>
                      <li>✅ <code className="bg-white px-2 py-0.5 rounded">tickets.estado</code> (INDEX)</li>
                      <li>✅ <code className="bg-white px-2 py-0.5 rounded">clientes.nit</code> (UNIQUE)</li>
                      <li>✅ <code className="bg-white px-2 py-0.5 rounded">usuarios.email</code> (UNIQUE)</li>
                      <li>✅ <code className="bg-white px-2 py-0.5 rounded">usuarios.usuario</code> (UNIQUE)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Optimizaciones:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>✅ Connection pooling (max 20 conexiones)</li>
                      <li>✅ Prepared statements (previene SQL injection)</li>
                      <li>✅ Lazy loading en relaciones</li>
                      <li>✅ Paginación en consultas grandes</li>
                      <li>✅ Caché de consultas frecuentes (Redis)</li>
                      <li>✅ Vacuum automático para limpieza</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Triggers y Procedimientos */}
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
                <h3 className="font-bold text-blue-900 mb-4 text-xl">🔧 Triggers y Procedimientos</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-white p-4 rounded border border-blue-200">
                    <div className="font-semibold text-blue-900 mb-2">Trigger: audit_ticket_changes</div>
                    <p className="text-gray-700">
                      Registra automáticamente en <code className="bg-gray-100 px-2 py-0.5 rounded">auditoria_tickets</code> cada 
                      vez que se crea, anula o imprime un ticket. Captura usuario, IP y timestamp.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded border border-blue-200">
                    <div className="font-semibold text-blue-900 mb-2">Trigger: update_timestamp</div>
                    <p className="text-gray-700">
                      Actualiza automáticamente el campo <code className="bg-gray-100 px-2 py-0.5 rounded">actualizado_en</code> en 
                      tablas maestras cuando se modifica un registro.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded border border-blue-200">
                    <div className="font-semibold text-blue-900 mb-2">Función: get_next_remision_number()</div>
                    <p className="text-gray-700">
                      Genera el siguiente número de remisión de forma atómica y segura, previniendo duplicados 
                      incluso con múltiples usuarios creando tickets simultáneamente.
                    </p>
                  </div>
                </div>
              </div>

              {/* Estimación de Capacidad */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">📈 Capacidad y Escalabilidad</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm opacity-90 mb-2">Volumen Actual</div>
                    <div className="text-3xl font-bold mb-1">250</div>
                    <div className="text-sm opacity-75">tickets/día promedio</div>
                    <div className="text-xs opacity-75 mt-2">~7,500 tickets/mes</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-90 mb-2">Capacidad Sistema</div>
                    <div className="text-3xl font-bold mb-1">1,000</div>
                    <div className="text-sm opacity-75">tickets/día sin degradación</div>
                    <div className="text-xs opacity-75 mt-2">4x capacidad actual</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-90 mb-2">Almacenamiento 5 años</div>
                    <div className="text-3xl font-bold mb-1">~450K</div>
                    <div className="text-sm opacity-75">tickets totales</div>
                    <div className="text-xs opacity-75 mt-2">≈ 2GB de datos</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm opacity-90">
                    El sistema está diseñado para escalar verticalmente (más RAM/CPU) u horizontalmente 
                    (réplicas de lectura) cuando el volumen de transacciones aumente significativamente.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* PARTE 7: TAB ARQUITECTURA */}
          {activeTab === 'arquitectura' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Arquitectura del Sistema</h2>
              
              {/* Stack Tecnológico */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg">
                  <Code size={40} className="mb-3" />
                  <h3 className="text-xl font-bold mb-3">Frontend</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>React 18 + TypeScript</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>Tailwind CSS 3</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>React Router v6</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>Axios (API calls)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>React Query (cache)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>Zustand (state mgmt)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>PWA para móviles</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-700 text-white p-6 rounded-lg shadow-lg">
                  <Settings size={40} className="mb-3" />
                  <h3 className="text-xl font-bold mb-3">Backend</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>Java Spring Boot 3.1</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>Spring Security + JWT</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>Spring Data JPA</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>RESTful API</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>Lombok</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>MapStruct (DTOs)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>SendGrid (emails)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-6 rounded-lg shadow-lg">
                  <Database size={40} className="mb-3" />
                  <h3 className="text-xl font-bold mb-3">Base de Datos</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>PostgreSQL 14</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>Redis (caching)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>Flyway (migraciones)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>pgAdmin (gestión)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>Backups automáticos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>Índices optimizados</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>Connection pooling</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Flujo de Arquitectura */}
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp size={24} className="text-blue-600" />
                  Flujo de Arquitectura
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="bg-blue-100 text-blue-900 px-6 py-3 rounded-lg font-semibold min-w-[140px] text-center shadow">
                      Usuario<br/>
                      <span className="text-xs font-normal">(PC/Tablet/Móvil)</span>
                    </div>
                    <div className="text-3xl text-gray-400 font-bold">→</div>
                    <div className="bg-green-100 text-green-900 px-6 py-3 rounded-lg font-semibold min-w-[140px] text-center shadow">
                      React App<br/>
                      <span className="text-xs font-normal">(Frontend SPA)</span>
                    </div>
                    <div className="text-3xl text-gray-400 font-bold">→</div>
                    <div className="bg-orange-100 text-orange-900 px-6 py-3 rounded-lg font-semibold min-w-[140px] text-center shadow">
                      API REST<br/>
                      <span className="text-xs font-normal">(Spring Boot)</span>
                    </div>
                    <div className="text-3xl text-gray-400 font-bold">→</div>
                    <div className="bg-purple-100 text-purple-900 px-6 py-3 rounded-lg font-semibold min-w-[140px] text-center shadow">
                      PostgreSQL<br/>
                      <span className="text-xs font-normal">(Base de Datos)</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 pl-4 bg-gray-50 p-3 rounded">
                    <strong>Explicación:</strong> El usuario accede desde cualquier dispositivo → Frontend React procesa 
                    la interfaz → API Backend valida y procesa la lógica → Base de datos almacena y recupera información
                  </div>
                </div>
              </div>

              {/* Impresión Térmica */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-gray-300 rounded-lg p-6 bg-gradient-to-br from-orange-50 to-red-50">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Printer size={24} className="text-orange-600" />
                    Impresión Térmica
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span><strong>Protocolo:</strong> ESC/POS</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span><strong>Librería:</strong> escpos-printer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span><strong>Ancho papel:</strong> 58mm</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span><strong>Conexión PC:</strong> USB/Bluetooth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span><strong>Conexión Móvil:</strong> Bluetooth LE</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span><strong>Modelo:</strong> GOOJPRT PT-210</span>
                    </li>
                  </ul>
                </div>

                <div className="border-2 border-gray-300 rounded-lg p-6 bg-gradient-to-br from-green-50 to-teal-50">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <BarChart3 size={24} className="text-green-600" />
                    Generación de Reportes
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>PDF:</strong> jsPDF + jsPDF-AutoTable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Excel:</strong> ExcelJS</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Gráficos:</strong> Chart.js</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Procesamiento:</strong> Backend</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Descarga:</strong> Directa al navegador</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Vista previa:</strong> En navegador</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Hosting Recomendado */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-lg p-6">
                <h3 className="font-bold text-indigo-900 mb-4 text-xl flex items-center gap-2">
                  <Shield size={24} />
                  Hosting Recomendado: DigitalOcean + Alta Disponibilidad
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-5 rounded-lg shadow">
                    <div className="font-bold text-indigo-900 mb-3">Servidor Principal:</div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong>Proveedor:</strong> DigitalOcean</li>
                      <li>• <strong>Región:</strong> USA (New York)</li>
                      <li>• <strong>CPU:</strong> 2 vCPU</li>
                      <li>• <strong>RAM:</strong> 4 GB</li>
                      <li>• <strong>SSD:</strong> 80 GB</li>
                      <li>• <strong>SO:</strong> Ubuntu 22.04 LTS</li>
                      <li>• <strong>Costo:</strong> ~$160k/mes</li>
                    </ul>
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow">
                    <div className="font-bold text-indigo-900 mb-3">Base de Datos:</div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong>Tipo:</strong> Managed PostgreSQL</li>
                      <li>• <strong>Versión:</strong> PostgreSQL 14</li>
                      <li>• <strong>RAM:</strong> 1 GB</li>
                      <li>• <strong>Storage:</strong> 25 GB</li>
                      <li>• <strong>Backups:</strong> Automáticos</li>
                      <li>• <strong>Alta Disp.:</strong> Incluida</li>
                      <li>• <strong>Costo:</strong> ~$100k/mes</li>
                    </ul>
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow">
                    <div className="font-bold text-indigo-900 mb-3">Alta Disponibilidad:</div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong>Backup Storage:</strong> AWS S3</li>
                      <li>• <strong>Frecuencia:</strong> Cada 6 horas</li>
                      <li>• <strong>Servidor Standby:</strong> DO Europa</li>
                      <li>• <strong>Monitoreo:</strong> 24/7</li>
                      <li>• <strong>Recovery:</strong> 30-60 min</li>
                      <li>• <strong>SLA:</strong> 99.5% uptime</li>
                      <li>• <strong>Costo:</strong> ~$100k/mes</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-5 bg-white rounded-lg shadow border-l-4 border-indigo-600">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="font-bold text-indigo-900 text-lg mb-1">Costo Total Mensual:</div>
                      <div className="text-sm text-gray-600">Incluye servidor, BD, HA, SSL, monitoreo, backups</div>
                    </div>
                    <div className="text-4xl font-bold text-indigo-900">
                      ~$400,000 <span className="text-lg font-normal text-gray-600">COP/mes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seguridad en Capas */}
              <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg">
                <h3 className="font-bold text-red-900 mb-4 text-xl flex items-center gap-2">
                  <Shield size={24} />
                  Seguridad en Múltiples Capas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-bold text-red-800 mb-3">Capa de Aplicación:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>✅ JWT con refresh tokens</li>
                      <li>✅ Rate limiting (100 req/min)</li>
                      <li>✅ Sanitización de inputs</li>
                      <li>✅ CSRF protection</li>
                      <li>✅ XSS prevention</li>
                      <li>✅ Prepared statements</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-800 mb-3">Capa de Infraestructura:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>✅ Firewall configurado</li>
                      <li>✅ SSH con llave (no password)</li>
                      <li>✅ Fail2ban activo</li>
                      <li>✅ ModSecurity WAF</li>
                      <li>✅ TLS 1.3</li>
                      <li>✅ VPN para admin</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-800 mb-3">Capa de Datos:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>✅ Encriptación en tránsito</li>
                      <li>✅ Encriptación en reposo</li>
                      <li>✅ Backups encriptados</li>
                      <li>✅ Usuario BD con mínimos privilegios</li>
                      <li>✅ Auditoría de queries</li>
                      <li>✅ Conexión solo desde app server</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Plan de Escalabilidad */}
              <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp size={28} />
                  Plan de Escalabilidad
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                    <div className="font-bold mb-2">Fase 1: Actual</div>
                    <div className="text-sm space-y-1">
                      <div>• 200-300 tickets/día</div>
                      <div>• 8 usuarios concurrentes</div>
                      <div>• Servidor: 4GB RAM</div>
                      <div>• BD: 1GB RAM</div>
                      <div>• Capacidad: Hasta 500/día</div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                    <div className="font-bold mb-2">Fase 2: Crecimiento</div>
                    <div className="text-sm space-y-1">
                      <div>• 500-1000 tickets/día</div>
                      <div>• 15 usuarios concurrentes</div>
                      <div>• Servidor: 8GB RAM</div>
                      <div>• BD: 2GB RAM</div>
                      <div>• Costo: +$200k/mes</div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                    <div className="font-bold mb-2">Fase 3: Escala</div>
                    <div className="text-sm space-y-1">
                      <div>• 1000+ tickets/día</div>
                      <div>• 30+ usuarios</div>
                      <div>• Múltiples servidores</div>
                      <div>• Load balancer</div>
                      <div>• Costo: +$500k/mes</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* PARTE 8: TAB PROPUESTAS COMERCIALES */}
          {activeTab === 'propuestas' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Propuestas Comerciales</h2>
              
              {/* Introducción */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-600 p-6 rounded-lg">
                <h3 className="font-bold text-indigo-900 mb-3 text-xl">
                  💼 Dos Modelos de Negocio Adaptados a Sus Necesidades
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Ofrecemos <strong>dos opciones comerciales</strong> para que elija la que mejor se adapte 
                  a su flujo de caja y estrategia empresarial. Ambas incluyen el desarrollo completo del sistema, 
                  pero difieren en la estructura de pago y la propiedad del código.
                </p>
              </div>

              {/* Comparativa Rápida */}
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
                        <th className="px-6 py-4 text-center text-sm font-bold text-green-700">Opción 2: Compra Directa</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">Inversión Inicial</td>
                        <td className="px-6 py-4 text-center text-2xl font-bold text-blue-600">$8M</td>
                        <td className="px-6 py-4 text-center text-2xl font-bold text-green-600">$32M</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">Cuota Mensual</td>
                        <td className="px-6 py-4 text-center text-xl font-bold text-blue-600">$850,000</td>
                        <td className="px-6 py-4 text-center text-xl font-bold text-green-600">$650,000*</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">Costo Año 1</td>
                        <td className="px-6 py-4 text-center font-bold text-blue-600">$18.2M</td>
                        <td className="px-6 py-4 text-center font-bold text-green-600">$35.9M</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">Costo Año 3</td>
                        <td className="px-6 py-4 text-center font-bold text-blue-600">$39.2M</td>
                        <td className="px-6 py-4 text-center font-bold text-green-600">$55.4M</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">Cliente es Dueño</td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-orange-600 font-bold">Opción $12M</span><br/>
                          <span className="text-xs text-gray-600">(después 24 meses)</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-green-600 font-bold text-xl">✓ Sí</span><br/>
                          <span className="text-xs text-gray-600">(desde día 1)</span>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">Permanencia Mínima</td>
                        <td className="px-6 py-4 text-center text-blue-600 font-bold">24 meses</td>
                        <td className="px-6 py-4 text-center text-green-600 font-bold">Ninguna</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">Ideal Para</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-700">Presupuesto limitado<br/>Bajo riesgo inicial</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-700">Presupuesto aprobado<br/>Propiedad inmediata</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-gray-50 p-4 text-xs text-gray-600 text-center">
                  *Mantenimiento opcional después de 6 meses incluidos
                </div>
              </div>

              {/* OPCIÓN 1: MODELO SaaS */}
              <div className="border-4 border-blue-500 rounded-lg overflow-hidden shadow-xl">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="text-sm opacity-90 mb-1">OPCIÓN 1</div>
                      <h3 className="text-3xl font-bold">Modelo SaaS</h3>
                      <p className="text-sm opacity-90 mt-2">Software como Servicio - Todo Incluido</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm opacity-90">Desde</div>
                      <div className="text-5xl font-bold">$8M</div>
                      <div className="text-sm opacity-90">+ $850k/mes</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white space-y-6">
                  {/* Inversión Inicial */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                        <DollarSign size={24} />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900">
                        Inversión Inicial: $8,000,000 COP
                      </h4>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="font-semibold text-blue-900 mb-2">Incluye:</div>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>Setup y configuración completa del sistema</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>Personalización según requerimientos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>Migración de datos maestros iniciales</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>2 sesiones de capacitación (4 horas)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>Manuales de usuario completos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>Go-live asistido con acompañamiento</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Cuota Mensual */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                        <Calendar size={24} />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900">
                        Cuota Mensual: $850,000 COP/mes
                      </h4>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="font-semibold text-blue-900 mb-3">Todo Incluido Sin Costos Ocultos:</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <div className="font-semibold text-blue-800 mb-2 text-sm">Infraestructura:</div>
                          <ul className="space-y-1 text-xs text-gray-700">
                            <li>✅ Hosting premium (4GB RAM, 2 vCPU)</li>
                            <li>✅ Base de datos PostgreSQL gestionada</li>
                            <li>✅ Backup cada 6h en proveedor diferente</li>
                            <li>✅ Servidor standby para alta disponibilidad</li>
                            <li>✅ SSL/TLS (HTTPS)</li>
                            <li>✅ CDN para mejor velocidad</li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-semibold text-blue-800 mb-2 text-sm">Servicios:</div>
                          <ul className="space-y-1 text-xs text-gray-700">
                            <li>✅ Soporte técnico prioritario (respuesta 6h)</li>
                            <li>✅ Actualizaciones de seguridad automáticas</li>
                            <li>✅ Mantenimiento preventivo mensual</li>
                            <li>✅ Corrección ilimitada de bugs</li>
                            <li>✅ Mejoras menores (hasta 4h/mes)</li>
                            <li>✅ Monitoreo 24/7 con alertas</li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-semibold text-blue-800 mb-2 text-sm">Seguridad:</div>
                          <ul className="space-y-1 text-xs text-gray-700">
                            <li>✅ Análisis de vulnerabilidades mensual</li>
                            <li>✅ Auditoría de seguridad semestral</li>
                            <li>✅ Firewall y protección DDoS</li>
                            <li>✅ Backups encriptados</li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-semibold text-blue-800 mb-2 text-sm">Garantías:</div>
                          <ul className="space-y-1 text-xs text-gray-700">
                            <li>✅ SLA 99.5% uptime mensual</li>
                            <li>✅ Recuperación en menos de 1 hora</li>
                            <li>✅ Reporte mensual de métricas</li>
                            <li>✅ Sin costos adicionales sorpresa</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Permanencia y Condiciones */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                        <FileText size={24} />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">
                        Condiciones del Contrato
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="font-semibold text-gray-900 mb-2">
                          📅 Permanencia Mínima: 24 meses
                        </div>
                        <p className="text-sm text-gray-700">
                          Contrato mínimo de 2 años para amortizar el desarrollo. Después de este período 
                          puede cancelar con 60 días de aviso sin penalidad.
                        </p>
                      </div>

                      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <div className="font-semibold text-orange-900 mb-2">
                          ⚠️ Penalidad por Cancelación Anticipada
                        </div>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p>Si decide cancelar antes de completar 24 meses:</p>
                          <ul className="space-y-1 ml-4">
                            <li>• <strong>Meses 1-12:</strong> 60% del déficit restante</li>
                            <li>• <strong>Meses 13-24:</strong> 40% del déficit restante</li>
                            <li>• <strong>Después mes 24:</strong> Sin penalidad (aviso 60 días)</li>
                          </ul>
                          <div className="bg-white p-3 rounded mt-2 text-xs">
                            <strong>Ejemplo:</strong> Si cancela en mes 12, habría pagado $18.2M. 
                            El déficit sería $11.1M. Penalidad 60% = $6.66M a pagar.
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="font-semibold text-green-900 mb-2">
                          🎁 Opción de Compra (Después de 24 meses)
                        </div>
                        <p className="text-sm text-gray-700 mb-3">
                          Al completar 24 meses de contrato, puede <strong>comprar el código fuente</strong> por:
                        </p>
                        <div className="bg-white p-4 rounded">
                          <div className="text-3xl font-bold text-green-900 mb-2">$12,000,000 COP</div>
                          <div className="text-sm text-gray-700 space-y-1">
                            <div>✅ Código fuente completo</div>
                            <div>✅ Licencia perpetua de uso</div>
                            <div>✅ Documentación técnica</div>
                            <div>✅ Transferencia de repositorio</div>
                            <div>✅ 3 meses de soporte de transición</div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="text-sm text-gray-600">
                              <strong>Total para ser dueño:</strong> $8M + (24×$850k) + $12M = 
                              <span className="text-lg font-bold text-green-900"> $40.4M</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="font-semibold text-blue-900 mb-2">
                          📈 Ajuste Anual: IPC + 2%
                        </div>
                        <p className="text-sm text-gray-700">
                          La cuota mensual se ajusta anualmente según inflación (IPC) + 2% por mejoras 
                          continuas del sistema. Aplicado en el aniversario del contrato.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Proyección Financiera SaaS */}
                  <div>
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-lg mb-3">
                      <h4 className="text-xl font-bold">📊 Proyección Financiera - Modelo SaaS</h4>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-r">Período</th>
                            <th className="px-4 py-3 text-right text-sm font-bold text-gray-700 border-r">Inversión Inicial</th>
                            <th className="px-4 py-3 text-right text-sm font-bold text-gray-700 border-r">Cuotas Anuales</th>
                            <th className="px-4 py-3 text-right text-sm font-bold text-gray-700">Total Acumulado</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3 font-semibold border-r">Año 1</td>
                            <td className="px-4 py-3 text-right border-r">$8,000,000</td>
                            <td className="px-4 py-3 text-right border-r">$10,200,000</td>
                            <td className="px-4 py-3 text-right font-bold text-blue-600">$18,200,000</td>
                          </tr>
                          <tr className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3 font-semibold border-r">Año 2</td>
                            <td className="px-4 py-3 text-right border-r">-</td>
                            <td className="px-4 py-3 text-right border-r">$10,404,000</td>
                            <td className="px-4 py-3 text-right font-bold text-blue-600">$28,604,000</td>
                          </tr>
                          <tr className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3 font-semibold border-r">Año 3</td>
                            <td className="px-4 py-3 text-right border-r">-</td>
                            <td className="px-4 py-3 text-right border-r">$10,612,000</td>
                            <td className="px-4 py-3 text-right font-bold text-blue-600">$39,216,000</td>
                          </tr>
                          <tr className="bg-green-50 font-bold">
                            <td className="px-4 py-3 border-r" colSpan="3">
                              + Opción Compra (mes 24)
                            </td>
                            <td className="px-4 py-3 text-right text-green-700">+ $12,000,000</td>
                          </tr>
                          <tr className="bg-blue-100 font-bold text-lg">
                            <td className="px-4 py-3 border-r" colSpan="3">
                              Total para ser DUEÑO
                            </td>
                            <td className="px-4 py-3 text-right text-blue-900">$40,400,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Propiedad Intelectual SaaS */}
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                    <div className="font-semibold text-yellow-900 mb-2">⚖️ Propiedad Intelectual</div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>❌ <strong>Código fuente:</strong> Propiedad 100% del desarrollador mientras paga cuota</li>
                      <li>✅ <strong>Datos del cliente:</strong> Propiedad 100% del cliente</li>
                      <li>✅ <strong>Licencia de uso:</strong> No exclusiva mientras esté activo el contrato</li>
                      <li>✅ <strong>Exportación:</strong> Puede exportar todos sus datos en cualquier momento</li>
                      <li>⚠️ <strong>Al cancelar:</strong> Pierde acceso al sistema pero conserva sus datos</li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* OPCIÓN 2: COMPRA DIRECTA */}
              <div className="border-4 border-green-500 rounded-lg overflow-hidden shadow-xl">
                <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="text-sm opacity-90 mb-1">OPCIÓN 2 ⭐ RECOMENDADA</div>
                      <h3 className="text-3xl font-bold">Compra Directa</h3>
                      <p className="text-sm opacity-90 mt-2">Licencia Perpetua - Propiedad Inmediata</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm opacity-90">Inversión Total</div>
                      <div className="text-5xl font-bold">$32M</div>
                      <div className="text-sm opacity-90">3 pagos</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white space-y-6">
                  {/* Inversión Total */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-green-100 text-green-600 p-3 rounded-full">
                        <DollarSign size={24} />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900">
                        Inversión Total: $32,000,000 COP
                      </h4>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                      <div className="font-semibold text-green-900 mb-3">📅 Forma de Pago en 3 Cuotas:</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {propuestaCompra.pagos.map((pago, idx) => (
                          <div key={idx} className="bg-white p-4 rounded-lg border-2 border-green-200 shadow">
                            <div className="text-sm text-gray-600 mb-1">{pago.momento}</div>
                            <div className="text-3xl font-bold text-green-700">{pago.porcentaje}%</div>
                            <div className="text-xl font-bold text-gray-900 mt-2">
                              ${(pago.monto / 1000000).toFixed(1)}M
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              ${pago.monto.toLocaleString('es-CO')} COP
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="font-semibold text-green-900 mb-3">✅ Incluye TODO desde día 1:</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                        <div>
                          <ul className="space-y-1">
                            <li className="flex items-start gap-2">
                              <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                              <span>Desarrollo completo del sistema (781 horas)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                              <span>Código fuente con licencia perpetua</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                              <span>Implementación y configuración completa</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                              <span>Migración de datos maestros iniciales</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                              <span>3 sesiones de capacitación (6 horas)</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li className="flex items-start gap-2">
                              <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                              <span>Manuales completos (Admin + Responsable)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                              <span>Documentación técnica del sistema</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                              <span>Deploy en servidor de producción</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                              <span>6 meses de soporte + hosting GRATIS</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                              <span>Go-live asistido con acompañamiento</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mantenimiento Opcional */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-green-100 text-green-600 p-3 rounded-full">
                        <Settings size={24} />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">
                        Mantenimiento Opcional (Después de 6 meses incluidos)
                      </h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Plan Básico */}
                      <div className="border-2 border-gray-300 rounded-lg p-5 hover:shadow-lg transition-shadow">
                        <div className="text-center mb-4">
                          <div className="text-sm text-gray-600 mb-1">Plan Básico</div>
                          <div className="text-3xl font-bold text-gray-900">$650,000</div>
                          <div className="text-sm text-gray-600">por mes</div>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Hosting gestionado (DigitalOcean)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Base de datos PostgreSQL + Backups</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span>SSL/TLS + Monitoreo básico</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Actualizaciones de seguridad</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Soporte email (respuesta 48h)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Corrección de bugs críticos</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span>3 horas de soporte técnico/mes</span>
                          </li>
                        </ul>
                      </div>

                      {/* Plan Premium */}
                      <div className="border-2 border-green-500 rounded-lg p-5 hover:shadow-xl transition-shadow bg-green-50">
                        <div className="text-center mb-4">
                          <div className="text-sm text-green-600 mb-1 font-semibold">Plan Premium ⭐</div>
                          <div className="text-3xl font-bold text-green-700">$900,000</div>
                          <div className="text-sm text-gray-600">por mes (con HA)</div>
                        </div>
                        <div className="text-xs text-green-700 font-semibold mb-3 text-center">
                          Todo del Plan Básico +
                        </div>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span><strong>Alta Disponibilidad</strong> (backup redundante)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Monitoreo 24/7 con alertas</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Soporte prioritario (respuesta 12h)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span>6 horas de soporte técnico/mes</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Mejoras menores incluidas</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Análisis vulnerabilidades mensual</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Auditoría seguridad semestral</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Optimización performance trimestral</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                      <p className="text-sm text-gray-700">
                        <strong>💡 Flexibilidad Total:</strong> Puede cancelar el mantenimiento cuando quiera 
                        (aviso 30 días), cambiar de plan, pausar temporalmente (máx 3 meses), o gestionar su propio 
                        hosting si lo prefiere.
                      </p>
                    </div>
                  </div>

                  {/* Proyección Financiera Compra */}
                  <div>
                    <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-4 rounded-lg mb-3">
                      <h4 className="text-xl font-bold">📊 Proyección Financiera - Compra Directa</h4>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-r">Período</th>
                            <th className="px-4 py-3 text-right text-sm font-bold text-gray-700 border-r">Inversión Inicial</th>
                            <th className="px-4 py-3 text-right text-sm font-bold text-gray-700 border-r">Mantenimiento Anual</th>
                            <th className="px-4 py-3 text-right text-sm font-bold text-gray-700">Total Acumulado</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3 font-semibold border-r">Año 1</td>
                            <td className="px-4 py-3 text-right border-r">$32,000,000</td>
                            <td className="px-4 py-3 text-right border-r text-xs">$3,900,000<br/>(6m gratis + 6m pago)</td>
                            <td className="px-4 py-3 text-right font-bold text-green-600">$35,900,000</td>
                          </tr>
                          <tr className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3 font-semibold border-r">Año 2</td>
                            <td className="px-4 py-3 text-right border-r">-</td>
                            <td className="px-4 py-3 text-right border-r">$7,800,000</td>
                            <td className="px-4 py-3 text-right font-bold text-green-600">$43,700,000</td>
                          </tr>
                          <tr className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3 font-semibold border-r">Año 3</td>
                            <td className="px-4 py-3 text-right border-r">-</td>
                            <td className="px-4 py-3 text-right border-r">$7,800,000</td>
                            <td className="px-4 py-3 text-right font-bold text-green-600">$51,500,000</td>
                          </tr>
                          <tr className="bg-green-100 font-bold text-lg">
                            <td className="px-4 py-3 border-r" colSpan="3">
                              Total 3 años (con mantenimiento Premium)
                            </td>
                            <td className="px-4 py-3 text-right text-green-900">$51,500,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg mt-3">
                      <p className="text-sm text-gray-700">
                        <strong>💰 Ventaja vs SaaS:</strong> A 3 años ahorra <strong>$11.7M</strong> vs modelo SaaS 
                        sin compra ($51.5M vs $39.2M + $12M = $51.2M similar, pero usted es DUEÑO desde día 1)
                      </p>
                    </div>
                  </div>

                  {/* Propiedad Intelectual Compra */}
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <div className="font-semibold text-green-900 mb-2">⚖️ Propiedad Intelectual</div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✅ <strong>Código fuente:</strong> Acceso completo con licencia perpetua de uso</li>
                      <li>✅ <strong>Datos:</strong> 100% propiedad del cliente</li>
                      <li>✅ <strong>Modificación:</strong> Puede modificar el código para uso interno</li>
                      <li>✅ <strong>Hosting propio:</strong> Puede instalar en sus propios servidores</li>
                      <li>✅ <strong>Contratar otros devs:</strong> Puede contratar cualquier desarrollador</li>
                      <li>❌ <strong>Reventa:</strong> No puede revender el software a terceros</li>
                      <li>❌ <strong>Distribución:</strong> No puede distribuir el código</li>
                      <li>✅ <strong>Créditos:</strong> Mantiene "Diseñado por www.paulabad.tech"</li>
                    </ul>
                  </div>

                  {/* Licencia de Uso */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="font-semibold text-blue-900 mb-2">📄 Licencia Perpetua No Exclusiva</div>
                    <p className="text-sm text-gray-700">
                      Recibe una licencia de uso perpetuo que le permite usar el software indefinidamente, 
                      modificarlo para sus necesidades internas, e instalarlo en múltiples servidores. 
                      La propiedad intelectual del código base permanece con el desarrollador, pero usted 
                      tiene todos los derechos de uso que necesita para operar su negocio sin limitaciones.
                    </p>
                  </div>

                </div>
              </div>

              {/* Comparativa Final */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-center">🎯 ¿Cuál Opción Elegir?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur p-5 rounded-lg">
                    <div className="text-xl font-bold mb-3">Elija SaaS Si:</div>
                    <ul className="space-y-2 text-sm">
                      <li>✅ Presupuesto inicial limitado ($8M vs $32M)</li>
                      <li>✅ Prefiere cuota mensual predecible</li>
                      <li>✅ No tiene equipo técnico interno</li>
                      <li>✅ Quiere cero preocupaciones (todo incluido)</li>
                      <li>✅ Desea probar antes de comprar</li>
                      <li>✅ Prefiere que nosotros manejemos todo</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 backdrop-blur p-5 rounded-lg">
                    <div className="text-xl font-bold mb-3">Elija Compra Si:</div>
                    <ul className="space-y-2 text-sm">
                      <li>✅ Tiene presupuesto aprobado ($32M)</li>
                      <li>✅ Quiere ser dueño desde día 1</li>
                      <li>✅ Busca ahorro a largo plazo</li>
                      <li>✅ Planea usar el sistema 3+ años</li>
                      <li>✅ Prefiere control total del software</li>
                      <li>✅ Puede tener equipo técnico eventual</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 text-center bg-white/20 backdrop-blur p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>💡 Nuestra Recomendación:</strong> Si tiene el presupuesto disponible, 
                    <strong> Compra Directa</strong> es la mejor inversión a largo plazo. Si necesita 
                    empezar YA con bajo riesgo, <strong>SaaS</strong> es perfecto para arrancar rápido.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* PARTE 9: TAB CRONOGRAMA */}
          {activeTab === 'cronograma' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Cronograma de Desarrollo</h2>
              
              {/* Metodología */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg mb-6">
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Calendar size={28} />
                  Metodología Ágil - Scrum
                </h3>
                <p className="opacity-90">
                  Desarrollo iterativo en <strong>6 sprints de 2 semanas</strong>. Entregas incrementales 
                  con demos al final de cada sprint para feedback continuo del cliente. Ajustes sobre la marcha 
                  según necesidades que surjan.
                </p>
              </div>

              {/* Sprints */}
              <div className="space-y-4">
                {cronograma.map((sprint, idx) => (
                  <div key={idx} className="border-2 border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-5 flex justify-between items-center flex-wrap gap-4">
                      <div>
                        <div className="text-sm opacity-90">Semanas {sprint.semana}</div>
                        <h3 className="text-2xl font-bold">{sprint.fase}</h3>
                        <div className="text-sm opacity-90 mt-1">🎯 {sprint.hitos}</div>
                      </div>
                      <div className="text-4xl font-bold">{idx + 1}/6</div>
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

              {/* Hitos del Proyecto */}
              <div className="bg-blue-50 border-2 border-blue-600 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <TrendingUp size={24} />
                  📅 Hitos Clave del Proyecto
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                      0
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900">Semana 0 - Kick-off</div>
                      <div className="text-sm text-gray-700">
                        Reunión inicial, definición de ambientes, accesos al repositorio, validación final 
                        de requerimientos, y firma de contrato
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900">Semana 2 - Demo Sprint 1</div>
                      <div className="text-sm text-gray-700">
                        Presentación de login funcional, gestión de usuarios y CRUD de datos maestros básico. 
                        Primera versión desplegada en ambiente de desarrollo.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900">Semana 6 - Demo Sprint 3 (Pago 30%)</div>
                      <div className="text-sm text-gray-700">
                        Primera impresión de ticket funcional en impresora térmica. Sistema de generación 
                        de tickets operativo. <strong>Punto de pago intermedio para Compra Directa.</strong>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900">Semana 8 - Demo Sprint 4</div>
                      <div className="text-sm text-gray-700">
                        Impresión desde móviles y PC completa. Gestión de tickets con filtros avanzados. 
                        Sistema de anulación operativo.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                      4
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900">Semana 10 - Demo Sprint 5</div>
                      <div className="text-sm text-gray-700">
                        Reportes PDF y Excel funcionales con todos los filtros. Sistema de seguridad 
                        avanzada implementado. Monitoreo configurado.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                      5
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900">Semana 12 - Go Live 🚀</div>
                      <div className="text-sm text-gray-700">
                        Deploy a producción, capacitación final al equipo completo, entrega de manuales, 
                        transferencia de conocimiento, y <strong>pago final (20% Compra Directa).</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Entregables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border-2 border-green-600 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                    <CheckCircle size={24} />
                    ✅ Entregables al Finalizar
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Código fuente completo (repositorio GitHub privado)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Base de datos con estructura completa y datos maestros</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Aplicación desplegada en servidor de producción</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Manual de usuario Administrador (PDF)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Manual de usuario Responsable (PDF)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Documentación técnica (README completo)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Videos de capacitación grabados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Credenciales de acceso a todos los servicios</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Backups iniciales configurados</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-600 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-yellow-900 mb-3 flex items-center gap-2">
                    <Users size={24} />
                    ⚠️ Requisitos del Cliente
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 font-bold">•</span>
                      <span>Disponibilidad para reuniones semanales (1 hora/semana)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 font-bold">•</span>
                      <span>Validación de datos maestros (clientes, obras, materiales)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 font-bold">•</span>
                      <span>Provisión de logos e información corporativa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 font-bold">•</span>
                      <span>Feedback oportuno en demos de sprint (máx 48h)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 font-bold">•</span>
                      <span>Disponibilidad para pruebas UAT (última semana)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 font-bold">•</span>
                      <span>Designar usuario administrador principal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 font-bold">•</span>
                      <span>Acceso a impresoras térmicas para pruebas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 font-bold">•</span>
                      <span>Definir precios por material durante desarrollo</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Post-Lanzamiento */}
              <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-lg">
                <h3 className="font-bold text-purple-900 mb-3 text-xl flex items-center gap-2">
                  <Shield size={24} />
                  🚀 Post-Lanzamiento
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-2">SaaS - Incluido en Cuota:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>✅ Soporte ilimitado durante toda la suscripción</li>
                      <li>✅ Corrección de bugs sin costo</li>
                      <li>✅ Actualizaciones de seguridad automáticas</li>
                      <li>✅ Mejoras menores (hasta 4h/mes)</li>
                      <li>✅ Monitoreo 24/7 continuo</li>
                      <li>✅ Respuesta a incidentes: críticos 6h, normales 24h</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-2">Compra Directa - 6 Meses Incluidos:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>✅ Soporte y hosting gratis primeros 6 meses</li>
                      <li>✅ Corrección de bugs en periodo garantía</li>
                      <li>✅ Actualizaciones críticas incluidas</li>
                      <li>✅ Después: Mantenimiento opcional ($650k-$900k/mes)</li>
                      <li>✅ Puede gestionar su propio hosting</li>
                      <li>✅ Puede contratar otros desarrolladores</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-purple-200">
                  <p className="text-sm text-gray-700">
                    <strong>Nota Importante:</strong> Nuevas funcionalidades fuera del alcance inicial 
                    se cotizan por separado a <strong>$37,500/hora</strong>. Esto incluye: nuevos módulos, 
                    integraciones con sistemas externos, reportes personalizados avanzados, etc.
                  </p>
                </div>
              </div>

              {/* Resumen Timeline */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-center">⏱️ Resumen del Timeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white/10 backdrop-blur p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold mb-1">12</div>
                    <div className="text-sm opacity-90">Semanas Totales</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold mb-1">6</div>
                    <div className="text-sm opacity-90">Sprints de 2 Semanas</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold mb-1">{totalHoras}</div>
                    <div className="text-sm opacity-90">Horas de Desarrollo</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold mb-1">6</div>
                    <div className="text-sm opacity-90">Demos con Cliente</div>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm opacity-90">
                  Inicio estimado: {new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString('es-CO', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} | 
                  Entrega estimada: {new Date(Date.now() + 91*24*60*60*1000).toLocaleDateString('es-CO', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6 text-center">
          <div className="mb-4">
            <p className="text-gray-600 mb-2">
              Documento generado por <strong>Paula Abad</strong> - Senior Software Developer
            </p>
            <p className="text-sm text-gray-500 mb-1">
              <a href="https://www.paulabad.tech" target="_blank">🌐 www.paulabad.tech</a> | <a href="mailto:paula@paulabad.tech?subject=Aprobada%20%20Cotización&body=Hola,%0A%0A">📧 paula@paulabad.tech</a>
            </p>
            <p className="text-sm text-gray-500 mb-1">
              📍 Cra 10 # 50-44 B. Maraya Pereira, Colombia | <a href='https://wa.me/573054434287?text=Hola,%20quiero%20más%20información%20sobre%20los%20servicios' target="_blank">WhatsApp : +57 305 443 4287</a>
            </p>
            <p className="text-sm text-gray-500">
              📅 {new Date().toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <button 
              onClick={generarPDF}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg"
            >
              <Download size={20} />
              Descargar PDF
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg">
              <CheckCircle size={20} />
              Aprobar Propuesta
            </button>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg">
              <FileText size={20} />
              Solicitar Ajustes
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Esta propuesta es válida por <strong>30 días</strong> desde la fecha de emisión. 
              Los precios están sujetos a cambios después de este período.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              <strong>Condiciones Generales:</strong> Los tiempos de desarrollo son estimados y pueden variar 
              según la complejidad de ajustes solicitados durante el desarrollo. El cliente se compromete a 
              proveer información y feedback oportuno. Pagos según calendario acordado.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDocument;