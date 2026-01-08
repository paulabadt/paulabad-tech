// lib/checklistPDFGenerator.js
import { jsPDF } from 'jspdf';

// Función para limpiar caracteres problemáticos
const cleanText = (text) => {
  if (!text) return '';
  return text
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/Á/g, 'A')
    .replace(/É/g, 'E')
    .replace(/Í/g, 'I')
    .replace(/Ó/g, 'O')
    .replace(/Ú/g, 'U')
    .replace(/Ñ/g, 'N');
};

export function generateCheclistPDF(data) {
  const doc = new jsPDF();
  const { clientData, functionality, businessLogic } = data;

  let yPos = 20;
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const topMargin = 15;
  const bottomMargin = 25;
  const contentWidth = pageWidth - (margin * 2);

  // === MARCA DE AGUA EN TODAS LAS PÁGINAS ===
  const addWatermark = () => {
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.08 }));
    
    try {
      const watermarkSize = 150;
      doc.addImage(
        '/logopdf.png',
        'PNG',
        (pageWidth - watermarkSize) / 2,
        (pageHeight - watermarkSize) / 2,
        watermarkSize,
        watermarkSize
      );
    } catch (e) {
      doc.setFontSize(50);
      doc.setTextColor(200, 200, 200);
      doc.text('PAULA ABAD', pageWidth / 2, pageHeight / 2, {
        align: 'center',
        angle: 45
      });
    }
    
    doc.restoreGraphicsState();
  };

  // === HEADER CON LOGO Y QR ===
  const addHeader = () => {
    try {
      doc.addImage('/logopdf.png', 'PNG', margin, topMargin, 25, 25);
    } catch (e) {
      doc.setFillColor(168, 85, 247);
      doc.circle(margin + 12.5, topMargin + 12.5, 12.5, 'F');
    }

    try {
      doc.addImage('/frame.png', 'PNG', pageWidth - margin - 25, topMargin, 25, 25);
    } catch (e) {
      doc.setDrawColor(168, 85, 247);
      doc.setLineWidth(1);
      doc.rect(pageWidth - margin - 25, topMargin, 25, 25);
    }
    
    doc.setDrawColor(168, 85, 247);
    doc.setLineWidth(0.5);
    doc.line(margin, topMargin + 30, pageWidth - margin, topMargin + 30);
  };

  // === FOOTER EN TODAS LAS PÁGINAS ===
  const addFooter = () => {
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Checklist confidencial generado para ' + cleanText(clientData.clientName), pageWidth / 2, pageHeight - bottomMargin + 10, { align: 'center' });
    doc.textWithLink('2025 Paula Abad | www.paulabad.tech | Todos los derechos reservados', pageWidth / 2, pageHeight - bottomMargin + 15, { align: 'center', url: 'https://www.paulabad.tech' });
  };

  // === FUNCIÓN PARA AGREGAR NUEVA PÁGINA ===
  const addNewPage = () => {
    doc.addPage();
    addWatermark();
    addHeader();
    addFooter();
    return topMargin + 35;
  };

  // Agregar marca de agua, header y footer en primera página
  addWatermark();
  addHeader();
  addFooter();
  
  yPos = topMargin + 40;
  
  // === TÍTULO ===
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('CHECKLIST DE MIGRACION', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Desktop > Web', pageWidth / 2, yPos, { align: 'center' });

  yPos += 20;

  // === DATOS DEL CLIENTE ===
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Cliente: ${cleanText(clientData.clientName)}`, margin, yPos);
  yPos += 7;
  doc.text(`Email: ${cleanText(clientData.clientEmail)}`, margin, yPos);
  yPos += 7;
  if (clientData.clientPhone) {
    doc.text(`Telefono: ${cleanText(clientData.clientPhone)}`, margin, yPos);
    yPos += 7;
  }
  doc.text(`Empresa: ${cleanText(clientData.businessName)}`, margin, yPos);
  yPos += 7;
  if (clientData.businessType) {
    doc.text(`Tipo de Negocio: ${cleanText(clientData.businessType)}`, margin, yPos);
    yPos += 7;
  }
  doc.text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, margin, yPos);
  yPos += 15;

  // === ALERTA DE IMPORTANCIA ===
  if (yPos > pageHeight - bottomMargin - 60) {
    yPos = addNewPage();
  }

  doc.setFillColor(59, 130, 246);
  doc.roundedRect(margin, yPos, contentWidth, 35, 3, 3, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('FASE CRITICA DE EVALUACION', pageWidth / 2, yPos + 10, { align: 'center' });
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const criticalText = 'Este checklist documenta todos los aspectos del sistema actual. La precision aqui determina el exito de la migracion.';
  const splitCritical = doc.splitTextToSize(criticalText, contentWidth - 15);
  doc.text(splitCritical, pageWidth / 2, yPos + 21, { align: 'center' });
  
  yPos += 50;

  // === FUNCIONALIDADES ===
  if (yPos > pageHeight - bottomMargin - 80) {
    yPos = addNewPage();
  }

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('1. FUNCIONALIDAD Y PROCESOS', margin, yPos);
  yPos += 10;

  // Descripción general
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 80, 80);
  doc.text('Descripcion General:', margin, yPos);
  yPos += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const splitFunctionality = doc.splitTextToSize(cleanText(functionality.description) || 'No especificado', contentWidth - 5);
  doc.text(splitFunctionality, margin + 3, yPos);
  yPos += splitFunctionality.length * 5 + 5;

  // Pantallas principales
  if (functionality.mainScreens && functionality.mainScreens.length > 0) {
    if (yPos > pageHeight - bottomMargin - 40) {
      yPos = addNewPage();
    }

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(80, 80, 80);
    doc.text('Pantallas Principales:', margin, yPos);
    yPos += 5;

    functionality.mainScreens.forEach((screen, index) => {
      if (yPos > pageHeight - bottomMargin - 20) {
        yPos = addNewPage();
      }

      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(`${index + 1}. ${cleanText(screen.name)}`, margin + 5, yPos);
      yPos += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      const splitScreen = doc.splitTextToSize(cleanText(screen.description) || '', contentWidth - 10);
      doc.text(splitScreen, margin + 8, yPos);
      yPos += splitScreen.length * 4 + 3;
    });

    yPos += 3;
  }

  // Acciones de usuario
  if (functionality.userActions) {
    if (yPos > pageHeight - bottomMargin - 40) {
      yPos = addNewPage();
    }

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(80, 80, 80);
    doc.setFontSize(10);
    doc.text('Acciones de Usuario:', margin, yPos);
    yPos += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const splitActions = doc.splitTextToSize(cleanText(functionality.userActions), contentWidth - 5);
    doc.text(splitActions, margin + 3, yPos);
    yPos += splitActions.length * 4 + 8;
  }

  // === LÓGICA DE NEGOCIO ===
  if (yPos > pageHeight - bottomMargin - 80) {
    yPos = addNewPage();
  }

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('2. LOGICA DE NEGOCIO', margin, yPos);
  yPos += 8;

  doc.setFillColor(249, 240, 245);
  doc.roundedRect(margin - 2, yPos - 2, contentWidth + 4, 25, 2, 2, 'F');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(88, 28, 135);
  const businessDescSplit = doc.splitTextToSize(cleanText(businessLogic.customDescription) || 'Descripcion no proporcionada', contentWidth - 10);
  doc.text(businessDescSplit, margin + 3, yPos + 2);
  
  yPos += Math.max(25, businessDescSplit.length * 5);
  yPos += 5;

  if (yPos > pageHeight - bottomMargin - 60) {
    yPos = addNewPage();
  }

  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Ubicacion de la Logica:', margin, yPos);
  yPos += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const splitLogicLocation = doc.splitTextToSize(cleanText(businessLogic.logicLocation) || 'No especificado', contentWidth - 5);
  doc.text(splitLogicLocation, margin + 3, yPos);
  yPos += splitLogicLocation.length * 4 + 5;

  if (businessLogic.validationRules) {
    if (yPos > pageHeight - bottomMargin - 40) {
      yPos = addNewPage();
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Reglas de Validacion:', margin, yPos);
    yPos += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const splitValidation = doc.splitTextToSize(cleanText(businessLogic.validationRules), contentWidth - 5);
    doc.text(splitValidation, margin + 3, yPos);
    yPos += splitValidation.length * 4 + 5;
  }

  if (businessLogic.complexCalculations) {
    if (yPos > pageHeight - bottomMargin - 40) {
      yPos = addNewPage();
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Calculos Complejos:', margin, yPos);
    yPos += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const splitCalculations = doc.splitTextToSize(cleanText(businessLogic.complexCalculations), contentWidth - 5);
    doc.text(splitCalculations, margin + 3, yPos);
    yPos += splitCalculations.length * 4 + 8;
  }

  // === DIAGRAMA DE FLUJO VERTICAL ===
  if (yPos > pageHeight - bottomMargin - 120) {
    yPos = addNewPage();
  }

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('3. FLUJO DE FUNCIONAMIENTO', margin, yPos);
  yPos += 10;

  // Crear flujo vertical basado en la descripción del cliente
  const flowStepsVertical = [
    `1. Usuario accede a traves de: ${cleanText(functionality.description || 'La aplicacion')}`,
    `2. Sistema valida datos iniciales`,
    `3. Se ejecuta logica de negocio: ${cleanText(businessLogic.customDescription ? businessLogic.customDescription.substring(0, 60) + '...' : 'Procesamiento de datos')}`,
    `4. Actualizacion en base de datos: ${cleanText(data.database?.currentStructure ? 'Segun estructura definida' : 'Operaciones CRUD')}`,
    `5. Retorna resultado al usuario`,
    `6. Notificacion/Confirmacion al cliente`
  ];

  flowStepsVertical.forEach((step, index) => {
    // Verificar si cabe en la página
    if (yPos > pageHeight - bottomMargin - 25) {
      yPos = addNewPage();
    }

    // Box numerado
    doc.setFillColor(99, 102, 241);
    doc.roundedRect(margin, yPos, contentWidth, 14, 2, 2, 'F');
    
    // Text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const splitStep = doc.splitTextToSize(step, contentWidth - 10);
    doc.text(splitStep, margin + 5, yPos + 4);
    
    yPos += Math.max(14, splitStep.length * 5) + 3;
    
    // Flecha abajo (excepto en el último paso)
    if (index < flowStepsVertical.length - 1) {
      doc.setTextColor(99, 102, 241);
      doc.setFontSize(12);
      doc.text('↓', margin + contentWidth / 2, yPos);
      yPos += 5;
    }
  });

  yPos += 8;

  // === RECOMENDACIONES ===
  if (yPos > pageHeight - bottomMargin - 80) {
    yPos = addNewPage();
  }

  doc.setFillColor(254, 243, 224);
  doc.roundedRect(margin, yPos, contentWidth, 40, 3, 3, 'F');
  
  doc.setTextColor(180, 83, 9);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('PROXIMOS PASOS', margin + 5, yPos + 8);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const recommendations = [
    '1. Revisar y validar toda la informacion recolectada',
    '2. Identificar dependencias entre modulos',
    '3. Planificar la estrategia de migracion por fases',
    '4. Crear matriz de mapeo: Old Features > New Web Features',
    '5. Definir timeline y recursos necesarios'
  ];
  
  let recY = yPos + 15;
  recommendations.forEach(rec => {
    doc.text(cleanText(rec), margin + 5, recY);
    recY += 5;
  });
  
  yPos = recY + 10;

  // === CALL TO ACTION ===
  if (yPos > pageHeight - bottomMargin - 70) {
    yPos = addNewPage();
  }

  doc.setFillColor(168, 85, 247);
  doc.roundedRect(margin, yPos, contentWidth, 50, 3, 3, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('¿Listo para Comenzar la Migración?', pageWidth / 2, yPos + 12, { align: 'center' });
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Podemos transformar tu aplicación de escritorio en una solución web moderna', pageWidth / 2, yPos + 22, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  const whatsappMessage = encodeURIComponent(`Hola Paula, ya completé el checklist de migración. Quiero una consulta sobre ${clientData.businessName}.`);
  const whatsappUrl = `https://wa.me/573054434287?text=${whatsappMessage}`;
  doc.textWithLink('WhatsApp: +57 305 443 4287', pageWidth / 2, yPos + 32, { align: 'center', url: whatsappUrl });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Paula Abad - Desarrollador de Software', pageWidth / 2, yPos + 42, { align: 'center' });
  
  doc.setFont('helvetica', 'bold');
  doc.textWithLink('www.paulabad.tech', pageWidth / 2, yPos + 48, { align: 'center', url: 'https://www.paulabad.tech' });

  return doc;
}