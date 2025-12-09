'use client';
import { useState, useEffect } from 'react';
import { Search, Zap, BarChart3, TrendingUp, CheckCircle2, XCircle, Download, MessageCircle, Clock, AlertTriangle, ArrowRight, Sparkles, Target, Users, Award, MailOpen, Phone, Menu, X } from 'lucide-react';
import { generateClientPDF } from '@/lib/pdfGenerator';

// Iconos SVG personalizados
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

// Agregar esto ANTES del componente Home (después de los imports)

const testimonials = [
  {
    id: 1,
    name: "SENA CDITI",
    role: "Coordinador Fábrica Software",
    image: "/sena.png", 
    rating: 5,
    text: "Paula transformó completamente sitio web Cooperativa de Paneleros de la Región. Las ventas aumentaron un 45% en solo 3 meses. Su atención al detalle y acompañamiento con el cliente hacen la diferencia de un servicio personalizado."
  },
  {
    id: 2,
    name: "SENNOVA",
    role: "Coordinador",
    image: "/senova.png",
    rating: 5,
    text: "Trabajar con Paula fue una experiencia increíble. Su enfoque en la optimización del rendimiento y la accesibilidad mejoró significativamente la experiencia de nuestros usuarios. ¡Altamente recomendada!"
  },
  {
    id: 3,
    name: "SENA",
    role: "Fondo Emprender",
    image: "/sena2.jpeg", 
    rating: 5,
    text: "Gracias a la campaña realiza para Emprendedores, logró optimizar el sitio web de varios beneficiados y aumentar la interacción con clientes. Paula es una experta en su campo y su enfoque personalizado realmente marcó la diferencia."
  },
  {
    id: 4,
    name: "SENSORY",
    role: "Neuropsicología",
    image: "/sensory.jpg", 
    rating: 5,
    text: "Paula no solo mejoró nuestro sitio web, sino que nos educó sobre la importancia del rendimiento. Nuestros clientes ahora agendan sus citas mejorando su experiencia; lo que a llevado al aumento en pacientes."
  },
  {
    id: 5,
    name: "Central Paellera",
    role: "Restaurante",
    image: "/paella.jpg", 
    rating: 5,
    text: "Gracias al cambio en nuestro sitio web, las ventas han aumentado y nuestra presencia digital es mucho más profesional."
  },
  {
    id: 6,
    name: "TAKAMI",
    role: "Restaurante",
    image: "/takami.png",
    rating: 5,
    text: "Paula, captó nuestra esencia desde el primer momento y nos acompañó en todo el proceso. Gracias a la nueva web, más clientes nos descubren, reservan y conectan con nuestra marca, lo que ha impulsado nuestras ventas."
  },
  {
    id: 7,
    name: "Centro Cirugía Plástica",
    role: "Gerente",
    image: "/yilmar.png", 
    rating: 5,
    text: "Paula, creó nuestro sitio web reflejando perfectamente quiénes somos y lo que representamos. Desde su lanzamiento, hemos recibido más visitas, más contactos directos y un claro aumento en la visibilidad de nuestro trabajo."
  },
  {
    id: 8,
    name: "Cuidado de la salud y la belleza",
    role: "Área administrativa",
    image: "/laser.png", 
    rating: 5,
    text: "Desde el lanzamiento del nuevo sitio web, más personas nos visitan online, nos contactan y agenda consultas —hemos notado claramente un aumento en visibilidad y en nuevas clientas."
  }
];

// Componente de Estrella
const Star = ({ filled }) => (
  <svg
    className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-600'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// Componente de Tarjeta de Testimonio
const TestimonialCard = ({ testimonial }) => (
  <div className="bg-slate-800/50 backdrop-blur border border-purple-500/20 rounded-2xl p-6 md:p-8 h-full flex flex-col">
    {/* Header con foto y nombre */}
    <div className="flex items-center gap-4 mb-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500/30 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          {testimonial.image ? (
            <img 
              src={testimonial.image} 
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-bold text-xl">
              {testimonial.name.charAt(0)}
            </span>
          )}
        </div>
      </div>
      <div className="flex-1">
        <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
        <p className="text-purple-300 text-sm">{testimonial.role}</p>
      </div>
    </div>

    {/* Estrellas */}
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} filled={i < testimonial.rating} />
      ))}
    </div>

    {/* Texto del testimonio */}
    <p className="text-gray-300 leading-relaxed flex-1 italic">
      "{testimonial.text}"
    </p>
  </div>
);

export default function Home() {
  const [formData, setFormData] = useState({ name: '', phone: '', url: '', termsAccepted: false });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Error al analizar el sitio');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownloadPDF = () => {
    console.log('Result completo:', result);
    console.log('pdfData:', result.pdfData);
    // Validar que existan los datos necesarios
    if (!result?.pdfData) {
      alert('Error: No hay datos para generar el PDF');
      return;
    }

    try {
      const doc = generateClientPDF(result.pdfData);
      doc.save(`analisis-web-${formData.name.replace(/\s+/g, '-').toLowerCase()}.pdf`);
    } catch (error) {
      console.error('Error generando PDF:', error);
      alert('Error al generar el PDF. Por favor intenta nuevamente.');
    }
  };

  // Agregar este useEffect para el autoplay:
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 2));
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* JSON-LD Schema para esta página específica */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Análisis Web con IA',
            url: 'https://paulabad.tech',
            description: 'Herramienta de análisis web gratuita con Inteligencia Artificial para optimizar sitios web y mejorar conversiones',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'COP',
              description: 'Análisis gratuito de sitios web',
            },
            author: {
              '@type': 'Person',
              name: 'Paula Abad',
              url: 'https://paulabad.tech',
              jobTitle: 'Desarrolladora de Software & Data Engineer',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5',
              reviewCount: '500',
            },
            review: testimonials.slice(0, 3).map(t => ({
              '@type': 'Review',
              author: {
                '@type': 'Person',
                name: t.name,
              },
              reviewRating: {
                '@type': 'Rating',
                ratingValue: t.rating,
                bestRating: '5',
              },
              reviewBody: t.text,
            })),
          }),
        }}
      />
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-xl border-b border-purple-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="Paula Abad Logo" 
                className="w-10 h-10 rounded-lg"
              />
              <span className="text-xl font-bold text-white"><a href='https://www.paulabad.tech'>Paula Abad |</a></span><em className="text-purple-300">Desarrollador de Software</em> 
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a 
                href="https://tiktok.com/@paulabadtech" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-400 transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/paulabadtech" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a 
                href="mailto:paula@paulabad.tech?subject=Contacto%20desde%20tu%20App%20Web&body=Hola%20Paula,%0A%0A" 
                className="text-gray-300 hover:text-purple-400 transition-colors"
                aria-label="Email"
              >
                <MailOpen className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/573113724894?text=Hola%20Paula,%20quiero%20más%20información%20sobre%20tus%20servicios%20de%20optimización%20web." 
                target="_blank"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105 shadow-lg"
              >
                <Phone className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Tu Sitio Web está 
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                está perdiendo clientes
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-200 mb-4">
              Descúbrelo en 60 segundos con nuestro análisis 
              <span className="font-bold text-white"> GRATIS </span> 
              con Inteligencia Artificial.
            </p>

            {/* Stats - Una fila en mobile y desktop */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-8">
              <div className="bg-slate-800/50 backdrop-blur border border-purple-500/20 rounded-lg sm:rounded-xl p-2 sm:p-4 md:p-6 text-center">
                <Target className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-400 mb-1 sm:mb-2 mx-auto" />
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1">95%</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-400">Precisión</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur border border-purple-500/20 rounded-lg sm:rounded-xl p-2 sm:p-4 md:p-6 text-center">
                <Users className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-pink-400 mb-1 sm:mb-2 mx-auto" />
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1">500+</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-400">Sitios</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur border border-purple-500/20 rounded-lg sm:rounded-xl p-2 sm:p-4 md:p-6 text-center">
                <Award className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-400 mb-1 sm:mb-2 mx-auto" />
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1">60s</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-400">Tiempo</div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="flex items-center gap-2 text-white font-semibold mb-2 text-sm">
                  <Users className="w-4 h-4 text-purple-400" />
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Juan Pérez"
                  required
                  className="w-full px-5 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-white font-semibold mb-2 text-sm">
                  <MessageCircle className="w-4 h-4 text-purple-400" />
                  WhatsApp
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+57 300 123 4567"
                  required
                  className="w-full px-5 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">Te contactaremos con recomendaciones</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-white font-semibold mb-2 text-sm">
                  <Search className="w-4 h-4 text-purple-400" />
                  URL de tu sitio web
                </label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://tu-sitio-web.com"
                  required
                  className="w-full px-5 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
                />
              </div>

              {/* Términos y Condiciones */}
              <div className="flex items-start gap-3 bg-slate-900/30 border border-purple-500/20 rounded-xl p-4">
                <input
                  type="checkbox"
                  id="terms"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                  required
                  className="w-4 h-4 mt-0.5 accent-purple-500 cursor-pointer flex-shrink-0"
                />
                <label htmlFor="terms" className="text-xs text-gray-300 cursor-pointer">
                  Acepto el{' '}
                  <a 
                    href="/politica-privacidad" 
                    target="_blank" 
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    tratamiento de datos personales
                  </a>
                  {' '}y los{' '}
                  <a 
                    href="/terminos-condiciones" 
                    target="_blank" 
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    términos y condiciones
                  </a>
                  . Los datos proporcionados serán utilizados únicamente para realizar el análisis de tu sitio web y contactarte con los resultados.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !formData.termsAccepted}
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-[1.02] flex items-center justify-center gap-2 text-base"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    Analizando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analizar Gratis
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* CTA Bottom */}
            <div className="mt-16 text-center">
              <p className="text-purple-200 text-lg mb-4">
                ¿Necesitas ayuda profesional con tu sitio web?
              </p>
              <a 
                href="https://wa.me/573113724894?text=Hola Paula, necesito ayuda con mi sitio web"
                target="_blank"
                className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105"
              >
                💬 Contactar por WhatsApp
              </a>
            </div>

            {/* Already Analyzed */}
            {result && result.alreadyAnalyzed && (
              <div className="mt-8 space-y-6">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <Clock className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-xl mb-2">
                        Tu solicitud ya fue procesada
                      </h3>
                      <p className="text-gray-300 mb-4">
                        Este sitio fue analizado el <strong>{result.previousAnalysis.date}</strong> a las <strong>{result.previousAnalysis.time}</strong>
                      </p>
                      <p className="text-gray-400 text-sm mb-4">
                        El análisis gratuito se realiza una sola vez por sitio web. 
                        Si deseas implementar las mejoras, contáctanos.
                      </p>
                      <div className="bg-slate-900/50 border border-purple-500/20 rounded-xl p-4">
                        <p className="text-sm text-gray-400 mb-2">Datos del análisis anterior:</p>
                        <p className="text-white flex items-center gap-2 mb-1">
                          <Users className="w-4 h-4 text-purple-400" />
                          {result.contactInfo.name}
                        </p>
                        <p className="text-white flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-purple-400" />
                          {result.contactInfo.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-8 text-center">
                  <Target className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-white font-bold text-2xl mb-3">
                    ¿Listo para Implementar las Mejoras?
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Puedo ayudarte a optimizar tu sitio y recuperar esas ventas perdidas.
                  </p>
                  <a 
                    href={`https://wa.me/573113724894?text=Hola Paula, mi sitio ${formData.url} ya fue analizado. Quiero contratar tus servicios.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Contratar Servicios
                  </a>
                </div>
              </div>
            )}

            {/* Success Results */}
            {result && !result.alreadyAnalyzed && (
              <div className="mt-8 space-y-6">
                <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-8 h-8 text-green-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-xl mb-2">
                        ¡Análisis Completado, {formData.name}!
                      </h3>
                      <p className="text-gray-300">
                        Tu sitio tiene oportunidades significativas de mejora
                      </p>
                    </div>
                  </div>
                </div>

                {/* Download PDF Button */}
                <button
                  onClick={handleDownloadPDF}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  <Download className="w-5 h-5" />
                  Descargar Informe Completo (PDF)
                </button>

                {/* Scores Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(result.scores).map(([key, value]) => {
                    const Icon = value >= 80 ? CheckCircle2 : value >= 60 ? AlertTriangle : XCircle;
                    const color = value >= 80 ? 'text-green-400' : value >= 60 ? 'text-yellow-400' : 'text-red-400';
                    const bgColor = value >= 80 ? 'bg-green-500/10 border-green-500/30' : value >= 60 ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-red-500/10 border-red-500/30';
                    
                    return (
                      <div key={key} className={`${bgColor} border rounded-xl p-4 text-center transition-transform hover:scale-105`}>
                        <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
                        <div className={`text-3xl font-bold ${color} mb-1`}>{value}</div>
                        <div className="text-xs text-gray-400 capitalize">
                          {key === 'performance' ? 'Rendimiento' :
                           key === 'seo' ? 'SEO' :
                           key === 'accessibility' ? 'Accesibilidad' :
                           'Prácticas'}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Analysis Details */}
                <div className="bg-slate-800/50 border border-purple-500/20 rounded-2xl p-6 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart3 className="w-5 h-5 text-purple-400" />
                      <h4 className="text-white font-bold text-lg">Resumen Ejecutivo</h4>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{result.preview}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <h4 className="text-white font-bold text-lg">Problemas Críticos</h4>
                    </div>
                    <ul className="space-y-3">
                      {result.analysis?.criticalIssues?.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <span>{item.issue}</span>
                        </li>
                      )) || (
                        <li className="text-gray-400">No hay problemas críticos detectados</li>
                      )}
                    </ul>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-6 h-6 text-red-400 flex-shrink-0" />
                      <div>
                        <p className="text-red-300 font-semibold mb-1">
                          Impacto en tu Negocio
                        </p>
                        <p className="text-gray-300">
                          Estás perdiendo entre <strong className="text-white">{result.analysis?.conversionImpact?.lostSales || 'N/A'}</strong> de ventas potenciales
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-8 text-center">
                  <Zap className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-white font-bold text-2xl mb-3">
                    ¿Listo para Mejorar tu Sitio?
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Puedo ayudarte a recuperar esas ventas perdidas
                  </p>
                  <a 
                    href={`https://wa.me/573113724894?text=Hola Paula, vi mi análisis de ${formData.url} y quiero mejorar mi sitio`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Contactar por WhatsApp
                  </a>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-8 bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <XCircle className="w-8 h-8 text-red-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">Error</h3>
                    <p className="text-gray-300">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            <div className="text-center p-6 bg-slate-800/30 border border-purple-500/20 rounded-2xl hover:bg-slate-800/50 transition-all">
              <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Resultados Inmediatos</h3>
              <p className="text-gray-400 text-sm">Análisis completo en menos de 60 segundos</p>
            </div>
            <div className="text-center p-6 bg-slate-800/30 border border-purple-500/20 rounded-2xl hover:bg-slate-800/50 transition-all">
              <Sparkles className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Inteligencia Artificial</h3>
              <p className="text-gray-400 text-sm">Análisis avanzado con tecnología de punta</p>
            </div>
            <div className="text-center p-6 bg-slate-800/30 border border-purple-500/20 rounded-2xl hover:bg-slate-800/50 transition-all">
              <BarChart3 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Informe Detallado</h3>
              <p className="text-gray-400 text-sm">Recomendaciones específicas y accionables</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Lo que dicen mis{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                clientes
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Resultados reales de negocios que confiaron en mí
            </p>
          </div>

          {/* Slider Container */}
          <div className="relative overflow-hidden">
            {/* Mobile: 1 tarjeta */}
            <div className="md:hidden">
              <div className="transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                <div className="flex">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="w-full flex-shrink-0 px-2">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop: 2 tarjetas */}
            <div className="hidden md:block">
              <div className="transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                <div className="flex">
                  {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0 grid grid-cols-2 gap-6 px-2">
                      {testimonials.slice(slideIndex * 2, slideIndex * 2 + 2).map((testimonial) => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Indicadores de navegación */}
            <div className="flex justify-center gap-2 mt-8">
              {/* Mobile: mostrar indicador por cada testimonio */}
              <div className="md:hidden flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      currentSlide === index 
                        ? 'w-8 bg-purple-500' 
                        : 'w-2 bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Ir a slide ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Desktop: mostrar indicador por cada par de testimonios */}
              <div className="hidden md:flex gap-2">
                {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      currentSlide === index 
                        ? 'w-8 bg-purple-500' 
                        : 'w-2 bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Ir a slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Botones de navegación (opcional) */}
            <button
              onClick={() => setCurrentSlide((prev) => prev === 0 ? Math.ceil(testimonials.length / 2) - 1 : prev - 1)}
              className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-slate-800/80 hover:bg-slate-700 border border-purple-500/30 text-white p-3 rounded-full transition-all"
              aria-label="Anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 2))}
              className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-slate-800/80 hover:bg-slate-700 border border-purple-500/30 text-white p-3 rounded-full transition-all"
              aria-label="Siguiente"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 bg-slate-900/50 backdrop-blur py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img 
              src="/logo.png" 
              alt="Paula Abad Logo" 
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-lg font-bold text-white"><a href='/about-me'>Paula Abad</a></span>
            <span className="text-purple-300 text-sm">| Desarrollador de Software</span>
          </div>
          
          {/* Redes Sociales */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <a 
              href="https://tiktok.com/@paulabadtech" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-purple-400 transition-colors"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-5 h-5" />
            </a>
            <a 
              href="https://instagram.com/paulabadtech" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-400 transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a 
              href="mailto:paula@paulabad.tech?subject=Contacto%20desde%20tu%20App%20Web&body=Hola%20Paula,%0A%0A" 
              className="text-gray-400 hover:text-purple-400 transition-colors"
              aria-label="Email"
            >
              <MailOpen className="w-5 h-5" />
            </a>
          </div>
          
          <p className="text-gray-500 text-sm">Cra 10 # 50-44 Barrio Maraya - Pereira, Colombia</p>
          <p className="text-gray-500 text-sm"><a href='https://www.paulabad.tech'>www.paulabad.tech</a></p>
          <p className="text-gray-500 text-sm mt-2">© 2025 Todos los derechos reservados - Paula Abad</p>
        </div>
      </footer>
    </div>
  );
}