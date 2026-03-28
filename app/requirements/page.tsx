'use client';

// ═══════════════════════════════════════════════════════════
//  app/requerimientos/page.tsx
//  Levantamiento de Requerimientos — paulabad.tech
//  PARTE 1/5 — Lock screen + Layout + Sidebar + Sección 1
// ═══════════════════════════════════════════════════════════

import { useState, useEffect, useCallback } from 'react';
import './requerimientos.css';

// ─────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────
export interface Funcionalidad {
  nombre: string;
  descripcion: string;
}

export interface Modulo {
  id: string;
  titulo: string;
  descripcion: string;
  funcionalidades: Funcionalidad[];
}

export interface FaseCronograma {
  periodo: string;
  actividad: string;
  entregable: string;
}

export interface FormData {
  // Sección 1 — Cliente
  razonSocial: string;
  nit: string;
  industria: string;
  industriaDetalle: string;
  ciudad: string;
  pais: string;
  webCliente: string;
  contactoNombre: string;
  contactoCargo: string;
  contactoEmail: string;
  contactoTel: string;
  fechaReunion: string;
  nombreSistema: string;
  planComercial: string;
  modalidadEntrega: string;
  vigencia: string;
  refNum: string;
  descCliente: string;
  sistemasActuales: string;

  // Sección 2 — Contexto
  procesoActual: string;
  dolores: string;
  intentosPrevios: string;
  impacto: string;
  objetivoPrincipal: string;
  resultadosEsperados: string;
  alcanceExcluido: string;
  tipoUsuarios: string[];
  cantidadUsuarios: string;
  nivelTecnico: string;

  // Sección 3 — Módulos
  modulos: Modulo[];

  // Sección 4 — Infraestructura
  plataforma: string;
  acceso: string[];
  baseDatos: string;
  hosting: string;
  integraciones: string;
  seguridad: string[];
  disponibilidad: string;
  numUsuarios: string;
  tieneApp: string;

  // Sección 5 — Soporte
  soporteCorrectivo: string;
  soporteConsultivo: string;
  capacitaciones: string;
  actualizaciones: string;
  horarioAtencion: string;
  canalSoporte: string[];
  costoAdicHora: string;
  costoAdicCapacitacion: string;
  costoPresencial: string;

  // Sección 6 — Inversión
  valorImplementacion: string;
  valorMensual: string;
  valorAnual: string;
  pago30: string;
  pago20: string;
  pago50: string;
  formaPago: string;
  banco: string;
  tipoCuenta: string;
  numeroCuenta: string;
  titular: string;
  cedula: string;
  notasInversion: string;

  // Sección 7 — Cronograma
  diasTotales: string;
  fases: FaseCronograma[];
  notasCronograma: string;
}

// ─────────────────────────────────────────────
//  INITIAL STATE
// ─────────────────────────────────────────────
const INITIAL_FORM: FormData = {
  razonSocial: '', nit: '', industria: '', industriaDetalle: '',
  ciudad: '', pais: 'Colombia', webCliente: '',
  contactoNombre: '', contactoCargo: '', contactoEmail: '', contactoTel: '',
  fechaReunion: '', nombreSistema: '', planComercial: 'Plan Esencial',
  modalidadEntrega: 'SaaS — Suscripción anual', vigencia: '30 días',
  refNum: '', descCliente: '', sistemasActuales: '',

  procesoActual: '', dolores: '', intentosPrevios: '', impacto: '',
  objetivoPrincipal: '', resultadosEsperados: '', alcanceExcluido: '',
  tipoUsuarios: [], cantidadUsuarios: '', nivelTecnico: '',

  modulos: [
    {
      id: crypto.randomUUID(),
      titulo: '',
      descripcion: '',
      funcionalidades: [{ nombre: '', descripcion: '' }],
    },
  ],

  plataforma: '100% en la nube', acceso: [], baseDatos: 'SQL en la nube',
  hosting: 'Vercel + Supabase', integraciones: '', seguridad: [],
  disponibilidad: '99.9% uptime', numUsuarios: '', tieneApp: 'No',

  soporteCorrectivo: 'Ilimitado', soporteConsultivo: '4 horas / mes',
  capacitaciones: '1 sesión / mes (1 hora)', actualizaciones: 'Ilimitadas',
  horarioAtencion: 'Lunes a viernes: 8:00 am — 6:00 pm\nSábados: 9:00 am — 12:00 pm\nDomingos y festivos: Solo emergencias',
  canalSoporte: ['WhatsApp', 'Email'],
  costoAdicHora: '80000', costoAdicCapacitacion: '150000', costoPresencial: '200000',

  valorImplementacion: '', valorMensual: '', valorAnual: '',
  pago30: '', pago20: '', pago50: '',
  formaPago: 'Pago anual anticipado',
  banco: 'Bancolombia', tipoCuenta: 'Cuenta de Ahorros',
  numeroCuenta: '912-105180-83', titular: 'Paula Andrea Abad',
  cedula: '42.118.637', notasInversion: '',

  diasTotales: '15',
  fases: [
    { periodo: 'Días 1 — 3 (Semana 1)', actividad: '', entregable: '' },
    { periodo: 'Días 4 — 7 (Semana 1)', actividad: '', entregable: '' },
    { periodo: 'Días 8 — 12 (Semana 2)', actividad: '', entregable: '' },
    { periodo: 'Días 13 — 15 (Semana 2)', actividad: '', entregable: '' },
  ],
  notasCronograma: '',
};

const STEPS = [
  { label: 'Datos del Cliente',      desc: 'Empresa, contacto y referencia' },
  { label: 'Contexto del Proyecto',  desc: 'Problema, objetivo, usuarios' },
  { label: 'Módulos del Sistema',    desc: 'Funcionalidades por módulo' },
  { label: 'Infraestructura',        desc: 'Tecnología y plataforma' },
  { label: 'Soporte',                desc: 'Niveles de servicio' },
  { label: 'Inversión',              desc: 'Implementación y suscripción' },
  { label: 'Cronograma',             desc: 'Fases y entregables' },
];

const ACCESS_PASSWORD = 'paula2026'; // ← Cambia antes de subir

// ─────────────────────────────────────────────
//  HELPER COMPONENTS
// ─────────────────────────────────────────────
function Field({ label, req, hint, children }: {
  label: string; req?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="rq-field">
      <label className="rq-label">
        {label}{req && <span className="rq-req">*</span>}
      </label>
      {children}
      {hint && <span className="rq-hint">{hint}</span>}
    </div>
  );
}

// ─────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────
export default function RequerimientosPage() {
  const [locked, setLocked]     = useState(true);
  const [pwd, setPwd]           = useState('');
  const [showPwd, setShowPwd]   = useState(false);
  const [pwdError, setPwdError] = useState('');
  const [step, setStep]         = useState(1);
  const [done, setDone]         = useState<number[]>([]);
  const [form, setForm]         = useState<FormData>(INITIAL_FORM);
  const [refNum, setRefNum]     = useState('GP-135800');
  const [today, setToday]       = useState('');

  // ── INIT ──────────────────────────────────
  useEffect(() => {
    const now = new Date();
    setToday(now.toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' }));

    const last = parseInt(localStorage.getItem('pa_lastRef') || '135799');
    const next = last + 1;
    localStorage.setItem('pa_lastRef', String(next));
    const ref = `GP-${next}`;
    setRefNum(ref);
    setForm(f => ({
      ...f,
      refNum: ref,
      fechaReunion: now.toISOString().split('T')[0],
    }));
  }, []);

  // ── AUTH ──────────────────────────────────
  const handleLogin = useCallback(() => {
    if (pwd === ACCESS_PASSWORD) {
      setLocked(false);
      setPwdError('');
    } else {
      setPwdError('Contraseña incorrecta. Intenta de nuevo.');
      setPwd('');
    }
  }, [pwd]);

  // ── FORM UPDATE ───────────────────────────
  const set = (key: keyof FormData, val: unknown) =>
    setForm(f => ({ ...f, [key]: val }));

  // ── STEPPER ───────────────────────────────
  const goStep = (n: number) => {
    if (n > step && !done.includes(step)) setDone(d => [...d, step]);
    setStep(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pct = Math.round((step / 7) * 100);

  // ── PRICE CALCULATOR ──────────────────────
  useEffect(() => {
    const impl = parseFloat(form.valorImplementacion.replace(/\D/g, '')) || 0;
    if (impl) {
      set('pago30', String(Math.round(impl * 0.30)));
      set('pago20', String(Math.round(impl * 0.20)));
      set('pago50', String(Math.round(impl * 0.50)));
    }
  }, [form.valorImplementacion]);

  useEffect(() => {
    const m = parseFloat(form.valorMensual.replace(/\D/g, '')) || 0;
    if (m) set('valorAnual', String(m * 12));
  }, [form.valorMensual]);

  const fmt = (v: string) =>
    parseInt(v || '0').toLocaleString('es-CO');

  const fmtCOP = (v: string) => {
    const n = parseInt(v.replace(/\D/g, '') || '0');
    return `$${n.toLocaleString('es-CO')}`;
  };

  // ══════════════════════════════════════════
  //  PDF #1 — REQUERIMIENTOS INTERNOS
  // ══════════════════════════════════════════
  const generarPDFRequerimientos = async () => {
    const jsPDF   = (await import('jspdf')).default;
    const autoTable = (await import('jspdf-autotable')).default;

    const doc       = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pw        = doc.internal.pageSize.width;
    const ph        = doc.internal.pageSize.height;
    let   y         = 0;
    let   pageNum   = 1;

    const PURPLE  = [123, 47, 190] as [number,number,number];
    const PINK    = [233, 30, 140] as [number,number,number];
    const DARK    = [15, 10, 26]   as [number,number,number];
    const GRAY    = [100, 90, 120] as [number,number,number];
    const WHITE   = [255,255,255]  as [number,number,number];
    const LIGHT   = [240,235,250]  as [number,number,number];

    const header = () => {
      // Fondo header
      doc.setFillColor(...DARK);
      doc.rect(0, 0, pw, 28, 'F');
      doc.setFillColor(...PURPLE);
      doc.rect(0, 25, pw, 2, 'F');

      // Logo
      try { doc.addImage('/logopdf.png', 'PNG', 8, 4, 20, 20); } catch {}

      // Título
      doc.setTextColor(...WHITE);
      doc.setFontSize(14); doc.setFont('helvetica', 'bold');
      doc.text('LEVANTAMIENTO DE REQUERIMIENTOS', 32, 12);
      doc.setFontSize(8); doc.setFont('helvetica', 'normal');
      doc.setTextColor(200, 180, 230);
      doc.text(`paulabad.tech  ·  Documento interno  ·  Ref: ${form.refNum}`, 32, 19);

      // Fecha
      doc.setFontSize(8);
      doc.text(new Date().toLocaleDateString('es-CO', { day:'2-digit', month:'long', year:'numeric' }), pw - 12, 12, { align: 'right' });

      y = 35;
    };

    const footer = () => {
      doc.setFillColor(...DARK);
      doc.rect(0, ph - 12, pw, 12, 'F');
      doc.setTextColor(...GRAY);
      doc.setFontSize(7); doc.setFont('helvetica', 'normal');
      doc.text('paulabad.tech  ·  paula@paulabad.tech  ·  +57 305 443 4287', pw / 2, ph - 5, { align: 'center' });
      doc.setTextColor(...PURPLE);
      doc.text(`Pág. ${pageNum}`, pw - 12, ph - 5, { align: 'right' });
    };

    const newPage = () => {
      footer();
      doc.addPage();
      pageNum++;
      header();
    };

    const checkY = (need: number) => { if (y + need > ph - 18) newPage(); };

    const sectionTitle = (title: string) => {
      checkY(12);
      doc.setFillColor(...PURPLE);
      doc.rect(8, y, pw - 16, 8, 'F');
      doc.setTextColor(...WHITE);
      doc.setFontSize(9.5); doc.setFont('helvetica', 'bold');
      doc.text(title, 13, y + 5.5);
      y += 11;
    };

    const field2col = (label: string, value: string) => {
      checkY(8);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...GRAY);
      doc.text(label.toUpperCase(), 12, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(40, 30, 60);
      const lines = doc.splitTextToSize(value || '—', (pw / 2) - 20);
      doc.text(lines, 12, y + 4);
      y += 4 + (lines.length * 4);
    };

    const twoCol = (pairs: [string, string][]) => {
      const colW = (pw - 24) / 2;
      let leftY = y;
      pairs.forEach(([label, value], i) => {
        const col = i % 2;
        const cx  = 12 + col * (colW + 4);
        const ry  = col === 0 ? leftY : leftY;
        if (col === 0 && i > 0) leftY = y;

        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...GRAY);
        doc.text(label.toUpperCase(), cx, ry);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(40, 30, 60);
        const lines = doc.splitTextToSize(value || '—', colW - 4);
        doc.text(lines, cx, ry + 4);

        if (col === 1) {
          y = ry + 4 + (lines.length * 4) + 4;
          leftY = y;
        }
        if (col === 0) {
          leftY = ry;
        }
        checkY(12);
      });
      if (pairs.length % 2 !== 0) y += 10;
    };

    // ── PÁGINA 1: PORTADA ──────────────────────
    doc.setFillColor(...DARK);
    doc.rect(0, 0, pw, ph, 'F');

    // Degradado simulado
    for (let i = 0; i < 40; i++) {
      doc.setFillColor(123 - i, 47, 190 + i > 255 ? 255 : 190 + i);
      doc.setGState(doc.GState({ opacity: 0.04 }));
      doc.rect(0, i * 7, pw, 7, 'F');
    }
    doc.setGState(doc.GState({ opacity: 1 }));

    try { doc.addImage('/logopdf.png', 'PNG', pw/2 - 20, 55, 40, 40); } catch {}

    doc.setTextColor(...WHITE);
    doc.setFontSize(22); doc.setFont('helvetica', 'bold');
    doc.text('LEVANTAMIENTO DE', pw/2, 115, { align: 'center' });
    doc.text('REQUERIMIENTOS', pw/2, 127, { align: 'center' });

    doc.setFillColor(...PINK);
    doc.rect(pw/2 - 35, 132, 70, 0.8, 'F');

    doc.setFontSize(13); doc.setFont('helvetica', 'normal');
    doc.setTextColor(200, 180, 230);
    doc.text(form.nombreSistema || 'Nuevo Sistema', pw/2, 142, { align: 'center' });

    doc.setFontSize(10);
    doc.text(form.razonSocial || 'Cliente', pw/2, 152, { align: 'center' });

    // Recuadro de datos portada
    doc.setFillColor(26, 16, 40);
    doc.roundedRect(20, 165, pw - 40, 55, 3, 3, 'F');
    doc.setDrawColor(...PURPLE);
    doc.roundedRect(20, 165, pw - 40, 55, 3, 3, 'S');

    const portadaData = [
      ['Referencia',  form.refNum],
      ['Fecha',       new Date().toLocaleDateString('es-CO', { day:'2-digit', month:'long', year:'numeric' })],
      ['Plan',        form.planComercial],
      ['Modalidad',   form.modalidadEntrega],
      ['Vigencia',    form.vigencia],
      ['Módulos',     `${form.modulos.length} módulo(s)`],
    ];
    portadaData.forEach(([k, v], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const cx  = 30 + col * 85;
      const cy  = 175 + row * 16;
      doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
      doc.setTextColor(155, 89, 208);
      doc.text(k.toUpperCase(), cx, cy);
      doc.setFontSize(9.5); doc.setFont('helvetica', 'normal');
      doc.setTextColor(...WHITE);
      doc.text(String(v), cx, cy + 6);
    });

    doc.setFontSize(7.5);
    doc.setTextColor(...GRAY);
    doc.text('Documento de uso interno — paulabad.tech', pw/2, ph - 20, { align: 'center' });

    // ── PÁGINA 2: DATOS DEL CLIENTE ────────────
    doc.addPage(); pageNum++;
    header();
    sectionTitle('1. DATOS DEL CLIENTE');

    autoTable(doc, {
      startY: y,
      head: [['Campo', 'Información']],
      body: [
        ['Razón Social',         form.razonSocial],
        ['NIT / Cédula',         form.nit],
        ['Industria / Sector',   `${form.industria}${form.industriaDetalle ? ' — ' + form.industriaDetalle : ''}`],
        ['Ciudad / País',        `${form.ciudad}, ${form.pais}`],
        ['Web / Redes',          form.webCliente || '—'],
        ['Contacto principal',   form.contactoNombre],
        ['Cargo',                form.contactoCargo || '—'],
        ['Email',                form.contactoEmail],
        ['WhatsApp / Teléfono',  form.contactoTel || '—'],
        ['Fecha de reunión',     form.fechaReunion],
        ['Sistemas actuales',    form.sistemasActuales || '—'],
      ],
      theme: 'grid',
      headStyles:  { fillColor: PURPLE, textColor: WHITE, fontSize: 8, fontStyle: 'bold' },
      bodyStyles:  { fontSize: 8, textColor: [40,30,60] },
      alternateRowStyles: { fillColor: LIGHT },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50, fillColor: [230,220,245] } },
      margin: { left: 8, right: 8 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;

    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...GRAY);
    doc.text('DESCRIPCIÓN DEL CLIENTE', 12, y); y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 30, 60);
    const descLines = doc.splitTextToSize(form.descCliente || '—', pw - 20);
    doc.text(descLines, 12, y); y += descLines.length * 4.5 + 6;

    footer();

    // ── PÁGINA 3: CONTEXTO ─────────────────────
    doc.addPage(); pageNum++;
    header();
    sectionTitle('2. CONTEXTO DEL PROYECTO');

    const ctxData = [
      ['Proceso actual', form.procesoActual],
      ['Dolores / Problemas', form.dolores],
      ['Intentos previos', form.intentosPrevios || '—'],
      ['Impacto del problema', form.impacto || '—'],
    ];
    ctxData.forEach(([label, value]) => {
      checkY(20);
      doc.setFontSize(8); doc.setFont('helvetica', 'bold');
      doc.setTextColor(...PURPLE);
      doc.text(label.toUpperCase(), 12, y); y += 5;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(40, 30, 60);
      const lines = doc.splitTextToSize(value, pw - 24);
      doc.text(lines, 12, y); y += lines.length * 4.5 + 6;
    });

    checkY(12);
    sectionTitle('OBJETIVO Y ALCANCE');
    const objData = [
      ['Objetivo principal', form.objetivoPrincipal],
      ['Resultados esperados', form.resultadosEsperados],
      ['Alcance excluido', form.alcanceExcluido || '—'],
    ];
    objData.forEach(([label, value]) => {
      checkY(16);
      doc.setFontSize(8); doc.setFont('helvetica', 'bold');
      doc.setTextColor(...PURPLE);
      doc.text(label.toUpperCase(), 12, y); y += 5;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(40, 30, 60);
      const lines = doc.splitTextToSize(value || '—', pw - 24);
      doc.text(lines, 12, y); y += lines.length * 4.5 + 6;
    });

    checkY(12);
    sectionTitle('USUARIOS DEL SISTEMA');
    autoTable(doc, {
      startY: y,
      head: [['Tipo de usuarios', 'Cantidad', 'Nivel técnico']],
      body: [[
        form.tipoUsuarios.join(', ') || '—',
        form.cantidadUsuarios || '—',
        form.nivelTecnico || '—',
      ]],
      theme: 'grid',
      headStyles: { fillColor: PURPLE, textColor: WHITE, fontSize: 8, fontStyle: 'bold' },
      bodyStyles: { fontSize: 8, textColor: [40,30,60] },
      alternateRowStyles: { fillColor: LIGHT },
      margin: { left: 8, right: 8 },
    });
    y = (doc as any).lastAutoTable.finalY + 6;
    footer();

    // ── PÁGINAS MÓDULOS ────────────────────────
    form.modulos.forEach((mod, mi) => {
      doc.addPage(); pageNum++;
      header();
      sectionTitle(`3.${mi + 1} MÓDULO ${mi + 1} — ${mod.titulo.toUpperCase() || 'SIN TÍTULO'}`);

      if (mod.descripcion) {
        doc.setFontSize(8.5); doc.setFont('helvetica', 'italic');
        doc.setTextColor(...GRAY);
        const dlines = doc.splitTextToSize(mod.descripcion, pw - 24);
        doc.text(dlines, 12, y); y += dlines.length * 4.5 + 6;
      }

      if (mod.funcionalidades.length > 0) {
        autoTable(doc, {
          startY: y,
          head: [['#', 'Funcionalidad', 'Descripción']],
          body: mod.funcionalidades.map((fn, i) => [
            String(i + 1),
            fn.nombre || '—',
            fn.descripcion || '—',
          ]),
          theme: 'striped',
          headStyles:  { fillColor: PURPLE, textColor: WHITE, fontSize: 8.5, fontStyle: 'bold' },
          bodyStyles:  { fontSize: 8, textColor: [40,30,60] },
          alternateRowStyles: { fillColor: LIGHT },
          columnStyles: {
            0: { cellWidth: 8, halign: 'center', fontStyle: 'bold', textColor: PURPLE },
            1: { cellWidth: 55, fontStyle: 'bold' },
          },
          margin: { left: 8, right: 8 },
        });
        y = (doc as any).lastAutoTable.finalY + 6;
      }
      footer();
    });

    // ── INFRAESTRUCTURA ────────────────────────
    doc.addPage(); pageNum++;
    header();
    sectionTitle('4. INFRAESTRUCTURA Y TECNOLOGÍA');
    autoTable(doc, {
      startY: y,
      head: [['Componente', 'Detalle']],
      body: [
        ['Plataforma',      form.plataforma],
        ['Acceso',          form.acceso.join(', ') || '—'],
        ['Base de datos',   form.baseDatos],
        ['Hosting',         form.hosting],
        ['Disponibilidad',  form.disponibilidad],
        ['Nº Usuarios',     form.numUsuarios || '—'],
        ['App móvil nativa',form.tieneApp],
        ['Seguridad',       form.seguridad.join(', ') || '—'],
        ['Integraciones',   form.integraciones || '—'],
      ],
      theme: 'grid',
      headStyles:  { fillColor: PURPLE, textColor: WHITE, fontSize: 8, fontStyle: 'bold' },
      bodyStyles:  { fontSize: 8, textColor: [40,30,60] },
      alternateRowStyles: { fillColor: LIGHT },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50, fillColor: [230,220,245] } },
      margin: { left: 8, right: 8 },
    });
    y = (doc as any).lastAutoTable.finalY + 10;

    sectionTitle('5. SOPORTE TÉCNICO');
    autoTable(doc, {
      startY: y,
      head: [['Tipo de Soporte', 'Detalle', 'Canal']],
      body: [
        ['Soporte correctivo', form.soporteCorrectivo, form.canalSoporte.join(', ')],
        ['Soporte consultivo', form.soporteConsultivo, form.canalSoporte.join(', ')],
        ['Capacitaciones',     form.capacitaciones,    'Videollamada'],
        ['Actualizaciones',    form.actualizaciones,   'Automático'],
      ],
      theme: 'grid',
      headStyles:  { fillColor: PURPLE, textColor: WHITE, fontSize: 8, fontStyle: 'bold' },
      bodyStyles:  { fontSize: 8, textColor: [40,30,60] },
      alternateRowStyles: { fillColor: LIGHT },
      margin: { left: 8, right: 8 },
    });
    y = (doc as any).lastAutoTable.finalY + 6;

    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...PURPLE);
    doc.text('COSTOS ADICIONALES', 12, y); y += 5;
    autoTable(doc, {
      startY: y,
      head: [['Servicio', 'Valor']],
      body: [
        ['Hora adicional soporte consultivo', fmtCOP(form.costoAdicHora) + '/hora'],
        ['Capacitación adicional',            fmtCOP(form.costoAdicCapacitacion) + '/sesión'],
        ['Soporte presencial',               fmtCOP(form.costoPresencial) + '/hora + desplazamiento'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [80,40,130] as [number,number,number], textColor: WHITE, fontSize: 8 },
      bodyStyles:  { fontSize: 8, textColor: [40,30,60] },
      margin: { left: 8, right: 8 },
    });
    y = (doc as any).lastAutoTable.finalY + 6;
    footer();

    // ── INVERSIÓN Y CRONOGRAMA ─────────────────
    doc.addPage(); pageNum++;
    header();
    sectionTitle('6. INVERSIÓN');
    autoTable(doc, {
      startY: y,
      head: [['Pago', 'Momento', 'Descripción', 'Valor']],
      body: [
        ['30%', 'Inicio del proyecto',     'Pago inicial para arrancar',             fmtCOP(form.pago30)],
        ['20%', 'Entrega parcial (Sem. 2)','Avance con módulos funcionando',          fmtCOP(form.pago20)],
        ['50%', 'Entrega final',           'Sistema completo, capacitado y en prod.', fmtCOP(form.pago50)],
        ['100%','TOTAL IMPLEMENTACIÓN',    '',                                         fmtCOP(form.valorImplementacion)],
      ],
      theme: 'grid',
      headStyles:  { fillColor: PURPLE, textColor: WHITE, fontSize: 8, fontStyle: 'bold' },
      bodyStyles:  { fontSize: 8, textColor: [40,30,60] },
      alternateRowStyles: { fillColor: LIGHT },
      columnStyles: { 0: { fontStyle:'bold', halign:'center', cellWidth: 14 }, 3: { fontStyle:'bold' } },
      margin: { left: 8, right: 8 },
    });
    y = (doc as any).lastAutoTable.finalY + 6;

    autoTable(doc, {
      startY: y,
      head: [['Concepto', 'Valor']],
      body: [
        ['Suscripción mensual', fmtCOP(form.valorMensual) + ' / mes'],
        ['Suscripción anual',   fmtCOP(form.valorAnual)  + ' / año'],
        ['Forma de pago',       form.formaPago],
      ],
      theme: 'grid',
      headStyles:  { fillColor: [80,40,130] as [number,number,number], textColor: WHITE, fontSize: 8 },
      bodyStyles:  { fontSize: 8, textColor: [40,30,60] },
      margin: { left: 8, right: 8 },
    });
    y = (doc as any).lastAutoTable.finalY + 10;

    sectionTitle('7. CRONOGRAMA');
    autoTable(doc, {
      startY: y,
      head: [['Período', 'Actividad', 'Entregable']],
      body: form.fases.map(f => [f.periodo, f.actividad || '—', f.entregable || '—']),
      theme: 'striped',
      headStyles:  { fillColor: PURPLE, textColor: WHITE, fontSize: 8, fontStyle: 'bold' },
      bodyStyles:  { fontSize: 8, textColor: [40,30,60] },
      alternateRowStyles: { fillColor: LIGHT },
      columnStyles: { 0: { cellWidth: 38, fontStyle: 'bold' } },
      margin: { left: 8, right: 8 },
    });
    footer();

    doc.save(`Requerimientos_${form.refNum}_${form.razonSocial.replace(/\s+/g, '_') || 'Cliente'}.pdf`);
  };

  // ══════════════════════════════════════════
  //  PDF #2 — PROPUESTA COMERCIAL
  //  (Idéntica en estructura a GestorPro)
  // ══════════════════════════════════════════
  const generarPDFPropuesta = async () => {
    const jsPDF     = (await import('jspdf')).default;
    const autoTable = (await import('jspdf-autotable')).default;

    const doc    = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pw     = doc.internal.pageSize.width;
    const ph     = doc.internal.pageSize.height;
    let   y      = 0;
    let   pageNum = 1;

    const PURPLE  = [123, 47, 190]  as [number,number,number];
    const PINK    = [233, 30, 140]  as [number,number,number];
    const DARK    = [15, 10, 26]    as [number,number,number];
    const LGRAY   = [245, 242, 252] as [number,number,number];
    const MGRAY   = [220, 210, 240] as [number,number,number];
    const TEXTD   = [30, 20, 50]    as [number,number,number];
    const WHITE   = [255,255,255]   as [number,number,number];
    const MUTED   = [120, 100, 150] as [number,number,number];

    // ─── HEADER function ──────────────────────
    const addHeader = () => {
      // Logo
      try { doc.addImage('/logopdf.png', 'PNG', 10, 6, 28, 28); } catch {}

      // Nombre del sistema + subtítulo
      doc.setTextColor(...PURPLE);
      doc.setFontSize(18); doc.setFont('helvetica', 'bold');
      doc.text(form.nombreSistema || 'Sistema a Medida', 42, 14);
      doc.setFontSize(8.5); doc.setFont('helvetica', 'normal');
      doc.setTextColor(...MUTED);
      doc.text('Sistema de Gestión Empresarial en la Nube', 42, 20);
      doc.setFontSize(7.5);
      doc.text(`Paula Abad  ·  paulabad.tech  ·  ${(form.nombreSistema || 'sistema').toLowerCase().replace(/\s+/g, '')}.paulabad.tech`, 42, 26);

      // PROPUESTA COMERCIAL badge — derecha
      doc.setFontSize(8); doc.setFont('helvetica', 'bold');
      doc.setTextColor(...PURPLE);
      doc.text('PROPUESTA COMERCIAL', pw - 12, 11, { align: 'right' });
      doc.setFontSize(8); doc.setFont('helvetica', 'normal');
      doc.setTextColor(...MUTED);
      doc.text(`Ref: ${form.refNum}`, pw - 12, 17, { align: 'right' });
      doc.text(`Fecha: ${new Date().toLocaleDateString('es-CO', { day:'2-digit', month:'short', year:'numeric' })}`, pw - 12, 22, { align: 'right' });
      doc.text(`Válida por: ${form.vigencia}`, pw - 12, 27, { align: 'right' });

      // Línea separadora
      doc.setDrawColor(...PURPLE);
      doc.setLineWidth(0.6);
      doc.line(10, 36, pw - 10, 36);

      y = 42;
    };

    // ─── FOOTER function ──────────────────────
    const addFooter = () => {
      doc.setDrawColor(...MGRAY);
      doc.setLineWidth(0.3);
      doc.line(10, ph - 14, pw - 10, ph - 14);
      doc.setFontSize(7); doc.setFont('helvetica', 'normal');
      doc.setTextColor(...MUTED);
      doc.text('paulabad.tech  ·  gestorpro.paulabad.tech', pw / 2, ph - 9, { align: 'center' });
      doc.text(`Ref: ${form.refNum}`, pw / 2, ph - 5, { align: 'center' });
      doc.setTextColor(...PURPLE);
      doc.text(`Página ${pageNum}`, pw - 12, ph - 5, { align: 'right' });
    };

    const newPage = () => {
      addFooter();
      doc.addPage();
      pageNum++;
      addHeader();
    };

    const checkY = (need: number) => { if (y + need > ph - 20) newPage(); };

    const sectionH = (text: string) => {
      checkY(14);
      doc.setFontSize(12); doc.setFont('helvetica', 'bold');
      doc.setTextColor(...PURPLE);
      doc.text(text, 10, y);
      doc.setDrawColor(...PURPLE);
      doc.setLineWidth(0.4);
      doc.line(10, y + 2, pw - 10, y + 2);
      y += 10;
    };

    const subH = (text: string) => {
      checkY(10);
      doc.setFontSize(10); doc.setFont('helvetica', 'bold');
      doc.setTextColor(...TEXTD);
      doc.text(text, 10, y);
      y += 6;
    };

    const bodyText = (text: string, indent = 10) => {
      checkY(8);
      doc.setFontSize(9); doc.setFont('helvetica', 'normal');
      doc.setTextColor(...TEXTD);
      const lines = doc.splitTextToSize(text, pw - indent - 10);
      doc.text(lines, indent, y);
      y += lines.length * 5 + 2;
    };

    // ═══ PÁGINA 1 ═══════════════════════════
    addHeader();

    // Tabla de identificación — exactamente como GestorPro
    autoTable(doc, {
      startY: y,
      head: [['Cliente', 'Empresa', 'Solución', 'Modalidad']],
      body: [[
        form.razonSocial || '—',
        form.industriaDetalle || form.industria || '—',
        `${form.nombreSistema || 'Sistema'} — ${form.planComercial}`,
        `${form.modalidadEntrega}`,
      ]],
      theme: 'grid',
      headStyles:  { fillColor: PURPLE, textColor: WHITE, fontSize: 8.5, fontStyle: 'bold' },
      bodyStyles:  { fontSize: 8.5, textColor: TEXTD },
      alternateRowStyles: { fillColor: LGRAY },
      margin: { left: 10, right: 10 },
    });
    y = (doc as any).lastAutoTable.finalY + 10;

    // 1. Resumen Ejecutivo
    sectionH('1. Resumen Ejecutivo');
    const resumenParrafo1 = `${form.nombreSistema || 'El sistema'} es una solución de gestión empresarial 100% en la nube, desarrollada a medida para cubrir las necesidades operativas específicas de ${form.razonSocial || 'la empresa cliente'}.${form.sistemasActuales ? ` La plataforma complementa ${form.sistemasActuales}, resolviendo los procesos que actualmente se llevan de forma manual.` : ''}`;
    bodyText(resumenParrafo1);

    const resumenParrafo2 = `El servicio se entrega bajo modalidad ${form.modalidadEntrega}, lo que significa que el cliente paga una suscripción anual por el acceso a la plataforma, sin necesidad de servidores propios, instalaciones ni licencias perpetuas. Todos los datos se almacenan de forma segura en la nube con respaldo automático diario.`;
    bodyText(resumenParrafo2);
    y += 4;

    // 2. Módulos del Sistema
    sectionH('2. Módulos del Sistema');

    form.modulos.forEach((mod, mi) => {
      checkY(16);
      subH(`Módulo ${mi + 1} — ${mod.titulo || 'Sin título'}`);
      if (mod.descripcion) { bodyText(mod.descripcion); }

      if (mod.funcionalidades.some(f => f.nombre)) {
        autoTable(doc, {
          startY: y,
          head: [['Funcionalidad', 'Descripción']],
          body: mod.funcionalidades
            .filter(f => f.nombre)
            .map(f => [f.nombre, f.descripcion || '—']),
          theme: 'striped',
          headStyles:  { fillColor: PURPLE, textColor: WHITE, fontSize: 8, fontStyle: 'bold' },
          bodyStyles:  { fontSize: 8, textColor: TEXTD },
          alternateRowStyles: { fillColor: LGRAY },
          columnStyles: { 0: { fontStyle: 'bold', textColor: PURPLE, cellWidth: 60 } },
          margin: { left: 10, right: 10 },
        });
        y = (doc as any).lastAutoTable.finalY + 8;
      }
    });

    // ═══ PÁGINA SIGUIENTE ═══════════════════
    newPage();

    // 3. Infraestructura y Tecnología
    sectionH('3. Infraestructura y Tecnología');
    autoTable(doc, {
      startY: y,
      head: [['Componente', 'Tecnología', 'Característica']],
      body: [
        ['Plataforma',    form.plataforma,    'Sin instalaciones ni servidores propios'],
        ['Acceso',        form.acceso.join(' + ') || 'Web', 'Desde cualquier dispositivo con internet'],
        ['Base de datos', form.baseDatos,     'Respaldo automático diario'],
        ['Seguridad',     'SSL / HTTPS',       'Datos cifrados en tránsito y en reposo'],
        ['Disponibilidad',form.disponibilidad,'Monitoreo continuo del servicio'],
        ['Usuarios',      form.numUsuarios || form.cantidadUsuarios || '—', 'Con roles y permisos diferenciados'],
        ['Integración',   'API REST',          form.integraciones || 'Compatible con sistemas existentes'],
      ],
      theme: 'striped',
      headStyles:  { fillColor: PURPLE, textColor: WHITE, fontSize: 8, fontStyle: 'bold' },
      bodyStyles:  { fontSize: 8, textColor: TEXTD },
      alternateRowStyles: { fillColor: LGRAY },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 38 } },
      margin: { left: 10, right: 10 },
    });
    y = (doc as any).lastAutoTable.finalY + 10;

    // 4. Soporte Técnico
    sectionH('4. Soporte Técnico Incluido');
    autoTable(doc, {
      startY: y,
      head: [['Tipo de Soporte', 'Límite incluido', 'Canal', 'Tiempo respuesta']],
      body: [
        ['Soporte correctivo\n(errores del sistema)', form.soporteCorrectivo, form.canalSoporte.join(' / '), 'Máx. 4 horas hábiles'],
        ['Soporte consultivo\n(uso del sistema)',     form.soporteConsultivo, form.canalSoporte.join(' / '), 'Máx. 24 horas hábiles'],
        ['Capacitación usuarios',                     form.capacitaciones,    'Videollamada',               'A convenir'],
        ['Actualizaciones del sistema',               form.actualizaciones,   'Automático',                 'Sin interrupción'],
        ['Respaldo de datos',                         'Diario automático',    'Nube',                       'Continuo'],
      ],
      theme: 'striped',
      headStyles:  { fillColor: PURPLE, textColor: WHITE, fontSize: 7.5, fontStyle: 'bold' },
      bodyStyles:  { fontSize: 7.5, textColor: TEXTD },
      alternateRowStyles: { fillColor: LGRAY },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 42 } },
      margin: { left: 10, right: 10 },
    });
    y = (doc as any).lastAutoTable.finalY + 6;

    // Horario
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...PURPLE);
    doc.text('Horario de atención', 10, y); y += 5;
    doc.setFont('helvetica', 'normal'); doc.setTextColor(...TEXTD);
    form.horarioAtencion.split('\n').forEach(line => {
      doc.text(line, 12, y); y += 5;
    });
    y += 4;

    // Servicios adicionales
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...PURPLE);
    doc.text('Servicios con costo adicional', 10, y); y += 5;
    doc.setFont('helvetica', 'normal'); doc.setTextColor(...TEXTD);
    doc.text(`· Hora adicional de soporte consultivo: ${fmtCOP(form.costoAdicHora)}/hora`, 12, y); y += 5;
    doc.text(`· Capacitación adicional de usuarios: ${fmtCOP(form.costoAdicCapacitacion)}/sesión`, 12, y); y += 5;
    doc.text('· Nuevas funcionalidades o módulos: Cotización aparte', 12, y); y += 5;
    doc.text(`· Soporte presencial en sitio: ${fmtCOP(form.costoPresencial)}/hora + desplazamiento`, 12, y); y += 8;

    // ═══ PÁGINA INVERSIÓN ═══════════════════
    newPage();

    // 5. Inversión
    sectionH('5. Inversión');

    // 5.1 Implementación
    doc.setFontSize(10); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...TEXTD);
    doc.text('5.1 Implementación Inicial (pago único)', 10, y); y += 5;
    bodyText(`Incluye la configuración del sistema, parametrización según la operación de la empresa, carga de datos maestros, personalización de módulos y capacitación completa a ${form.cantidadUsuarios || 'los'} usuarios. Todo el proceso se realiza en las ${form.diasTotales || '15'} días establecidas de implementación.`);
    y += 2;

    autoTable(doc, {
      startY: y,
      head: [['Servicio', 'Valor']],
      body: [[
        `Implementación completa del sistema ${form.nombreSistema || ''}\n(Configuración, parametrización, carga de datos, personalización y capacitación)`,
        fmtCOP(form.valorImplementacion),
      ]],
      theme: 'grid',
      headStyles:  { fillColor: PURPLE, textColor: WHITE, fontSize: 8 },
      bodyStyles:  { fontSize: 8.5, textColor: TEXTD },
      margin: { left: 10, right: 10 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;

    // 5.2 Suscripción anual
    doc.setFontSize(10); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...TEXTD);
    doc.text('5.2 Suscripción Anual', 10, y); y += 6;
    autoTable(doc, {
      startY: y,
      head: [['Plan Anual', '']],
      body: [
        [`Suscripción ${form.nombreSistema || ''}\n(${form.cantidadUsuarios || '—'} usuarios — todos los módulos incluidos)`,
         `${fmtCOP(form.valorMensual)} / mes\n${fmtCOP(form.valorAnual)} / año`],
        ['Soporte técnico incluido',       form.soporteConsultivo],
        ['Actualizaciones del sistema',    'Incluidas sin costo adicional'],
        ['Respaldo diario en la nube',     'Incluido'],
        ['Forma de pago',                  form.formaPago],
      ],
      theme: 'grid',
      headStyles:  { fillColor: PURPLE, textColor: WHITE, fontSize: 8 },
      bodyStyles:  { fontSize: 8, textColor: TEXTD },
      alternateRowStyles: { fillColor: LGRAY },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 85 } },
      margin: { left: 10, right: 10 },
    });
    y = (doc as any).lastAutoTable.finalY + 4;

    // Nota IPC
    doc.setFontSize(7.5); doc.setFont('helvetica', 'italic');
    doc.setTextColor(...MUTED);
    doc.text('* El valor de la suscripción anual se actualiza cada año de renovación conforme al IPC certificado por el DANE.', 10, y);
    y += 10;

    // ═══ FORMA DE PAGO ═══════════════════════
    sectionH('6. Forma de Pago');
    bodyText('El valor total de la implementación se distribuye en tres pagos vinculados al avance del proyecto, garantizando el cumplimiento de entregables en cada etapa:');
    y += 2;

    autoTable(doc, {
      startY: y,
      head: [['Pago', 'Momento', 'Descripción', 'Valor']],
      body: [
        ['30%', 'Inicio del proyecto',      'Pago inicial para arrancar la configuración y desarrollo del sistema.', fmtCOP(form.pago30)],
        ['20%', 'Segunda semana\n(entrega parcial)', 'Presentación del avance del sistema con los módulos en funcionamiento para revisión.', fmtCOP(form.pago20)],
        ['50%', 'Entrega final\ndel proyecto', 'Pago contra entrega del sistema completo, capacitado y en producción.', fmtCOP(form.pago50)],
        ['100%','','TOTAL IMPLEMENTACIÓN',   fmtCOP(form.valorImplementacion)],
      ],
      theme: 'grid',
      headStyles:  { fillColor: PURPLE, textColor: WHITE, fontSize: 8, fontStyle: 'bold' },
      bodyStyles:  { fontSize: 7.5, textColor: TEXTD },
      alternateRowStyles: { fillColor: LGRAY },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 12, halign: 'center', textColor: PURPLE },
        3: { fontStyle: 'bold', cellWidth: 28 },
      },
      margin: { left: 10, right: 10 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;

    // Datos bancarios — exactamente como GestorPro
    checkY(50);
    const bxL = 10, bxW = (pw - 20) / 2 - 4, bxH = 44;
    doc.setFillColor(...LGRAY);
    doc.roundedRect(bxL, y, bxW, bxH, 2, 2, 'F');
    doc.setDrawColor(...PURPLE);
    doc.roundedRect(bxL, y, bxW, bxH, 2, 2, 'S');

    doc.setFontSize(8.5); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...PURPLE);
    doc.text('Datos para el pago — Anticipo', bxL + 5, y + 7);
    const bankData = [
      `Banco: ${form.banco}`,
      `Tipo de cuenta: ${form.tipoCuenta}`,
      `Número de cuenta: ${form.numeroCuenta}`,
      `Titular: ${form.titular}`,
      `Cédula: ${form.cedula}`,
    ];
    doc.setFontSize(8); doc.setFont('helvetica', 'normal');
    doc.setTextColor(...TEXTD);
    bankData.forEach((line, i) => doc.text(line, bxL + 5, y + 14 + i * 6));

    // Nota importante
    const nx = bxL + bxW + 8, nW = pw - 20 - bxW - 8;
    doc.setFillColor(240, 232, 255);
    doc.roundedRect(nx, y, nW, bxH, 2, 2, 'F');
    doc.setDrawColor(...PURPLE);
    doc.roundedRect(nx, y, nW, bxH, 2, 2, 'S');
    doc.setFontSize(8.5); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...PURPLE);
    doc.text('Importante', nx + 5, y + 7);
    doc.setFontSize(7.5); doc.setFont('helvetica', 'normal');
    doc.setTextColor(...TEXTD);
    const importanteText = doc.splitTextToSize(
      `Una vez realizado el pago del anticipo (30%), favor enviar el comprobante de transferencia al WhatsApp o email de contacto. El cronograma de implementación inicia a partir de la confirmación de recibo del anticipo.`,
      nW - 10
    );
    importanteText.forEach((l: string, i: number) => doc.text(l, nx + 5, y + 14 + i * 5));
    y += bxH + 10;

    // ═══ CRONOGRAMA ═══════════════════════════
    newPage();
    sectionH('7. Cronograma de Implementación');
    bodyText(`El proyecto se ejecuta en un plazo de ${form.diasTotales || '15'} días calendario, contados a partir de la fecha de confirmación de recibo del anticipo (30% inicial). El cronograma es el siguiente:`);
    y += 2;

    autoTable(doc, {
      startY: y,
      head: [['Período', 'Actividad', 'Entregable']],
      body: form.fases.map(f => [f.periodo, f.actividad || '—', f.entregable || '—']),
      theme: 'striped',
      headStyles:  { fillColor: PURPLE, textColor: WHITE, fontSize: 8.5, fontStyle: 'bold' },
      bodyStyles:  { fontSize: 8, textColor: TEXTD },
      alternateRowStyles: { fillColor: LGRAY },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 38 } },
      margin: { left: 10, right: 10 },
    });
    y = (doc as any).lastAutoTable.finalY + 10;

    // ═══ CONDICIONES DEL SERVICIO ═════════════
    sectionH('8. Condiciones del Servicio');
    const condiciones = [
      ['Propiedad del software', `${form.nombreSistema || 'El sistema'} es propiedad exclusiva de paulabad.tech. El cliente adquiere el derecho de uso de la plataforma bajo la modalidad de suscripción; esto no implica transferencia de propiedad intelectual ni acceso al código fuente del sistema.`],
      ['Propiedad de los datos', 'Toda la información ingresada al sistema pertenece exclusivamente al cliente. El cliente puede exportar sus datos en formatos estándar (Excel/CSV) en cualquier momento durante la vigencia del contrato.'],
      ['Suspensión por no pago', 'El acceso al sistema se suspenderá automáticamente a los 5 días hábiles de vencimiento de la suscripción sin que se haya efectuado el pago correspondiente. Los datos se conservarán por 30 días adicionales antes de ser eliminados.'],
      ['Confidencialidad', 'Toda la información del cliente se maneja con estricta confidencialidad. paulabad.tech se compromete a no divulgar, ceder ni utilizar los datos del cliente para ningún fin diferente a la prestación del servicio, conforme a la Ley 1581 de 2012 de Protección de Datos Personales.'],
      ['Vigencia de la propuesta', `Esta propuesta comercial tiene una validez de ${form.vigencia} contados a partir de la fecha de emisión. Transcurrido este plazo, los valores podrán ser actualizados.`],
      ['Condiciones de pago', 'La implementación se factura en tres pagos según el avance del proyecto (30% inicio / 20% entrega parcial / 50% entrega final). La suscripción anual se paga de forma anticipada al inicio de cada período. Los precios incluyen IVA.'],
    ];

    autoTable(doc, {
      startY: y,
      body: condiciones,
      theme: 'grid',
      bodyStyles:  { fontSize: 7.5, textColor: TEXTD },
      columnStyles: {
        0: { fontStyle: 'bold', textColor: PURPLE, cellWidth: 45 },
      },
      margin: { left: 10, right: 10 },
    });
    y = (doc as any).lastAutoTable.finalY + 10;

    // ═══ PÁGINA FINAL — FIRMA ═════════════════
    checkY(70);

    // Firma del desarrollador
    doc.setFontSize(10); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...TEXTD);
    doc.text('Paula Andrea Abad', 10, y);
    doc.setFontSize(8); doc.setFont('helvetica', 'normal');
    doc.setTextColor(...MUTED);
    doc.text('Senior Software Developer & Consultora', 10, y + 6);
    doc.text(`paulabad.tech  ·  ${(form.nombreSistema || 'sistema').toLowerCase().replace(/\s+/g, '')}.paulabad.tech`, 10, y + 12);
    doc.text('C.C. 42.118.637', 10, y + 18);
    y += 28;

    // Bloque aceptación
    doc.setFillColor(...LGRAY);
    doc.roundedRect(10, y, pw - 20, 40, 2, 2, 'F');
    doc.setDrawColor(...PURPLE);
    doc.roundedRect(10, y, pw - 20, 40, 2, 2, 'S');
    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...PURPLE);
    doc.text('Aceptación de la propuesta', 15, y + 8);
    doc.setFontSize(8.5); doc.setFont('helvetica', 'normal');
    doc.setTextColor(...TEXTD);
    const signFields = ['Nombre: ___________________________________', 'Cargo: ____________________________________', 'Firma: ____________________________________', 'Fecha: ____________________________________'];
    const half = Math.ceil(signFields.length / 2);
    signFields.forEach((f, i) => {
      const col = i < half ? 0 : 1;
      const row = i < half ? i : i - half;
      doc.text(f, 15 + col * 95, y + 18 + row * 9);
    });
    y += 50;

    // Nota final
    doc.setFontSize(7.5); doc.setFont('helvetica', 'italic');
    doc.setTextColor(...MUTED);
    const notaFinal = `Esta propuesta fue elaborada con base en la información recopilada durante la reunión inicial. Los valores pueden ajustarse según los requerimientos adicionales que surjan en la visita de observación. ${form.nombreSistema || 'El sistema'} es un servicio 100% en la nube — no requiere instalaciones ni infraestructura propia del cliente. Todos los precios incluyen IVA.`;
    const notaLines = doc.splitTextToSize(notaFinal, pw - 20);
    doc.text(notaLines, 10, y);
    y += notaLines.length * 5 + 6;

    doc.setFontSize(8); doc.setFont('helvetica', 'normal');
    doc.setTextColor(...PURPLE);
    doc.text(`paulabad.tech  ·  ${(form.nombreSistema || 'sistema').toLowerCase().replace(/\s+/g, '')}.paulabad.tech  ·  Ref: ${form.refNum}`, pw / 2, y, { align: 'center' });

    addFooter();

    doc.save(`Propuesta_${form.refNum}_${form.razonSocial.replace(/\s+/g, '_') || 'Cliente'}.pdf`);
  };

  // ══════════════════════════════════════════
  //  LOCK SCREEN
  // ══════════════════════════════════════════
  if (locked) {
    return (
      <div className="rq-root">
        <div className="rq-mesh" />
        <div className="rq-lock">
          <div className="rq-lock-bg" />
          <div className="rq-lock-card">
            <div className="rq-lock-logo">
              <img src="/logopdf.png" alt="Paula Abad" />
            </div>
            <div className="rq-lock-title">paulabad.tech</div>
            <div className="rq-lock-sub">Área Privada · Requerimientos de Software</div>

            <div className="rq-lock-wrap">
              <input
                className="rq-lock-input"
                type={showPwd ? 'text' : 'password'}
                placeholder="Contraseña de acceso"
                value={pwd}
                onChange={e => { setPwd(e.target.value); setPwdError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                autoFocus
              />
              <button
                className="rq-lock-eye"
                onClick={() => setShowPwd(s => !s)}
                type="button"
              >
                {showPwd ? '🙈' : '👁'}
              </button>
            </div>

            <button
              className="rq-btn-next"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={handleLogin}
            >
              Entrar
            </button>

            {pwdError && <div className="rq-lock-error">{pwdError}</div>}
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════
  //  MAIN APP
  // ══════════════════════════════════════════
  return (
    <div className="rq-root">
      <div className="rq-mesh" />

      {/* ── TOPBAR ── */}
      <header className="rq-topbar">
        <div className="rq-brand">
          <div className="rq-brand-logo">
            <img src="/logopdf.png" alt="Paula Abad" />
          </div>
          <div className="rq-brand-name">
            paula<span>abad</span>.tech
          </div>
        </div>
        <div className="rq-topbar-right">
          <div className="rq-ref">Ref: <strong>{refNum}</strong></div>
          <div className="rq-date">{today}</div>
          <button className="rq-btn-exit" onClick={() => setLocked(true)}>
            🔒 Salir
          </button>
        </div>
      </header>

      {/* ── LAYOUT ── */}
      <div className="rq-layout">

        {/* ── SIDEBAR ── */}
        <aside className="rq-sidebar">
          <div className="rq-sb-title">Secciones</div>

          {STEPS.map((s, i) => {
            const n = i + 1;
            const isActive = step === n;
            const isDone   = done.includes(n) && !isActive;
            return (
              <div
                key={n}
                className={`rq-step${isActive ? ' active' : ''}${isDone ? ' done' : ''}`}
                onClick={() => goStep(n)}
              >
                <div className="rq-step-num">
                  {isDone ? '✓' : n}
                </div>
                <div>
                  <div className="rq-step-label">{s.label}</div>
                  <div className="rq-step-desc">{s.desc}</div>
                </div>
              </div>
            );
          })}

          <div className="rq-sb-divider" />
          <div className="rq-prog-label">
            <span>Progreso</span>
            <span>{pct}%</span>
          </div>
          <div className="rq-prog-bar">
            <div className="rq-prog-fill" style={{ width: `${pct}%` }} />
          </div>
        </aside>

        {/* ── CONTENT ── */}
        <main className="rq-content">

          {/* ════════════════════════════════════
              SECCIÓN 1 — DATOS DEL CLIENTE
          ════════════════════════════════════ */}
          {step === 1 && (
            <div className="rq-section">
              <div className="rq-tag">Paso 1 de 7</div>
              <h1 className="rq-title">Datos del Cliente</h1>
              <p className="rq-sub">
                Información básica de la empresa, el contacto principal y los datos de la propuesta.
              </p>

              {/* Empresa */}
              <div className="rq-card">
                <div className="rq-card-title">🏢 Información de la Empresa</div>
                <div className="rq-g2">
                  <Field label="Razón social" req>
                    <input className="rq-input" value={form.razonSocial}
                      onChange={e => set('razonSocial', e.target.value)}
                      placeholder="Cítricos 4R SAS" />
                  </Field>
                  <Field label="NIT / Cédula">
                    <input className="rq-input" value={form.nit}
                      onChange={e => set('nit', e.target.value)}
                      placeholder="900.123.456-7" />
                  </Field>
                  <Field label="Industria / Sector" req>
                    <select className="rq-select" value={form.industria}
                      onChange={e => set('industria', e.target.value)}>
                      <option value="">— Selecciona —</option>
                      {[
                        'Agricultura y distribución','Comercio y retail',
                        'Salud y clínicas','Educación','Inmobiliaria',
                        'IoT / Manufactura','Servicios profesionales',
                        'Restaurantes y food','Logística y transporte',
                        'Tecnología','Otro',
                      ].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="Descripción del sector">
                    <input className="rq-input" value={form.industriaDetalle}
                      onChange={e => set('industriaDetalle', e.target.value)}
                      placeholder="ej. Distribución de cítricos a supermercados" />
                  </Field>
                  <Field label="Ciudad">
                    <input className="rq-input" value={form.ciudad}
                      onChange={e => set('ciudad', e.target.value)}
                      placeholder="Pereira, Risaralda" />
                  </Field>
                  <Field label="País">
                    <input className="rq-input" value={form.pais}
                      onChange={e => set('pais', e.target.value)} />
                  </Field>
                  <div className="rq-s2">
                    <Field label="Web / Redes sociales">
                      <input className="rq-input" value={form.webCliente}
                        onChange={e => set('webCliente', e.target.value)}
                        placeholder="www.empresa.com · @empresa" />
                    </Field>
                  </div>
                </div>
              </div>

              {/* Contacto */}
              <div className="rq-card">
                <div className="rq-card-title">👤 Contacto Principal</div>
                <div className="rq-g2">
                  <Field label="Nombre completo" req>
                    <input className="rq-input" value={form.contactoNombre}
                      onChange={e => set('contactoNombre', e.target.value)}
                      placeholder="Nombre del decisor" />
                  </Field>
                  <Field label="Cargo / Rol">
                    <input className="rq-input" value={form.contactoCargo}
                      onChange={e => set('contactoCargo', e.target.value)}
                      placeholder="Gerente General / Dueño" />
                  </Field>
                  <Field label="Correo electrónico" req>
                    <input className="rq-input" type="email" value={form.contactoEmail}
                      onChange={e => set('contactoEmail', e.target.value)}
                      placeholder="contacto@empresa.com" />
                  </Field>
                  <Field label="WhatsApp / Teléfono">
                    <input className="rq-input" type="tel" value={form.contactoTel}
                      onChange={e => set('contactoTel', e.target.value)}
                      placeholder="+57 300 000 0000" />
                  </Field>
                </div>
              </div>

              {/* Propuesta */}
              <div className="rq-card">
                <div className="rq-card-title">📋 Datos de la Propuesta</div>
                <div className="rq-g3">
                  <Field label="Fecha de reunión">
                    <input className="rq-input" type="date" value={form.fechaReunion}
                      onChange={e => set('fechaReunion', e.target.value)} />
                  </Field>
                  <Field label="Nombre del sistema" req>
                    <input className="rq-input" value={form.nombreSistema}
                      onChange={e => set('nombreSistema', e.target.value)}
                      placeholder="GestorPro, ClinicApp…" />
                  </Field>
                  <Field label="Plan comercial">
                    <select className="rq-select" value={form.planComercial}
                      onChange={e => set('planComercial', e.target.value)}>
                      {['Plan Esencial','Plan Profesional','Plan Empresarial','A medida']
                        .map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="Modalidad de entrega">
                    <select className="rq-select" value={form.modalidadEntrega}
                      onChange={e => set('modalidadEntrega', e.target.value)}>
                      {['SaaS — Suscripción anual','Licencia perpetua',
                        'Desarrollo a medida (pago único)','Híbrido']
                        .map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="Vigencia de propuesta">
                    <select className="rq-select" value={form.vigencia}
                      onChange={e => set('vigencia', e.target.value)}>
                      {['30 días','15 días','45 días','60 días']
                        .map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="N° de referencia" hint="Generado automáticamente">
                    <input className="rq-input" value={form.refNum} readOnly
                      style={{ opacity: 0.5, cursor: 'not-allowed' }} />
                  </Field>
                  <div className="rq-s3">
                    <Field label="Descripción corta del cliente (para resumen ejecutivo)" req>
                      <textarea className="rq-textarea" rows={3} value={form.descCliente}
                        onChange={e => set('descCliente', e.target.value)}
                        placeholder="ej: empresa familiar dedicada a la distribución de cítricos frescos a supermercados de la región…" />
                    </Field>
                  </div>
                  <div className="rq-s3">
                    <Field label="Sistemas actuales que usa el cliente">
                      <input className="rq-input" value={form.sistemasActuales}
                        onChange={e => set('sistemasActuales', e.target.value)}
                        placeholder="ej: Siigo (facturación), Excel para inventarios, cuadernos…" />
                    </Field>
                  </div>
                </div>
              </div>

              <div className="rq-footer">
                <div />
                <button className="rq-btn-next" onClick={() => goStep(2)}>
                  Continuar — Contexto del Proyecto
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════
              SECCIÓN 2 — CONTEXTO DEL PROYECTO
          ════════════════════════════════════ */}
          {step === 2 && (
            <div className="rq-section">
              <div className="rq-tag">Paso 2 de 7</div>
              <h1 className="rq-title">Contexto del Proyecto</h1>
              <p className="rq-sub">
                Define el problema actual, el objetivo del sistema y quiénes lo van a usar.
                Esta información alimenta el Resumen Ejecutivo de la propuesta.
              </p>

              {/* Situación actual */}
              <div className="rq-card">
                <div className="rq-card-title">⚠️ Situación Actual y Problema</div>
                <div className="rq-g1">
                  <Field label="¿Cómo llevan actualmente los procesos?" req>
                    <textarea className="rq-textarea" rows={3} value={form.procesoActual}
                      onChange={e => set('procesoActual', e.target.value)}
                      placeholder="ej: Se lleva todo en cuadernos, Excel sin fórmulas y WhatsApp. No hay control de inventario en tiempo real…" />
                  </Field>
                  <Field label="Principales dolores / problemas del negocio" req>
                    <textarea className="rq-textarea" rows={3} value={form.dolores}
                      onChange={e => set('dolores', e.target.value)}
                      placeholder="ej: Errores en cálculo de nómina, pérdidas por no saber el stock real, duplicación de trabajo, demoras en reportes…" />
                  </Field>
                  <Field label="¿Qué han intentado antes para resolver esto?">
                    <input className="rq-input" value={form.intentosPrevios}
                      onChange={e => set('intentosPrevios', e.target.value)}
                      placeholder="ej: Probaron Siigo pero no tenía lo que necesitaban, contrataron un freelance que no terminó…" />
                  </Field>
                  <Field label="Impacto principal del problema en el negocio">
                    <div className="rq-pills">
                      {['Pérdida de dinero','Pérdida de tiempo','Errores operativos',
                        'Mala experiencia al cliente','Falta de visibilidad','Todos los anteriores'
                      ].map(op => (
                        <button
                          key={op} type="button"
                          className={`rq-pill${form.impacto === op ? ' selected' : ''}`}
                          onClick={() => set('impacto', form.impacto === op ? '' : op)}
                        >
                          <span className="rq-pill-dot" />
                          {op}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
              </div>

              {/* Objetivo */}
              <div className="rq-card">
                <div className="rq-card-title">🎯 Objetivo del Sistema</div>
                <div className="rq-g1">
                  <Field label="Objetivo principal del software" req>
                    <textarea className="rq-textarea" rows={3} value={form.objetivoPrincipal}
                      onChange={e => set('objetivoPrincipal', e.target.value)}
                      placeholder="ej: Digitalizar y automatizar el control de inventario, nómina y canastillas para eliminar el uso de cuadernos y hojas de cálculo…" />
                  </Field>
                  <Field label="Resultados esperados por el cliente">
                    <textarea className="rq-textarea" rows={3} value={form.resultadosEsperados}
                      onChange={e => set('resultadosEsperados', e.target.value)}
                      placeholder="ej: Reducir errores de nómina en un 100%, tener el stock en tiempo real desde cualquier dispositivo, ahorrar 10 horas semanales de trabajo manual…" />
                  </Field>
                  <Field label="¿Qué NO incluye este proyecto? (alcance excluido)" hint="Ayuda a evitar malentendidos con el cliente">
                    <textarea className="rq-textarea" rows={2} value={form.alcanceExcluido}
                      onChange={e => set('alcanceExcluido', e.target.value)}
                      placeholder="ej: No incluye facturación electrónica (lo maneja Siigo), no incluye app móvil nativa, no incluye integración con DIAN…" />
                  </Field>
                </div>
              </div>

              {/* Usuarios */}
              <div className="rq-card">
                <div className="rq-card-title">👥 Usuarios del Sistema</div>
                <div className="rq-g2">
                  <Field label="Tipo de usuarios que usarán el sistema" req>
                    <div className="rq-pills">
                      {['Gerente / Dueño','Administrador','Contador',
                        'Supervisor de campo','Operario','Vendedor','Cliente final'
                      ].map(op => {
                        const sel = form.tipoUsuarios.includes(op);
                        return (
                          <button key={op} type="button"
                            className={`rq-pill${sel ? ' selected' : ''}`}
                            onClick={() => set('tipoUsuarios',
                              sel
                                ? form.tipoUsuarios.filter(u => u !== op)
                                : [...form.tipoUsuarios, op]
                            )}
                          >
                            <span className="rq-pill-chk">{sel ? '✓' : ''}</span>
                            {op}
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                  <div className="rq-g1" style={{ marginTop: 8 }}>
                    <Field label="Cantidad total de usuarios" req>
                      <input className="rq-input" type="number" min="1"
                        value={form.cantidadUsuarios}
                        onChange={e => set('cantidadUsuarios', e.target.value)}
                        placeholder="ej: 4" />
                    </Field>
                    <Field label="Nivel técnico de los usuarios">
                      <div className="rq-pills">
                        {['Básico — poco manejo de computador',
                          'Intermedio — usan Office y correo',
                          'Avanzado — cómodos con software'
                        ].map(op => (
                          <button key={op} type="button"
                            className={`rq-pill${form.nivelTecnico === op ? ' selected' : ''}`}
                            onClick={() => set('nivelTecnico', form.nivelTecnico === op ? '' : op)}
                          >
                            <span className="rq-pill-dot" />
                            {op}
                          </button>
                        ))}
                      </div>
                    </Field>
                  </div>
                </div>
              </div>

              <div className="rq-footer">
                <button className="rq-btn-back" onClick={() => goStep(1)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  Anterior
                </button>
                <button className="rq-btn-next" onClick={() => goStep(3)}>
                  Continuar — Módulos del Sistema
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════
              SECCIÓN 3 — MÓDULOS DEL SISTEMA
          ════════════════════════════════════ */}
          {step === 3 && (
            <div className="rq-section">
              <div className="rq-tag">Paso 3 de 7</div>
              <h1 className="rq-title">Módulos del Sistema</h1>
              <p className="rq-sub">
                Agrega cada módulo del software con sus funcionalidades. Cada fila tiene
                nombre de funcionalidad y descripción. Puedes agregar o eliminar módulos
                y funcionalidades libremente.
              </p>

              {form.modulos.map((mod, mi) => (
                <div key={mod.id} className="rq-module">

                  {/* Header del módulo */}
                  <div className="rq-module-header">
                    <div className="rq-module-num">{mi + 1}</div>
                    <input
                      className="rq-module-title-input"
                      value={mod.titulo}
                      placeholder={`Módulo ${mi + 1} — ej: Inventario de Productos`}
                      onChange={e => {
                        const mods = [...form.modulos];
                        mods[mi] = { ...mods[mi], titulo: e.target.value };
                        set('modulos', mods);
                      }}
                    />
                    {form.modulos.length > 1 && (
                      <button
                        className="rq-btn-remove"
                        onClick={() => set('modulos', form.modulos.filter((_, i) => i !== mi))}
                      >
                        Eliminar módulo
                      </button>
                    )}
                  </div>

                  {/* Descripción del módulo */}
                  <div style={{ marginBottom: 14 }}>
                    <label className="rq-label" style={{ marginBottom: 5, display: 'block' }}>
                      Descripción general del módulo
                    </label>
                    <textarea
                      className="rq-textarea"
                      rows={2}
                      value={mod.descripcion}
                      placeholder="ej: Control completo de cítricos, suministros y canastillas con trazabilidad por finca…"
                      onChange={e => {
                        const mods = [...form.modulos];
                        mods[mi] = { ...mods[mi], descripcion: e.target.value };
                        set('modulos', mods);
                      }}
                    />
                  </div>

                  {/* Header columnas funcionalidades */}
                  <div className="rq-func-row" style={{ marginBottom: 6 }}>
                    <label className="rq-label">Funcionalidad</label>
                    <label className="rq-label">Descripción</label>
                    <div />
                  </div>

                  {/* Filas de funcionalidades */}
                  {mod.funcionalidades.map((fn, fi) => (
                    <div key={fi} className="rq-func-row">
                      <input
                        className="rq-input"
                        value={fn.nombre}
                        placeholder="ej: Gestión de productos"
                        onChange={e => {
                          const mods = [...form.modulos];
                          const fns  = [...mods[mi].funcionalidades];
                          fns[fi]    = { ...fns[fi], nombre: e.target.value };
                          mods[mi]   = { ...mods[mi], funcionalidades: fns };
                          set('modulos', mods);
                        }}
                      />
                      <input
                        className="rq-input"
                        value={fn.descripcion}
                        placeholder="ej: Registro por variedad, categoría, unidad y precio"
                        onChange={e => {
                          const mods = [...form.modulos];
                          const fns  = [...mods[mi].funcionalidades];
                          fns[fi]    = { ...fns[fi], descripcion: e.target.value };
                          mods[mi]   = { ...mods[mi], funcionalidades: fns };
                          set('modulos', mods);
                        }}
                      />
                      <button
                        className="rq-btn-del-func"
                        title="Eliminar fila"
                        onClick={() => {
                          if (mod.funcionalidades.length === 1) return;
                          const mods = [...form.modulos];
                          mods[mi]   = {
                            ...mods[mi],
                            funcionalidades: mods[mi].funcionalidades.filter((_, i) => i !== fi),
                          };
                          set('modulos', mods);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  {/* Agregar fila */}
                  <button
                    className="rq-btn-add-func"
                    onClick={() => {
                      const mods = [...form.modulos];
                      mods[mi]   = {
                        ...mods[mi],
                        funcionalidades: [...mods[mi].funcionalidades, { nombre: '', descripcion: '' }],
                      };
                      set('modulos', mods);
                    }}
                  >
                    + Agregar funcionalidad
                  </button>
                </div>
              ))}

              {/* Agregar módulo */}
              <button
                className="rq-btn-add-module"
                onClick={() =>
                  set('modulos', [
                    ...form.modulos,
                    {
                      id: crypto.randomUUID(),
                      titulo: '',
                      descripcion: '',
                      funcionalidades: [{ nombre: '', descripcion: '' }],
                    },
                  ])
                }
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="16"/>
                  <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
                Agregar nuevo módulo
              </button>

              <div className="rq-footer">
                <button className="rq-btn-back" onClick={() => goStep(2)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  Anterior
                </button>
                <button className="rq-btn-next" onClick={() => goStep(4)}>
                  Continuar — Infraestructura
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════
              SECCIÓN 4 — INFRAESTRUCTURA
          ════════════════════════════════════ */}
          {step === 4 && (
            <div className="rq-section">
              <div className="rq-tag">Paso 4 de 7</div>
              <h1 className="rq-title">Infraestructura y Tecnología</h1>
              <p className="rq-sub">
                Define cómo se desplegará el sistema, desde dónde se accede y qué integraciones necesita.
              </p>

              {/* Plataforma y acceso */}
              <div className="rq-card">
                <div className="rq-card-title">☁️ Plataforma y Acceso</div>
                <div className="rq-g2">
                  <Field label="Tipo de plataforma" req>
                    <select className="rq-select" value={form.plataforma}
                      onChange={e => set('plataforma', e.target.value)}>
                      {['100% en la nube','Instalación local (on-premise)',
                        'Híbrido (nube + local)','Por definir']
                        .map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="Disponibilidad esperada">
                    <select className="rq-select" value={form.disponibilidad}
                      onChange={e => set('disponibilidad', e.target.value)}>
                      {['99.9% uptime','99% uptime','Solo horario laboral','Por definir']
                        .map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="Dispositivos de acceso" req>
                    <div className="rq-pills">
                      {['Web (navegador)','Móvil Android','Móvil iOS','Tablet','Desktop app'].map(op => {
                        const sel = form.acceso.includes(op);
                        return (
                          <button key={op} type="button"
                            className={`rq-pill${sel ? ' selected' : ''}`}
                            onClick={() => set('acceso',
                              sel ? form.acceso.filter(a => a !== op) : [...form.acceso, op]
                            )}>
                            <span className="rq-pill-chk">{sel ? '✓' : ''}</span>{op}
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                  <Field label="¿Requiere app móvil nativa?">
                    <div className="rq-pills">
                      {['Sí','No','Quizás en el futuro'].map(op => (
                        <button key={op} type="button"
                          className={`rq-pill${form.tieneApp === op ? ' selected' : ''}`}
                          onClick={() => set('tieneApp', op)}>
                          <span className="rq-pill-dot" />{op}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Número de usuarios simultáneos" req>
                    <input className="rq-input" value={form.numUsuarios}
                      onChange={e => set('numUsuarios', e.target.value)}
                      placeholder="ej: Hasta 4 usuarios" />
                  </Field>
                </div>
              </div>

              {/* Base de datos y hosting */}
              <div className="rq-card">
                <div className="rq-card-title">🗄️ Base de Datos y Hosting</div>
                <div className="rq-g2">
                  <Field label="Base de datos">
                    <select className="rq-select" value={form.baseDatos}
                      onChange={e => set('baseDatos', e.target.value)}>
                      {['SQL en la nube','PostgreSQL (Supabase)','MySQL','MongoDB',
                        'Firebase','SQL Server','Por definir']
                        .map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="Hosting / Infraestructura">
                    <select className="rq-select" value={form.hosting}
                      onChange={e => set('hosting', e.target.value)}>
                      {['Vercel + Supabase','AWS','Google Cloud','Azure',
                        'DigitalOcean','Servidor propio','Por definir']
                        .map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                </div>
              </div>

              {/* Seguridad e integraciones */}
              <div className="rq-card">
                <div className="rq-card-title">🔐 Seguridad e Integraciones</div>
                <div className="rq-g1">
                  <Field label="Características de seguridad requeridas">
                    <div className="rq-pills">
                      {['SSL / HTTPS','Cifrado en reposo','Respaldo automático diario',
                        'Roles y permisos','Autenticación 2FA','Auditoría de acciones'].map(op => {
                        const sel = form.seguridad.includes(op);
                        return (
                          <button key={op} type="button"
                            className={`rq-pill${sel ? ' selected' : ''}`}
                            onClick={() => set('seguridad',
                              sel ? form.seguridad.filter(s => s !== op) : [...form.seguridad, op]
                            )}>
                            <span className="rq-pill-chk">{sel ? '✓' : ''}</span>{op}
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                  <Field label="Integraciones con otros sistemas"
                    hint="ej: Siigo via API REST, DIAN, WhatsApp Business, Google Sheets…">
                    <textarea className="rq-textarea" rows={2} value={form.integraciones}
                      onChange={e => set('integraciones', e.target.value)}
                      placeholder="ej: Compatible con Siigo para sincronización via API REST. Sin otras integraciones en esta fase." />
                  </Field>
                </div>
              </div>

              <div className="rq-footer">
                <button className="rq-btn-back" onClick={() => goStep(3)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                  Anterior
                </button>
                <button className="rq-btn-next" onClick={() => goStep(5)}>
                  Continuar — Soporte
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════
              SECCIÓN 5 — SOPORTE
          ════════════════════════════════════ */}
          {step === 5 && (
            <div className="rq-section">
              <div className="rq-tag">Paso 5 de 7</div>
              <h1 className="rq-title">Soporte Técnico</h1>
              <p className="rq-sub">
                Define los niveles de servicio incluidos en el plan y los servicios con costo adicional.
              </p>

              {/* Soporte incluido */}
              <div className="rq-card">
                <div className="rq-card-title">✅ Soporte Incluido en el Plan</div>
                <div className="rq-g2">
                  <Field label="Soporte correctivo (errores del sistema)" req>
                    <select className="rq-select" value={form.soporteCorrectivo}
                      onChange={e => set('soporteCorrectivo', e.target.value)}>
                      {['Ilimitado','Hasta 8 horas/mes','Hasta 4 horas/mes','No incluido']
                        .map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="Soporte consultivo (uso del sistema)" req>
                    <input className="rq-input" value={form.soporteConsultivo}
                      onChange={e => set('soporteConsultivo', e.target.value)}
                      placeholder="ej: 4 horas / mes" />
                  </Field>
                  <Field label="Capacitaciones incluidas">
                    <input className="rq-input" value={form.capacitaciones}
                      onChange={e => set('capacitaciones', e.target.value)}
                      placeholder="ej: 1 sesión / mes (1 hora)" />
                  </Field>
                  <Field label="Actualizaciones del sistema">
                    <select className="rq-select" value={form.actualizaciones}
                      onChange={e => set('actualizaciones', e.target.value)}>
                      {['Ilimitadas','Solo corrección de bugs','Según cronograma','No incluidas']
                        .map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="Canales de soporte" req>
                    <div className="rq-pills">
                      {['WhatsApp','Email','Videollamada','Teléfono','Ticket online'].map(op => {
                        const sel = form.canalSoporte.includes(op);
                        return (
                          <button key={op} type="button"
                            className={`rq-pill${sel ? ' selected' : ''}`}
                            onClick={() => set('canalSoporte',
                              sel ? form.canalSoporte.filter(c => c !== op) : [...form.canalSoporte, op]
                            )}>
                            <span className="rq-pill-chk">{sel ? '✓' : ''}</span>{op}
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                  <div className="rq-s2">
                    <Field label="Horario de atención">
                      <textarea className="rq-textarea" rows={3} value={form.horarioAtencion}
                        onChange={e => set('horarioAtencion', e.target.value)} />
                    </Field>
                  </div>
                </div>
              </div>

              {/* Costos adicionales */}
              <div className="rq-card">
                <div className="rq-card-title">💰 Servicios con Costo Adicional</div>
                <div className="rq-g3">
                  <Field label="Hora adicional soporte consultivo ($)">
                    <div className="rq-price-wrap">
                      <span className="rq-price-pre">$</span>
                      <input className="rq-price-input" value={form.costoAdicHora}
                        onChange={e => set('costoAdicHora', e.target.value)}
                        placeholder="80000" />
                    </div>
                  </Field>
                  <Field label="Capacitación adicional ($)">
                    <div className="rq-price-wrap">
                      <span className="rq-price-pre">$</span>
                      <input className="rq-price-input" value={form.costoAdicCapacitacion}
                        onChange={e => set('costoAdicCapacitacion', e.target.value)}
                        placeholder="150000" />
                    </div>
                  </Field>
                  <Field label="Soporte presencial por hora ($)">
                    <div className="rq-price-wrap">
                      <span className="rq-price-pre">$</span>
                      <input className="rq-price-input" value={form.costoPresencial}
                        onChange={e => set('costoPresencial', e.target.value)}
                        placeholder="200000" />
                    </div>
                  </Field>
                </div>
              </div>

              <div className="rq-footer">
                <button className="rq-btn-back" onClick={() => goStep(4)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                  Anterior
                </button>
                <button className="rq-btn-next" onClick={() => goStep(6)}>
                  Continuar — Inversión
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════
              SECCIÓN 6 — INVERSIÓN
          ════════════════════════════════════ */}
          {step === 6 && (
            <div className="rq-section">
              <div className="rq-tag">Paso 6 de 7</div>
              <h1 className="rq-title">Inversión</h1>
              <p className="rq-sub">
                Define los valores de implementación y suscripción. Los pagos y el total anual se calculan automáticamente.
              </p>

              {/* Implementación */}
              <div className="rq-card">
                <div className="rq-card-title">🚀 Implementación Inicial (Pago Único)</div>
                <div className="rq-g2">
                  <div className="rq-s2">
                    <Field label="Valor total de implementación ($)" req
                      hint="Los pagos 30 / 20 / 50% se calculan automáticamente">
                      <div className="rq-price-wrap">
                        <span className="rq-price-pre">$</span>
                        <input className="rq-price-input" value={form.valorImplementacion}
                          onChange={e => set('valorImplementacion', e.target.value)}
                          placeholder="1500000" />
                      </div>
                    </Field>
                  </div>

                  {/* Tabla de pagos */}
                  <div className="rq-s2">
                    <div style={{
                      display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
                      gap: 0, borderRadius: 9, overflow: 'hidden',
                      border: '1px solid var(--border)',
                    }}>
                      {/* Header */}
                      {['Pago','Momento','Descripción','Valor'].map(h => (
                        <div key={h} style={{
                          background: 'var(--purple)', color: '#fff',
                          padding: '9px 12px', fontSize: 11, fontWeight: 700,
                          letterSpacing: '0.5px', textTransform: 'uppercase',
                        }}>{h}</div>
                      ))}
                      {/* Row 30% */}
                      {['30%','Inicio del proyecto','Pago inicial para arrancar',
                        `$${fmt(form.pago30)}`].map((c,i) => (
                        <div key={i} style={{ padding: '9px 12px', fontSize: 12.5,
                          color: i === 0 ? 'var(--purple2)' : 'var(--text)',
                          fontWeight: i === 0 ? 700 : 400,
                          borderTop: '1px solid var(--border)',
                          background: 'var(--input-bg)' }}>{c}</div>
                      ))}
                      {/* Row 20% */}
                      {['20%','Entrega parcial (Semana 2)','Avance con módulos funcionando',
                        `$${fmt(form.pago20)}`].map((c,i) => (
                        <div key={i} style={{ padding: '9px 12px', fontSize: 12.5,
                          color: i === 0 ? 'var(--purple2)' : 'var(--text)',
                          fontWeight: i === 0 ? 700 : 400,
                          borderTop: '1px solid var(--border)',
                          background: 'rgba(26,16,40,0.4)' }}>{c}</div>
                      ))}
                      {/* Row 50% */}
                      {['50%','Entrega final','Sistema completo, capacitado y en producción',
                        `$${fmt(form.pago50)}`].map((c,i) => (
                        <div key={i} style={{ padding: '9px 12px', fontSize: 12.5,
                          color: i === 0 ? 'var(--purple2)' : 'var(--text)',
                          fontWeight: i === 0 ? 700 : 400,
                          borderTop: '1px solid var(--border)',
                          background: 'var(--input-bg)' }}>{c}</div>
                      ))}
                      {/* Total */}
                      {['100%','TOTAL','',
                        `$${fmt(form.valorImplementacion)}`].map((c,i) => (
                        <div key={i} style={{ padding: '9px 12px', fontSize: 13,
                          color: '#fff', fontWeight: 700,
                          borderTop: '1px solid var(--border)',
                          background: 'rgba(123,47,190,0.2)' }}>{c}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Suscripción anual */}
              <div className="rq-card">
                <div className="rq-card-title">📅 Suscripción Anual</div>
                <div className="rq-g3">
                  <Field label="Valor mensual ($)" req
                    hint="El valor anual se calcula automáticamente">
                    <div className="rq-price-wrap">
                      <span className="rq-price-pre">$</span>
                      <input className="rq-price-input" value={form.valorMensual}
                        onChange={e => set('valorMensual', e.target.value)}
                        placeholder="400000" />
                    </div>
                  </Field>
                  <Field label="Valor anual ($)" hint="= mensual × 12">
                    <div className="rq-price-wrap">
                      <span className="rq-price-pre">$</span>
                      <input className="rq-price-input" value={form.valorAnual} readOnly
                        style={{ opacity: 0.6, cursor: 'not-allowed' }}
                        placeholder="Automático" />
                    </div>
                  </Field>
                  <Field label="Forma de pago">
                    <select className="rq-select" value={form.formaPago}
                      onChange={e => set('formaPago', e.target.value)}>
                      {['Pago anual anticipado','Pago mensual','Pago semestral',
                        'Cuotas trimestrales'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                </div>
              </div>

              {/* Datos bancarios */}
              <div className="rq-card">
                <div className="rq-card-title">🏦 Datos para el Pago — Anticipo</div>
                <div className="rq-g3">
                  <Field label="Banco">
                    <input className="rq-input" value={form.banco}
                      onChange={e => set('banco', e.target.value)} />
                  </Field>
                  <Field label="Tipo de cuenta">
                    <select className="rq-select" value={form.tipoCuenta}
                      onChange={e => set('tipoCuenta', e.target.value)}>
                      {['Cuenta de Ahorros','Cuenta Corriente','Nequi','Daviplata']
                        .map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="Número de cuenta">
                    <input className="rq-input" value={form.numeroCuenta}
                      onChange={e => set('numeroCuenta', e.target.value)} />
                  </Field>
                  <Field label="Titular">
                    <input className="rq-input" value={form.titular}
                      onChange={e => set('titular', e.target.value)} />
                  </Field>
                  <Field label="Cédula">
                    <input className="rq-input" value={form.cedula}
                      onChange={e => set('cedula', e.target.value)} />
                  </Field>
                  <div className="rq-s3">
                    <Field label="Notas adicionales sobre la inversión">
                      <textarea className="rq-textarea" rows={2} value={form.notasInversion}
                        onChange={e => set('notasInversion', e.target.value)}
                        placeholder="ej: El valor de la suscripción se actualiza anualmente según el IPC certificado por el DANE…" />
                    </Field>
                  </div>
                </div>
              </div>

              <div className="rq-footer">
                <button className="rq-btn-back" onClick={() => goStep(5)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                  Anterior
                </button>
                <button className="rq-btn-next" onClick={() => goStep(7)}>
                  Continuar — Cronograma
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════
              SECCIÓN 7 — CRONOGRAMA
          ════════════════════════════════════ */}
          {step === 7 && (
            <div className="rq-section">
              <div className="rq-tag">Paso 7 de 7</div>
              <h1 className="rq-title">Cronograma de Implementación</h1>
              <p className="rq-sub">
                Define las fases del proyecto con sus actividades y entregables. Puedes editar cada fila directamente.
              </p>

              <div className="rq-card">
                <div className="rq-card-title">📅 Fases del Proyecto</div>

                {/* Días totales */}
                <div style={{ marginBottom: 20 }}>
                  <Field label="Duración total del proyecto">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <input className="rq-input" type="number" min="1"
                        value={form.diasTotales}
                        onChange={e => set('diasTotales', e.target.value)}
                        style={{ maxWidth: 100 }} />
                      <span style={{ color: 'var(--muted)', fontSize: 13 }}>días calendario</span>
                    </div>
                  </Field>
                </div>

                {/* Header */}
                <div className="rq-crono-row" style={{ marginBottom: 8 }}>
                  <label className="rq-label">Período</label>
                  <label className="rq-label">Actividad</label>
                  <label className="rq-label">Entregable</label>
                </div>

                {/* Filas */}
                {form.fases.map((fase, fi) => (
                  <div key={fi} className="rq-crono-row">
                    <input className="rq-input" value={fase.periodo}
                      onChange={e => {
                        const fases = [...form.fases];
                        fases[fi] = { ...fases[fi], periodo: e.target.value };
                        set('fases', fases);
                      }}
                      placeholder={`Días ${fi * 4 + 1}–${fi * 4 + 4}`} />
                    <input className="rq-input" value={fase.actividad}
                      onChange={e => {
                        const fases = [...form.fases];
                        fases[fi] = { ...fases[fi], actividad: e.target.value };
                        set('fases', fases);
                      }}
                      placeholder="ej: Configuración inicial del sistema en la nube…" />
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <input className="rq-input" value={fase.entregable}
                        onChange={e => {
                          const fases = [...form.fases];
                          fases[fi] = { ...fases[fi], entregable: e.target.value };
                          set('fases', fases);
                        }}
                        placeholder="ej: Sistema disponible en línea" />
                      {form.fases.length > 1 && (
                        <button className="rq-btn-del-func"
                          onClick={() => set('fases', form.fases.filter((_, i) => i !== fi))}>
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Agregar fase */}
                <button className="rq-btn-add-func" style={{ marginTop: 8 }}
                  onClick={() => set('fases', [
                    ...form.fases,
                    { periodo: '', actividad: '', entregable: '' }
                  ])}>
                  + Agregar fase
                </button>

                <div style={{ marginTop: 18 }}>
                  <Field label="Notas adicionales del cronograma">
                    <textarea className="rq-textarea" rows={2} value={form.notasCronograma}
                      onChange={e => set('notasCronograma', e.target.value)}
                      placeholder="ej: El cronograma inicia a partir de la confirmación de recibo del anticipo (30% inicial)." />
                  </Field>
                </div>
              </div>

              {/* Resumen final */}
              <div className="rq-card" style={{ border: '1px solid rgba(123,47,190,0.5)', background: 'rgba(123,47,190,0.07)' }}>
                <div className="rq-card-title">✅ Resumen del Proyecto</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[
                    ['Cliente',        form.razonSocial || '—'],
                    ['Sistema',        form.nombreSistema || '—'],
                    ['Referencia',     form.refNum],
                    ['Plan',           form.planComercial],
                    ['Módulos',        `${form.modulos.length} módulo(s)`],
                    ['Implementación', form.valorImplementacion ? `$${fmt(form.valorImplementacion)}` : '—'],
                    ['Mensualidad',    form.valorMensual ? `$${fmt(form.valorMensual)} / mes` : '—'],
                    ['Vigencia',       form.vigencia],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{k}</span>
                      <span style={{ fontSize: 13.5, color: '#fff', fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rq-footer">
                <button className="rq-btn-back" onClick={() => goStep(6)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                  Anterior
                </button>
                <div className="rq-actions" style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
                  <button className="rq-btn-pdf-req" onClick={generarPDFRequerimientos}>
                    📄 Descargar PDF Requerimientos
                  </button>
                  <button className="rq-btn-pdf-prop" onClick={generarPDFPropuesta}>
                    📑 Descargar Propuesta Comercial
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}