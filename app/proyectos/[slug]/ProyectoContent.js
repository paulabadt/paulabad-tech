'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { Github, ExternalLink, Calendar, Tag as TagIcon, ArrowLeft } from 'lucide-react';
import 'highlight.js/styles/atom-one-dark.css';

// Componente para headings con IDs para enlaces
function HeadingRenderer({ level, children, darkMode }) {
  const Tag = `h${level}`;
  
  const getText = (node) => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(getText).join('');
    if (node?.props?.children) return getText(node.props.children);
    return '';
  };

  const text = getText(children);
  const id = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return (
    <Tag id={id} className="scroll-mt-24">
      {children}
    </Tag>
  );
}

// Componente mejorado para imágenes y banners
function ImageRenderer({ src, alt, darkMode }) {
  // Detectar badges (shields.io, img.shields.io, badgen.net)
  const isBadge = src?.includes('shields.io') || 
                  src?.includes('badgen.net') || 
                  src?.includes('badge');

  // Detectar banners o imágenes grandes (por nombre o path)
  const isBanner = alt?.toLowerCase().includes('banner') || 
                   src?.includes('banner') ||
                   src?.includes('docs/');

  if (isBadge) {
    return (
      <img 
        src={src} 
        alt={alt} 
        className="inline-block mr-2 my-1 align-middle"
        style={{ maxHeight: '28px', display: 'inline-block' }}
        loading="lazy"
      />
    );
  }

  if (isBanner) {
    return (
      <div className="my-8 -mx-4 sm:mx-0">
        <img 
          src={src} 
          alt={alt} 
          className="w-full rounded-xl shadow-2xl"
          loading="lazy"
        />
      </div>
    );
  }

  // Imágenes normales (screenshots, diagramas)
  return (
    <div className="my-8">
      <img 
        src={src} 
        alt={alt} 
        className={`w-full rounded-xl shadow-2xl border cursor-pointer transition-transform hover:scale-[1.02] ${
          darkMode ? 'border-gray-800' : 'border-gray-200'
        }`}
        loading="lazy"
      />
      {alt && (
        <p className={`text-center text-sm mt-2 italic ${
          darkMode ? 'text-gray-500' : 'text-gray-600'
        }`}>
          {alt}
        </p>
      )}
    </div>
  );
}

// Componente para bloques de código con lenguaje destacado
function CodeBlockRenderer({ inline, className, children, darkMode }) {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  if (inline) {
    return (
      <code className={className}>
        {children}
      </code>
    );
  }

  return (
    <div className="relative group">
      {language && (
        <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-medium rounded-bl-lg ${
          darkMode 
            ? 'bg-gray-700 text-gray-300' 
            : 'bg-gray-200 text-gray-700'
        }`}>
          {language}
        </div>
      )}
      <pre className={className}>
        <code className={className}>
          {children}
        </code>
      </pre>
    </div>
  );
}

export default function ProyectoContent({ proyecto, readmeContent, language, darkMode }) {
  const content = proyecto.translations[language];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950' : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Back Button */}
        <a 
          href="/proyectos"
          className={`inline-flex items-center gap-2 mb-8 transition-colors ${
            darkMode 
              ? 'text-gray-400 hover:text-purple-400' 
              : 'text-gray-600 hover:text-purple-600'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'es' ? 'Volver a proyectos' : 'Back to projects'}
        </a>

        {/* Hero Section */}
        <div className="mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-black'
          }`}>
            {content.title}
          </h1>
          
          <p className={`text-xl mb-8 leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {content.description}
          </p>

          {/* Metadata */}
          <div className={`flex flex-wrap gap-6 text-sm mb-8 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(proyecto.date).toLocaleDateString(
                  language === 'es' ? 'es-CO' : 'en-US',
                  { day: 'numeric', month: 'long', year: 'numeric' }
                )}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {proyecto.tags?.map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm border transition-colors duration-300 ${
                  darkMode
                    ? 'bg-purple-500/10 border-purple-500/20 text-purple-300 hover:border-purple-400/40'
                    : 'bg-purple-50 border-purple-200 text-purple-700 hover:border-purple-300'
                }`}
              >
                <TagIcon className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px mb-12 ${
          darkMode 
            ? 'bg-gradient-to-r from-transparent via-gray-700 to-transparent' 
            : 'bg-gradient-to-r from-transparent via-gray-300 to-transparent'
        }`} />

        {/* Content - README Markdown */}
        {readmeContent ? (
          <article className={`prose prose-lg max-w-none
            ${darkMode ? 'prose-invert' : ''}
            
            /* Headings */
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:leading-tight
            prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-10 prose-h1:pb-4 prose-h1:border-b-2
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b
            prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:font-semibold
            prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-3 prose-h4:font-semibold
            
            /* Paragraphs */
            prose-p:leading-relaxed prose-p:text-[17px] prose-p:my-5
            
            /* Links */
            prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-a:transition-colors
            
            /* Code */
            prose-code:text-[15px] prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-normal
            prose-pre:rounded-xl prose-pre:shadow-2xl prose-pre:border prose-pre:my-8 prose-pre:p-5 prose-pre:overflow-x-auto
            
            /* Blockquotes */
            prose-blockquote:border-l-4 prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:my-8 prose-blockquote:not-italic prose-blockquote:font-normal
            
            /* Strong/Bold */
            prose-strong:font-bold prose-strong:text-inherit
            
            /* Lists */
            prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
            prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
            prose-li:my-2 prose-li:pl-1 prose-li:leading-relaxed
            
            /* Tables */
            prose-table:border-collapse prose-table:my-8 prose-table:w-full prose-table:border prose-table:rounded-xl prose-table:overflow-hidden
            prose-thead:border-b-2
            prose-th:font-bold prose-th:p-4 prose-th:text-left prose-th:border-r last:prose-th:border-r-0
            prose-td:p-4 prose-td:border-r prose-td:border-t last:prose-td:border-r-0
            prose-tr:border-b last:prose-tr:border-b-0
            
            /* Images */
            prose-img:rounded-xl prose-img:my-8
            
            /* HR */
            prose-hr:my-12 prose-hr:border-t-2
            
            /* Dark mode colors */
            ${darkMode 
              ? `prose-h1:text-white prose-h1:border-gray-700
                 prose-h2:text-white prose-h2:border-gray-700 
                 prose-h3:text-gray-100 
                 prose-h4:text-gray-100
                 prose-p:text-gray-300 
                 prose-a:text-purple-400 hover:prose-a:text-purple-300
                 prose-code:text-pink-300 prose-code:bg-gray-800/80
                 prose-pre:bg-[#282c34] prose-pre:border-gray-700
                 prose-blockquote:border-purple-500 prose-blockquote:bg-gray-800/30 prose-blockquote:text-gray-300
                 prose-strong:text-gray-100 
                 prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:text-gray-300
                 prose-table:border-gray-700 prose-table:bg-gray-900/50
                 prose-thead:border-gray-700 prose-thead:bg-gray-800
                 prose-th:text-gray-100 prose-th:border-gray-700
                 prose-td:border-gray-700 prose-td:text-gray-300 
                 prose-tr:border-gray-700
                 prose-hr:border-gray-700`
              : `prose-h1:text-black prose-h1:border-gray-300
                 prose-h2:text-black prose-h2:border-gray-300
                 prose-h3:text-gray-900 
                 prose-h4:text-gray-900
                 prose-p:text-gray-700 
                 prose-a:text-purple-600 hover:prose-a:text-purple-700
                 prose-code:text-pink-600 prose-code:bg-pink-50
                 prose-pre:bg-[#282c34] prose-pre:border-gray-300
                 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50 prose-blockquote:text-gray-700
                 prose-strong:text-gray-900 
                 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700
                 prose-table:border-gray-300 prose-table:bg-white
                 prose-thead:border-gray-300 prose-thead:bg-gray-100
                 prose-th:text-gray-900 prose-th:border-gray-300
                 prose-td:border-gray-300 prose-td:text-gray-700 
                 prose-tr:border-gray-300
                 prose-hr:border-gray-300`
            }`}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                h1: ({ children }) => <HeadingRenderer level={1} darkMode={darkMode}>{children}</HeadingRenderer>,
                h2: ({ children }) => <HeadingRenderer level={2} darkMode={darkMode}>{children}</HeadingRenderer>,
                h3: ({ children }) => <HeadingRenderer level={3} darkMode={darkMode}>{children}</HeadingRenderer>,
                h4: ({ children }) => <HeadingRenderer level={4} darkMode={darkMode}>{children}</HeadingRenderer>,
                h5: ({ children }) => <HeadingRenderer level={5} darkMode={darkMode}>{children}</HeadingRenderer>,
                h6: ({ children }) => <HeadingRenderer level={6} darkMode={darkMode}>{children}</HeadingRenderer>,
                img: ({ src, alt }) => <ImageRenderer src={src} alt={alt} darkMode={darkMode} />,
                code: ({ inline, className, children }) => 
                  <CodeBlockRenderer inline={inline} className={className} darkMode={darkMode}>
                    {children}
                  </CodeBlockRenderer>
              }}
            >
              {readmeContent}
            </ReactMarkdown>
          </article>
        ) : (
          <div className="text-center py-20">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              darkMode ? 'bg-gray-900' : 'bg-gray-100'
            }`}>
              <svg className={`w-8 h-8 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className={`text-lg ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              {language === 'es' ? 'No hay documentación disponible' : 'No documentation available'}
            </p>
          </div>
        )}

        {/* Nota SENA */}
        <div className={`mt-16 p-6 rounded-2xl border ${
          darkMode 
            ? 'bg-yellow-900/20 border-yellow-500/30' 
            : 'bg-yellow-50 border-yellow-200'
        }`}>
          <p className={`text-sm leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            ⚠️ {language === 'es'
              ? 'Este proyecto fue desarrollado durante mi labor como instructora e investigadora en el SENA. Por esta razón, el código, las aplicaciones, la documentación y los repositorios son propiedad del SENA.'
              : 'This project was developed during my work as an instructor and researcher at SENA. For this reason, the code, applications, documentation, and repositories are the property of SENA.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}