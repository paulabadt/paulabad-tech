'use client';

import { useState } from 'react';
import ChecklistForm from '@/components/ChecklistForm';
import ChecklistPasswordGuard from '@/components/ChecklistPasswordGuard';
import { generateCheclistPDF } from '@/lib/checklistPDFGenerator';

function ChecklistMigracionContent() {
  const [formData, setFormData] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleFormSubmit = async (data) => {
    setFormData(data);
    setIsGeneratingPDF(true);
    
    try {
      const doc = generateCheclistPDF(data);
      doc.save(`Checklist_Migracion_${data.clientData.businessName.replace(/\s/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generando PDF:', error);
      alert('Error al generar el PDF. Intenta de nuevo.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header con Logo */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <img src="/logopdf.png" alt="Paula Abad" className="h-12 w-12" />
            <h1 className="text-4xl font-bold">Checklist de Migración Desktop → Web</h1>
          </div>
          <p className="text-purple-100 text-lg">
            Sistema de evaluación completo para migración de aplicaciones de escritorio a web
          </p>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <ChecklistForm onSubmit={handleFormSubmit} isLoading={isGeneratingPDF} />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Paula Abad | Herramienta de Análisis de Migraciones | www.paulabad.tech
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function ChecklistMigracion() {
  return (
    <ChecklistPasswordGuard>
      <ChecklistMigracionContent />
    </ChecklistPasswordGuard>
  );
}