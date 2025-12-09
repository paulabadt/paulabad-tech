'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, X, Calendar, Tag, ArrowRight } from 'lucide-react';
import { searchContent } from '@/lib/searchData';

export default function SearchModal({ isOpen, onClose, darkMode, language }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  // Focus en el input cuando se abre el modal
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Búsqueda en tiempo real
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const searchResults = searchContent(query, language);
    setResults(searchResults);
  }, [query, language]);

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Limpiar búsqueda al cerrar
  const handleClose = () => {
    setQuery('');
    setResults([]);
    onClose();
  };

  // Click en resultado
  const handleResultClick = (url) => {
    handleClose();
    
    // Si es URL externa, abrir en nueva pestaña
    if (url.startsWith('http')) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
  };

  if (!isOpen) return null;

  const translations = {
    es: {
      placeholder: 'Buscar en proyectos y blog...',
      noResults: 'No se encontraron resultados',
      tryAnother: 'Intenta con otros términos de búsqueda',
      projects: 'Proyectos',
      posts: 'Posts',
    },
    en: {
      placeholder: 'Search in projects and blog...',
      noResults: 'No results found',
      tryAnother: 'Try different search terms',
      projects: 'Projects',
      posts: 'Posts',
    }
  };

  const t = translations[language];

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4"
      onClick={handleClose}
    >
      {/* Overlay con blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div 
        className={`relative w-full max-w-2xl rounded-2xl shadow-2xl border ${
          darkMode 
            ? 'bg-gray-900 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con input */}
        <div className={`flex items-center gap-3 p-4 border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <Search className={`w-5 h-5 flex-shrink-0 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.placeholder}
            className={`flex-1 bg-transparent outline-none text-lg ${
              darkMode ? 'text-white placeholder-gray-500' : 'text-black placeholder-gray-400'
            }`}
          />

          <button
            onClick={handleClose}
            className={`p-2 rounded-lg transition-colors ${
              darkMode 
                ? 'hover:bg-gray-800 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resultados */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            // Estado inicial
            <div className={`p-8 text-center ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">
                {language === 'es' 
                  ? 'Escribe para buscar en proyectos y blog' 
                  : 'Type to search in projects and blog'}
              </p>
            </div>
          ) : results.length === 0 ? (
            // Sin resultados
            <div className={`p-8 text-center ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              <p className="text-lg font-medium mb-2">{t.noResults}</p>
              <p className="text-sm">{t.tryAnother}</p>
            </div>
          ) : (
            // Resultados encontrados
            <div className="p-2">
              {/* Agrupar por tipo */}
              {['project', 'post'].map(type => {
                const filtered = results.filter(r => r.type === type);
                if (filtered.length === 0) return null;

                return (
                  <div key={type} className="mb-4">
                    {/* Título de sección */}
                    <div className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider ${
                      darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {type === 'project' ? t.projects : t.posts} ({filtered.length})
                    </div>

                    {/* Items */}
                    {filtered.map((item) => (
                      <button
                        key={`${item.type}-${item.id}`}
                        onClick={() => handleResultClick(item.url)}
                        className={`w-full text-left p-4 rounded-xl transition-all group ${
                          darkMode 
                            ? 'hover:bg-gray-800' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            {/* Título */}
                            <h3 className={`font-semibold mb-1 line-clamp-1 group-hover:text-purple-500 transition-colors ${
                              darkMode ? 'text-white' : 'text-black'
                            }`}>
                              {item.translations[language].title}
                            </h3>

                            {/* Descripción */}
                            <p className={`text-sm mb-2 line-clamp-2 ${
                              darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {item.translations[language].description}
                            </p>

                            {/* Meta info */}
                            <div className={`flex items-center gap-3 text-xs ${
                              darkMode ? 'text-gray-500' : 'text-gray-500'
                            }`}>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(item.date).toLocaleDateString(
                                  language === 'es' ? 'es-CO' : 'en-US',
                                  { day: 'numeric', month: 'short', year: 'numeric' }
                                )}
                              </span>
                              
                              {item.tags.length > 0 && (
                                <span className="flex items-center gap-1">
                                  <Tag className="w-3 h-3" />
                                  {item.tags[0]}
                                  {item.tags.length > 1 && ` +${item.tags.length - 1}`}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Flecha */}
                          <ArrowRight className={`w-5 h-5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                            darkMode ? 'text-gray-500' : 'text-gray-400'
                          }`} />
                        </div>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer con shortcuts */}
        <div className={`flex items-center justify-between px-4 py-3 border-t text-xs ${
          darkMode 
            ? 'border-gray-700 text-gray-500' 
            : 'border-gray-200 text-gray-400'
        }`}>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className={`px-2 py-1 rounded ${
                darkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>↑</kbd>
              <kbd className={`px-2 py-1 rounded ${
                darkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>↓</kbd>
              {language === 'es' ? 'para navegar' : 'to navigate'}
            </span>
          </div>
          
          <span className="flex items-center gap-1">
            <kbd className={`px-2 py-1 rounded ${
              darkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>ESC</kbd>
            {language === 'es' ? 'para cerrar' : 'to close'}
          </span>
        </div>
      </div>
    </div>
  );
}