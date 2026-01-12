'use client';
import { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, Sparkles, Shield, Code, 
  Smartphone, BarChart3, Zap, CheckCircle, ArrowRight,
  Mail, Phone, MessageCircle, TrendingUp, Users, Award,
  Target, Lock, Cpu, Globe
} from 'lucide-react';

// Iconos personalizados
const InstagramIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TikTokIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

export default function HomeEnterprise() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Schema para esta página específica */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Paula Abad - Desarrollador de Software',
            url: 'https://paulabad.tech',
            description: 'Transformamos problemas reales de negocio en software con IA integrada que vende, automatiza y escala.',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'COP',
              description: 'Software empresarial que impulsa resultados',
            },
            author: {
              '@type': 'Person',
              name: 'Paula Abad',
              url: 'https://paulabad.tech',
              jobTitle: 'Desarrollador de Software & Data Engineer',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5',
              reviewCount: '500',
            },
          }),
        }}
      />
      {/* Scroll to Top Button - Solo visible después de scroll */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 z-50 bg-gray-400 hover:bg-gray-500 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110 animate-fade-in"
          aria-label="Volver arriba"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </button>
      )}
      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/573054434287?text=Hola,%20quiero%20más%20información%20sobre%20los%20servicios" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-3 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          ¿Necesitas ayuda?
        </span>
      </a>
      {/* Navbar - Estilo Replit/Centribal */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <img 
              src="/logo.png" 
              alt="Paula Abad Logo" 
              className="w-10 h-10 rounded-lg"
            />
            <span className="text-xl font-bold text-black whitespace-nowrap">
              <a href='/'>Paula Abad</a>
            </span>
            <span className="sr-only">Desarrollador de Software</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#soluciones" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Soluciones</a>
              <a href="#servicios" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Servicios</a>
              <a 
                href="/analisis-web" 
                className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 text-sm font-semibold py-1.5 px-4 rounded-lg transition-colors flex items-center gap-2"
              >
                Análisis Web
              </a>
              <a 
                href="#contacto"
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-5 rounded-lg transition-colors"
              >
                Contactar
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-6 space-y-4">
              <a 
                href="#soluciones" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-600 hover:text-gray-900 font-medium"
              >
                Soluciones
              </a>
              <a 
                href="#servicios" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-600 hover:text-gray-900 font-medium"
              >
                Servicios
              </a>
              <a 
                href="/analisis-web" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-600 hover:text-gray-900 font-medium"
              >
                Análisis Web
              </a>
              <a 
                href="#contacto" 
                onClick={() => setMobileMenuOpen(false)}
                className="block bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-lg font-medium"
              >
                Contactar
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Estilo Replit */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left - Content */}
            <div className="space-y-8">

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
                Software empresarial que impulsa resultados
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Transformamos problemas reales de negocio en software con IA integrada que vende, automatiza y escala.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://wa.me/573054434287?text=Hola,%20quiero%20agendar%20una%20consulta%20gratuita"
                  className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Agendar consulta
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/paula.png" 
                  alt="Paula Abad - Desarrollador de Software"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100 max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">40%</div>
                    <div className="text-xs text-gray-600">Reducción de costos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section - Logos animados */}
      <section className="py-12 px-4 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-500 mb-8 text-center">Confianza de organizaciones líderes a nivel nacional e internacional</p>
          
          {/* Contenedor del carousel */}
          <div className="relative w-full">
            {/* Gradientes laterales para efecto fade */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
            
            {/* Track de logos con animación */}
            <div className="flex gap-16 animate-scroll-logos">
              {/* Primer set de logos */}
              <div className="flex gap-16 items-center shrink-0">
                <img src="/sena.png" alt="SENA" className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                <img src="/senova.png" alt="SENNOVA" className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                <img src="/mintic.png" alt="Mintic" className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                <img src="/sensory.jpg" alt="Sensory" className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                <img src="/yilmar.png" alt="Centro Cirugía" className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                <img src="/laser.png" alt="Laser" className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                <img src="/takami.png" alt="Takami" className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                <img src="/pucp.png" alt="Pontificia Peru" className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                <img src="/mexico.png" alt="Energy Solutions SA" className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                <img src="/mintic.png" alt="Mintic" className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
              </div>
              
              {/* Segundo set duplicado para loop infinito */}
              <div className="flex gap-16 items-center shrink-0">
                <img src="/sena.png" alt="SENA" className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                <img src="/senova.png" alt="SENNOVA" className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                <img src="/mintic.png" alt="Mintic" className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                <img src="/sensory.jpg" alt="Sensory" className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                <img src="/yilmar.png" alt="Centro Cirugía" className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                <img src="/laser.png" alt="Laser" className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                <img src="/takami.png" alt="Takami" className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                <img src="/pucp.png" alt="Pontificia Peru" className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
                <img src="/mexico.png" alt="Energy Solutions SA" className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section - Estilo Centribal */}
      <section id="soluciones" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Solution 1 */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold mb-6">
                IA & MACHINE LEARNING
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Inteligencia Artificial que automatiza decisiones
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Implementación de soluciones de IA que automatizan procesos complejos, mejoran la precisión y liberan tiempo valioso del equipo para tareas estratégicas.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Automatización de procesos con ML</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Predicción de tendencias y comportamientos</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Optimización de recursos en tiempo real</span>
                </li>
              </ul>
              <a href="https://wa.me/573054434287?text=Hola,%20requiero%20software%20con%20Inteligencia%20Artificial" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold">
                Conocer más
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/ai.png" 
                  alt="Inteligencia Artificial"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Solution 2 */}
          <div id="data" className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&fit=crop" 
                  alt="Data Analytics"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold mb-6">
                DATA SCIENCE & ANALYTICS
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Decisiones basadas en datos que generan impacto
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Análisis avanzado de datos que transforma información en insights accionables. Ideal para empresas que necesitan capacidades de Data Science sin equipo interno.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Dashboards ejecutivos en tiempo real</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Modelos predictivos personalizados</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Integración con sistemas existentes</span>
                </li>
              </ul>
              <a href="https://wa.me/573054434287?text=Hola,%20requiero%20apoyo%20en%20Análisis%20de%20Datos." className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold">
                Conocer más
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Solution 3 */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold mb-6">
                SEGURIDAD & CUMPLIMIENTO
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                IA Segura y Responsable
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Protección integral de sistemas de IA, garantizando integridad de modelos, prevención de sesgos y cumplimiento ético de normativas.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Auditorías de seguridad de modelos IA</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Detección y mitigación de sesgos</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Cumplimiento normativo y ético</span>
                </li>
              </ul>
              <a href="https://wa.me/573054434287?text=Hola,%20requiero%20apoyo%20en%20Seguridad%20de%20IA." className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold">
                Conocer más
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&fit=crop" 
                  alt="Seguridad IA"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-16 px-4 bg-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comienza tu proyecto hoy
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Agenda una consulta gratuita de 30 minutos y recibe un análisis inicial sin compromiso
          </p>
          <a 
            href="https://wa.me/573054434287?text=Hola,%20quiero%20agendar%20una%20consulta%20gratuita" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-5 h-5" />
            Agendar consulta gratuita
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Services Grid - Estilo Innowise */}
      <section id="servicios" className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Servicios completos de desarrollo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stack tecnológico completo para llevar ideas desde el concepto hasta producción
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Aplicaciones Web</h3>
              <p className="text-gray-600 leading-relaxed">
                Desarrollo de aplicaciones web escalables con arquitecturas modernas, APIs RESTful y diseño responsivo.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Apps Móviles</h3>
              <p className="text-gray-600 leading-relaxed">
                Aplicaciones nativas y multiplataforma para iOS y Android con experiencia de usuario excepcional.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Software Personalizado</h3>
              <p className="text-gray-600 leading-relaxed">
                Soluciones a medida que se adaptan perfectamente a los procesos únicos de cada organización.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Arquitectura de Software</h3>
              <p className="text-gray-600 leading-relaxed">
                Diseño de arquitecturas escalables, microservicios y sistemas distribuidos de alto rendimiento.
              </p>
            </div>

            {/* Service 5 */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Seguridad & Testing</h3>
              <p className="text-gray-600 leading-relaxed">
                Auditorías de seguridad, testing automatizado y garantía de calidad en cada línea de código.
              </p>
            </div>

            {/* Service 6 */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Consultoría Tecnológica</h3>
              <p className="text-gray-600 leading-relaxed">
                Asesoría estratégica para selección de tecnologías y optimización de procesos de desarrollo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary CTA - After Services */}
      <section className="py-16 px-4 bg-white border-y border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 md:p-12 text-center shadow-xl">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Tu sitio web está perdiendo clientes?
            </h3>
            <p className="text-lg text-purple-100 mb-8">
              Obtén un análisis gratuito con IA en 60 segundos y descubre oportunidades de mejora
            </p>
            <a 
              href="/analisis-web" 
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-purple-600 font-semibold py-4 px-8 rounded-lg transition-all shadow-lg"
            >
              <Zap className="w-5 h-5" />
              Analizar mi sitio web gratis
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&fit=crop" 
                  alt="Metodología de trabajo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Enfoque estratégico, ejecución impecable
              </h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                No solo desarrollamos software. Somos socios estratégicos comprometidos con el éxito empresarial de cada cliente.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Comprensión profunda del negocio</h3>
                    <p className="text-gray-600">Análisis detallado de objetivos y desafíos para diseñar soluciones que realmente impacten.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Metodología ágil y transparente</h3>
                    <p className="text-gray-600">Entregas continuas, comunicación constante y adaptación rápida a cambios.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Calidad y soporte continuo</h3>
                    <p className="text-gray-600">Código limpio, documentado y acompañamiento post-lanzamiento para garantizar el éxito.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Estilo Atento */}
      <section id="contacto" className="py-24 px-4 bg-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para transformar su negocio con tecnología?
          </h2>
          <p className="text-xl text-purple-100 mb-10">
            Agenda una consulta gratuita y descubre cómo podemos ayudar a alcanzar los objetivos empresariales
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="https://wa.me/573054434287?text=Hola,%20quiero%20agendar%20una%20consulta%20tecnológica" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-purple-600 font-semibold py-4 px-8 rounded-lg transition-all shadow-xl hover:shadow-2xl"
            >
              <MessageCircle className="w-5 h-5" />
              Contactar por WhatsApp
            </a>
            <a 
              href="mailto:paula@paulabad.tech?subject=Consulta%20de%20Servicios&body=Hola,%0A%0A" 
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-lg transition-all"
            >
              <Mail className="w-5 h-5" />
              Enviar email
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center text-purple-100 text-sm">
            <div className="flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+57 305 443 4287</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              <span>paula@paulabad.tech</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="/logo.png" 
                  alt="Paula Abad Logo" 
                  className="w-8 h-8 rounded-lg"
                />
                <a href="/" className="text-xl font-bold text-gray-900">
                  Paula Abad
                </a>
                <span className="sr-only">Desarrollador de Software</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Consultoría y desarrollo de software empresarial especializado en IA, Data Science y soluciones personalizadas.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://instagram.com/paulabadtech" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a href="https://tiktok.com/@paulabadtech" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                  <TikTokIcon className="w-5 h-5" />
                </a>
                <a href="mailto:paula@paulabad.tech" className="text-gray-400 hover:text-gray-600">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#soluciones" className="hover:text-gray-900">Soluciones IA</a></li>
                <li><a href="#data" className="hover:text-gray-900">Data Science</a></li>
                <li><a href="#servicios" className="hover:text-gray-900">Desarrollo Web</a></li>
                <li><a href="#servicios" className="hover:text-gray-900">Apps Móviles</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Cra 10 # 50-44, Pereira, Colombia</li>
                <li>+57 305 443 4287</li>
                <li>paula@paulabad.tech</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
            <p>© 2025 Paula Abad. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}