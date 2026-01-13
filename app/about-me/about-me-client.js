'use client';
import { useState } from 'react';
import { Search, Moon, Sun, Mail, Menu, X } from 'lucide-react';
import SearchModal from '@/components/SearchModal'; // ← AGREGAR ESTA LÍNEA

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

const TwitterIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const DiscordIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

export default function AboutMeClient() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false); // ← AGREGAR ESTA LÍNEA

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleLanguage = () => setLanguage(language === 'es' ? 'en' : 'es');

  const content = {
    es: {
      title: "Paula Abad",
      subtitle: "Desarrollador de Software",
      description: "Soy Paula, Desarrolladora con enfoque en arquitecturas backend y proyectos IoT, e Instructora–Investigadora en el SENA con más de cinco años de experiencia. Me apasiona la Ciencia de Datos y disfruto escribir sobre desarrollo de software, buenas prácticas y crecimiento profesional. También comparto algunas de mis aficiones, como los viajes, la Fórmula 1 y Pokémon Go."
    },
    en: {
      title: "Paula Abad",
      subtitle: "Software Developer",
      description: "I’m Paula, a Developer focused on backend architectures and IoT projects, as well as an Instructor–Researcher at SENA with over two years of experience. I’m passionate about Data Science and enjoy writing about software development, best practices, and professional growth. I also share some of my personal interests, such as travel, Formula 1, and Pokémon Go."
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* JSON-LD Schema para página About Me */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Paula Abad',
            url: 'https://paulabad.tech/about-me',
            image: 'https://paulabad.tech/paula-avatar.jpeg',
            sameAs: [
              'https://github.com/paulabadt',
              'https://linkedin.com/in/tu-perfil', // ⚠️ CAMBIAR por tu LinkedIn real
              'https://tiktok.com/@paulabadtech',
              'https://instagram.com/paulabadtech',
              'https://twitter.com/libeluladoradas',
            ],
            jobTitle: 'Desarrollador de Software & Data Engineer',
            worksFor: {
              '@type': 'Organization',
              name: 'SENA',
            },
            description: 'Desarrolladora de software especializada en backend, IoT y análisis de datos',
            knowsAbout: ['Python', 'Java', 'Netbeans', 'React', 'Next.js', 'AWS', 'BigQuery', 'Machine Learning'],
          }),
        }}
      />
      {/* Header/Navigation */}
      <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${darkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-sm border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo/Name */}
          <div className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="Paula Abad Logo" 
              className="w-10 h-10 rounded-lg"
            />
            <a href="/about-me" className={`text-xl font-bold transition-colors ${darkMode ? 'text-white' : 'text-black'}`}>
              paulabad.tech
            </a>
          </div>

          {/* Desktop Icons Menu */}
          <div className="hidden md:flex items-center gap-6">
            {/* TikTok */}
            <a 
              href="https://tiktok.com/@paulabadtech" 
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors hover:text-purple-500 ${darkMode ? 'text-gray-300' : 'text-black'}`}
              aria-label="TikTok"
            >
              <TikTokIcon className="w-5 h-5" />
            </a>

            {/* Email */}
            <a 
              href="mailto:paula@paulabad.tech?subject=Contacto%20desde%20tu%20portafolio&body=Hola%20Paula,%0A%0A"
              className={`transition-colors hover:text-purple-500 ${darkMode ? 'text-gray-300' : 'text-black'}`}
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-black hover:bg-gray-100'}`}
              aria-label="Cambiar idioma"
            >
              {language === 'es' ? 'EN' : 'ES'}
            </button>

            {/* Search */}
            <button
              onClick={() => setSearchModalOpen(true)} // ← CAMBIAR ESTA LÍNEA
              className={`transition-colors hover:text-purple-500 ${darkMode ? 'text-gray-300' : 'text-black'}`}
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`transition-colors hover:text-purple-500 ${darkMode ? 'text-gray-300' : 'text-black'}`}
              aria-label="Cambiar modo"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile: Icons visible + Hamburger */}
          <div className="flex md:hidden items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`px-3 py-1 rounded-md font-medium text-sm transition-colors ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-black hover:bg-gray-100'}`}
              aria-label="Cambiar idioma"
            >
              {language === 'es' ? 'EN' : 'ES'}
            </button>

            {/* Search */}
            <button
              onClick={() => setSearchModalOpen(true)} // ← CAMBIAR ESTA LÍNEA
              className={`transition-colors hover:text-purple-500 ${darkMode ? 'text-gray-300' : 'text-black'}`}
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`transition-colors hover:text-purple-500 ${darkMode ? 'text-gray-300' : 'text-black'}`}
              aria-label="Cambiar modo"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`transition-colors ${darkMode ? 'text-gray-300' : 'text-black'}`}
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
            <div className="px-6 py-4 space-y-4">

              {/* Social Media Section */}
              <div className="pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="https://tiktok.com/@paulabadev" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 py-2 transition-colors ${darkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-500'}`}
                  >
                    <TikTokIcon className="w-5 h-5" />
                    <span className="text-sm">TikTok</span>
                  </a>
                  {/* Email */}
                  <a 
                    href="mailto:paula@paulabad.tech?subject=Contacto%20desde%20tu%20portafolio&body=Hola%20Paula,%0A%0A"
                    className={`flex items-center gap-3 py-2 transition-colors ${darkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-500'}`}
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Avatar */}
          <div className="mb-6 flex justify-center">
            <img 
              src="/paula-avatar.jpeg" 
              alt="Paula Abad"
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
            />
          </div>

          {/* Name */}
          <h1 className={`text-5xl md:text-5xl font-bold mb-3 transition-colors ${darkMode ? 'text-white' : 'text-black'}`}>
            {content[language].title}
          </h1>

          {/* Subtitle */}
          <p className={`text-xl md:text-2xl mb-6 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {content[language].subtitle}
          </p>

          {/* Social Icons Row */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <a 
              href="https://tiktok.com/@paulabadtech" 
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all hover:scale-110 ${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-500'}`}
            >
              <TikTokIcon className="w-7 h-7" />
            </a>
            <a 
              href="https://instagram.com/paulabadtech" 
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all hover:scale-110 ${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-500'}`}
            >
              <InstagramIcon className="w-7 h-7" />
            </a>
            <a 
              href="https://x.com/libeluladoradas" 
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all hover:scale-110 ${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-500'}`}
            >
              <TwitterIcon className="w-7 h-7" />
            </a>
            <a 
              href="https://discord.com/users/781523399632748544" 
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all hover:scale-110 ${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-500'}`}
            >
              <DiscordIcon className="w-7 h-7" />
            </a>
            <a 
              href="mailto:paula@paulabad.tech?subject=Contacto%20desde%20tu%20portafolio&body=Hola%20Paula,%0A%0A"
              className={`transition-all hover:scale-110 ${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-500'}`}
            >
              <Mail className="w-7 h-7" />
            </a>
          </div>

          {/* Description */}
          <div className="max-w-3xl mx-auto">
            <p className={`text-lg leading-relaxed transition-colors mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {content[language].description}
            </p>
            
            {/* Call to Action Buttons */}
            <div className="flex items-center justify-center gap-4">
              <a 
                href="/blog" 
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 border ${darkMode ? 'bg-transparent border-gray-700 text-gray-300 hover:border-purple-500 hover:text-purple-400' : 'bg-transparent border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {language === 'es' ? 'Lee mi blog' : 'Read my blog'}
              </a>
              
              <a 
                href="/proyectos" 
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 border ${darkMode ? 'bg-transparent border-gray-700 text-gray-300 hover:border-purple-500 hover:text-purple-400' : 'bg-transparent border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                {language === 'es' ? 'Ver proyectos' : 'View projects'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AGREGAR ESTE COMPONENTE AL FINAL, ANTES DEL CIERRE DEL DIV PRINCIPAL */}
      <SearchModal 
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        darkMode={darkMode}
        language={language}
      />

      {/* Footer */}
      <footer className={`border-t py-8 transition-colors ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className={`text-sm transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            {language === 'es' 
              ? '© 2025 Paula Abad. Todos los derechos reservados.'
              : '© 2025 Paula Abad. All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
}