// ========================================
// FILE: components/cotizador/PasoSubirArchivo.jsx
// ========================================

'use client';

import { useState } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';

export default function PasoSubirArchivo({ 
  archivo, 
  setArchivo, 
  contenidoArchivo, 
  setContenidoArchivo 
}) {
  const [arrastrando, setArrastrando] = useState(false);
  const [cargando, setCargando] = useState(false);

  // En PasoSubirArchivo.jsx, al leer el archivo:
  const leerArchivo = async (file) => {
    setCargando(true);
    try {
      let texto = await file.text();
      
      // LIMITAR A 3000 CARACTERES
      if (texto.length > 3000) {
        texto = texto.substring(0, 3000);
        alert('⚠️ Documento truncado a 3000 caracteres para optimizar el análisis. Incluye solo la info más relevante.');
      }
      
      setContenidoArchivo(texto);
      setArchivo(file);
    } catch (error) {
      console.error('Error al leer archivo:', error);
      alert('Error al leer el archivo. Intenta con otro formato.');
    } finally {
      setCargando(false);
    }
  };

  // Manejar drop
  const handleDrop = (e) => {
    e.preventDefault();
    setArrastrando(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const extension = file.name.split('.').pop().toLowerCase();
      
      if (['txt', 'md', 'pdf', 'docx'].includes(extension)) {
        leerArchivo(file);
      } else {
        alert('Solo se permiten archivos: .txt, .md, .pdf, .docx');
      }
    }
  };

  // Manejar selección manual
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      leerArchivo(file);
    }
  };

  // Remover archivo
  const removerArchivo = () => {
    setArchivo(null);
    setContenidoArchivo('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          📄 Subir Documento de Requerimientos
        </h2>
        <p className="text-gray-600">
          Sube el documento con los requerimientos del proyecto. Puede ser un archivo de texto, 
          markdown, PDF o Word.
        </p>
      </div>

      {!archivo ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setArrastrando(true);
          }}
          onDragLeave={() => setArrastrando(false)}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            arrastrando
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 bg-gray-50 hover:border-indigo-400 hover:bg-indigo-25'
          }`}
        >
          <Upload 
            size={64} 
            className={`mx-auto mb-4 ${arrastrando ? 'text-indigo-500' : 'text-gray-400'}`} 
          />
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {arrastrando ? 'Suelta el archivo aquí' : 'Arrastra y suelta tu archivo'}
          </h3>
          
          <p className="text-gray-600 mb-4">
            o
          </p>

          <label className="inline-block">
            <input
              type="file"
              accept=".txt,.md,.pdf,.docx"
              onChange={handleFileSelect}
              className="hidden"
              disabled={cargando}
            />
            <span className="px-6 py-3 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors inline-block">
              {cargando ? 'Cargando...' : 'Seleccionar archivo'}
            </span>
          </label>

          <p className="text-sm text-gray-500 mt-4">
            Formatos permitidos: .txt, .md, .pdf, .docx (máx 10MB)
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Archivo subido */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle size={24} className="text-green-600" />
              <div>
                <p className="font-semibold text-gray-900">{archivo.name}</p>
                <p className="text-sm text-gray-600">
                  {(archivo.size / 1024).toFixed(2)} KB • Subido correctamente
                </p>
              </div>
            </div>
            <button
              onClick={removerArchivo}
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              title="Remover archivo"
            >
              <X size={20} className="text-red-600" />
            </button>
          </div>

          {/* Vista previa del contenido */}
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={20} className="text-gray-600" />
              <h3 className="font-semibold text-gray-900">Vista previa del contenido:</h3>
            </div>
            <div className="bg-white p-4 rounded border border-gray-200 max-h-64 overflow-y-auto">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                {contenidoArchivo.substring(0, 1000)}
                {contenidoArchivo.length > 1000 && '\n\n... (contenido truncado)'}
              </pre>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {contenidoArchivo.split('\n').length} líneas • {contenidoArchivo.length} caracteres
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>💡 Tip:</strong> Asegúrate de que el documento contenga información clara sobre 
              los módulos del sistema, funcionalidades requeridas, tecnologías preferidas y cualquier 
              detalle técnico relevante.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}