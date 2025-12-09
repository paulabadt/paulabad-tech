import { jsPDF } from 'jspdf';

// Contador global para números de reporte (empezar en 600)
let reportCounter = 600;

export function generateClientPDF(data) {
  const doc = new jsPDF();
  const { name, url, scores, analysis } = data;

  // Incrementar número de reporte
  const reportNumber = analysis.reportNumber || reportCounter++;
  
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
    doc.setGState(new doc.GState({ opacity: 0.1 }));

    // Intentar agregar imagen si existe
    try {
      // Marca de agua centrada
      const watermarkSize = 150;
      doc.addImage(
        '/marcah2o.png',
        'PNG',
        (pageWidth - watermarkSize) / 2,
        (pageHeight - watermarkSize) / 2,
        watermarkSize,
        watermarkSize
      );
    } catch (e) {
      // Si falla la imagen, usar texto
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
    // Logo izquierdo
    try {
      doc.addImage('/logopdf.png', 'PNG', margin, topMargin, 25, 25);
    } catch (e) {
      // Fallback si no carga la imagen
      doc.setFillColor(168, 85, 247);
      doc.circle(margin + 12.5, topMargin + 12.5, 12.5, 'F');
    }

    // QR Code derecho
    try {
      doc.addImage('/frame.png', 'PNG', pageWidth - margin - 25, topMargin, 25, 25);
    } catch (e) {
      // Fallback si no carga el QR
      doc.setDrawColor(168, 85, 247);
      doc.setLineWidth(1);
      doc.rect(pageWidth - margin - 25, topMargin, 25, 25);
    }
    
    // Línea separadora
    doc.setDrawColor(168, 85, 247);
    doc.setLineWidth(0.5);
    doc.line(margin, topMargin + 30, pageWidth - margin, topMargin + 30);
  };

  // === FOOTER EN TODAS LAS PÁGINAS ===
  const addFooter = () => {
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Este analisis es confidencial y fue generado especificamente para ti.', pageWidth / 2, pageHeight - bottomMargin + 10, { align: 'center' });
    doc.textWithLink('2025 Paula Abad | www.paulabad.tech | Todos los derechos reservados', pageWidth / 2, pageHeight - bottomMargin + 15, { align: 'center', url: 'https://www.paulabad.tech' });
  };

  // === FUNCIÓN PARA AGREGAR NUEVA PÁGINA ===
  const addNewPage = () => {
    doc.addPage();
    addWatermark();
    addHeader();
    addFooter();
    return topMargin + 35; // Retornar posición Y inicial después del header
  };

  // Agregar marca de agua, header y footer en primera página
  addWatermark();
  addHeader();
  addFooter();
  
  yPos = topMargin + 40;
  
  // Título del informe y subtítulo (DESPUÉS DEL HEADER)
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('ANÁLISIS DE SITIO WEB', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Informe Confidencial con Inteligencia Artificial', pageWidth / 2, yPos, { align: 'center' });

  yPos += 20;

  // === INFO DEL CLIENTE ===
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Informe #: ${reportNumber}`, margin, yPos);
  yPos += 7;
  doc.text(`Cliente: ${name}`, margin, yPos);
  yPos += 7;
  doc.text(`Sitio analizado: ${url}`, margin, yPos);
  yPos += 7;
  doc.text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, margin, yPos);
  yPos += 15;

  // === ALERTA DE IMPACTO EN CONVERSIONES ===
  // Verificar si necesitamos nueva página
  if (yPos > pageHeight - bottomMargin - 60) {
    yPos = addNewPage();
  }

  doc.setFillColor(220, 38, 38);
  doc.roundedRect(margin, yPos, contentWidth, 40, 3, 3, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('IMPACTO EN TU NEGOCIO', pageWidth / 2, yPos + 10, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const lostSalesText = `Estas perdiendo entre ${analysis.conversionImpact.lostSales} de ventas potenciales`;
  doc.text(lostSalesText, pageWidth / 2, yPos + 21, { align: 'center' });
  
  const lostVisitorsText = `${analysis.conversionImpact.lostVisitors} de visitantes abandonan tu sitio`;
  doc.text(lostVisitorsText, pageWidth / 2, yPos + 30, { align: 'center' });
  
  yPos += 50;

  // === RAZÓN DE LA PÉRDIDA ===
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  const splitReasoning = doc.splitTextToSize(analysis.conversionImpact.reasoning, contentWidth - 10);
  doc.text(splitReasoning, margin + 5, yPos);
  yPos += splitReasoning.length * 6 + 10;

  // === PUNTUACIONES TÉCNICAS ===
  if (yPos > pageHeight - bottomMargin - 80) {
    yPos = addNewPage();
  }

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Puntuacion Tecnica', margin, yPos);
  yPos += 10;

  const scoreData = [
    { label: 'Rendimiento', value: scores.performance },
    { label: 'SEO', value: scores.seo },
    { label: 'Accesibilidad', value: scores.accessibility },
    { label: 'Mejores Practicas', value: scores.bestPractices }
  ];

  scoreData.forEach(item => {
    const barWidth = 80;
    const barHeight = 8;
    const fillWidth = (item.value / 100) * barWidth;
    
    // Label
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(item.label, margin, yPos);
    
    // Score
    doc.setFont('helvetica', 'bold');
    const scoreColor = item.value >= 80 ? [34, 197, 94] : 
                      item.value >= 60 ? [234, 179, 8] : 
                      [239, 68, 68];
    doc.setTextColor(...scoreColor);
    doc.text(`${item.value}`, margin + 110, yPos);
    
    // Bar background
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(margin + 45, yPos - 5, barWidth, barHeight, 2, 2, 'FD');
    
    // Bar fill
    doc.setFillColor(...scoreColor);
    doc.roundedRect(margin + 45, yPos - 5, fillWidth, barHeight, 2, 2, 'F');
    
    yPos += 12;
  });

  yPos += 10;

  // === PROBLEMAS CRÍTICOS ===
  if (yPos > pageHeight - bottomMargin - 40) {
    yPos = addNewPage();
  }

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Puntos Críticos que Requieren Rediseño Inmediato', margin, yPos);
  yPos += 10;

  analysis.criticalIssues.forEach((item, index) => {
    // Verificar espacio antes de cada problema crítico
    if (yPos > pageHeight - bottomMargin - 30) {
      yPos = addNewPage();
    }

    // Número del problema
    doc.setFillColor(239, 68, 68);
    doc.circle(margin + 3, yPos - 2, 4, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}`, margin + 3, yPos + 1, { align: 'center' });
    
    // Problema
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    const splitIssue = doc.splitTextToSize(item.issue, contentWidth - 15);
    doc.text(splitIssue, margin + 10, yPos);
    yPos += splitIssue.length * 6 + 2;
    
    // Impacto en negocio
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const splitImpact = doc.splitTextToSize(`Impacto: ${item.businessImpact}`, contentWidth - 15);
    doc.text(splitImpact, margin + 10, yPos);
    yPos += splitImpact.length * 5 + 10;
    
    // Línea separadora
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;
  });

  // === COMPARACIÓN CON COMPETENCIA ===
  if (yPos > pageHeight - bottomMargin - 60) {
    yPos = addNewPage();
  }

  doc.setFillColor(249, 250, 251);
  doc.roundedRect(margin, yPos, contentWidth, 35, 3, 3, 'F');
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Comparacion con Competidores', margin + 5, yPos + 10);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const splitComparison = doc.splitTextToSize(analysis.competitorComparison, contentWidth - 15);
  doc.text(splitComparison, margin + 5, yPos + 20);
  
  yPos += 45;

  // === DECLARACIÓN DE URGENCIA ===
  if (yPos > pageHeight - bottomMargin - 50) {
    yPos = addNewPage();
  }

  doc.setFillColor(255, 237, 213);
  doc.roundedRect(margin, yPos, contentWidth, 25, 3, 3, 'F');
  
  doc.setTextColor(180, 83, 9);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  const splitUrgency = doc.splitTextToSize(`${analysis.urgencyStatement}`, contentWidth - 15);
  doc.text(splitUrgency, margin + 5, yPos + 10);
  
  yPos += 35;

  // === CALL TO ACTION ===
  if (yPos > pageHeight - bottomMargin - 70) {
    yPos = addNewPage();
  }

  // Codificar URL para WhatsApp
  const whatsappMessage = encodeURIComponent(`Hola Paula, mi sitio ${url} ya fue analizado. Quiero contratar tus servicios.`);
  const whatsappUrl = `https://wa.me/573113724894?text=${whatsappMessage}`;

  doc.setFillColor(99, 102, 241);
  doc.roundedRect(margin, yPos, contentWidth, 50, 3, 3, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Listo para Recuperar esos Clientes?', pageWidth / 2, yPos + 12, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Puedo ayudarte a solucionar estos problemas', pageWidth / 2, yPos + 22, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.textWithLink('WhatsApp: +57 311 372 4894', pageWidth / 2, yPos + 32, { align: 'center', url: whatsappUrl });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Paula Abad - Desarrollador de Software', pageWidth / 2, yPos + 42, { align: 'center' });
  
  doc.setFont('helvetica', 'bold');
  doc.textWithLink('www.paulabad.tech', pageWidth / 2, yPos + 48, { align: 'center', url: 'https://www.paulabad.tech' });

  return doc;
}