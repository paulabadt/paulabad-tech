'use client';
import { useState, useEffect } from 'react';
import { Search, Moon, Sun, Mail, Menu, X, Eye, Heart, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import SearchModal from '@/components/SearchModal'; // ← AGREGAR ESTA LÍNEA


// Iconos SVG (los mismos)
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

// Función para generar una fecha aleatoria entre 1995-06-16 (inicio de APOD) y hoy
const getRandomAPODDate = () => {
  const start = new Date('1995-06-16');
  const end = new Date();
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  const randomDate = new Date(randomTime);
  return randomDate.toISOString().split('T')[0];
};

// Función para obtener imagen de NASA APOD
const getNASAImage = async (projectId) => {
  try {
    const randomDate = getRandomAPODDate();
    const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY || 'DEMO_KEY';
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${randomDate}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.media_type === 'image') {
      return {
        url: data.url,
        title: data.title,
        date: data.date
      };
    } else {
      return getNASAImage(projectId);
    }
  } catch (error) {
    console.error('Error fetching NASA image:', error);
    return {
      url: 'https://apod.nasa.gov/apod/image/2312/M1_JwstSchmidt_960.jpg',
      title: 'Space Image',
      date: new Date().toISOString().split('T')[0]
    };
  }
};

// DATOS DE PROYECTOS
const projectsData = [
  {
    id: 1,
    slug: 'observatorio',
    translations: {
      es: {
        title: 'E-Commerce Microservices en AWS',
        description: 'Sistema de e-commerce con arquitectura de microservicios.',
      },
      en: {
        title: 'E-Commerce Microservices with AWS',
        description: 'E-commerce system with microservices architecture.',
      }
    },
    date: '2025-01-15',
    tags: ['Java 11', 'Spring Boot', 'Lambda', 'AWS', 'Terraform'],
    projectUrl: 'https://paulabad.tech',
    githubUrl: 'https://github.com/paulabadt/observatorio-salud-mental-bogota',
    readmeFiles: {
      es: 'README.es.md',
      en: 'README.md'
    }
  },
  {
    id: 2,
    slug: 'sistema-gestion-escolar',
    translations: {
      es: {
        title: 'Sistema de Gestión Escolar',
        description: 'Plataforma completa para administración de instituciones educativas.',
      },
      en: {
        title: 'School Management System',
        description: 'Complete platform for educational institutions administration.',
      }
    },
    date: '2024-11-20',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Express'],
    projectUrl: 'https://escolar.example.com',
    githubUrl: 'https://github.com/paulabad/sistema-escolar',
    readmeFiles: {
      es: 'README.es.md',
      en: 'README.md'
    }
  },
  {
    id: 3,
    slug: 'boutique-luna',
    translations: {
      es: {
        title: 'E-commerce Boutique Luna',
        description: 'Tienda online con integración de pagos y gestión de inventario.',
      },
      en: {
        title: 'Boutique Luna E-commerce',
        description: 'Online store with payment integration and inventory management.',
      }
    },
    date: '2024-09-10',
    tags: ['Next.js', 'Stripe', 'Supabase', 'Tailwind'],
    projectUrl: 'https://boutiqueluna.com',
    githubUrl: null,
    readmeFiles: {
      es: 'README.es.md',
      en: 'README.md'
    }
  },
];

export default function Proyectos() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectStats, setProjectStats] = useState({});
  const [nasaImages, setNasaImages] = useState({});
  const [loadingImages, setLoadingImages] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [searchModalOpen, setSearchModalOpen] = useState(false); // ← AGREGAR ESTA LÍNEA

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleLanguage = () => setLanguage(language === 'es' ? 'en' : 'es');

  useEffect(() => {
    const saved = localStorage.getItem('projectStats');
    if (saved) {
      setProjectStats(JSON.parse(saved));
    } else {
      const initial = {};
      projectsData.forEach(p => {
        initial[p.id] = { views: 0, likes: 0, liked: false };
      });
      setProjectStats(initial);
    }
  }, []);

  useEffect(() => {
    const loadNASAImages = async () => {
      setLoadingImages(true);
      const images = {};
      
      for (const project of projectsData) {
        const imageData = await getNASAImage(project.id);
        images[project.id] = imageData;
      }
      
      setNasaImages(images);
      setLoadingImages(false);
    };

    loadNASAImages();
  }, []);

  const saveStats = (newStats) => {
    setProjectStats(newStats);
    localStorage.setItem('projectStats', JSON.stringify(newStats));
  };

  const toggleLike = (projectId, e) => {
    e.stopPropagation();
    e.preventDefault();
    const newStats = { ...projectStats };
    if (!newStats[projectId]) {
      newStats[projectId] = { views: 0, likes: 0, liked: false };
    }
    
    if (newStats[projectId].liked) {
      newStats[projectId].likes -= 1;
      newStats[projectId].liked = false;
    } else {
      newStats[projectId].likes += 1;
      newStats[projectId].liked = true;
    }
    saveStats(newStats);
  };

  const handleProjectClick = (projectId, slug) => {
    const newStats = { ...projectStats };
    if (!newStats[projectId]) {
      newStats[projectId] = { views: 0, likes: 0, liked: false };
    }
    newStats[projectId].views += 1;
    saveStats(newStats);
    window.location.href = `/proyectos/${slug}`;
  };

  const showMoreProjects = () => {
    setVisibleProjects(prev => prev + 6);
  };

  const displayedProjects = projectsData.slice(0, visibleProjects);
  const hasMoreProjects = visibleProjects < projectsData.length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${darkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-sm border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo/Name */}
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Paula Abad Logo" className="w-10 h-10 rounded-lg" />
            <a href="/about-me" className={`text-xl font-bold transition-colors ${darkMode ? 'text-white' : 'text-black'}`}>
              paulabad.tech
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/blog" className={`font-medium transition-colors hover:text-purple-500 ${darkMode ? 'text-gray-300' : 'text-black'}`}>
              Blog
            </a>
            <a href="/proyectos" className={`font-medium transition-colors hover:text-purple-500 ${darkMode ? 'text-gray-300' : 'text-black'}`}>
              {language === 'es' ? 'Proyectos' : 'Projects'}
            </a>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-6">
            {/* TikTok */}
            <a href="https://tiktok.com/@paulabadev" target="_blank" rel="noopener noreferrer"
              className={`transition-colors hover:text-purple-500 ${darkMode ? 'text-gray-300' : 'text-black'}`}>
              <TikTokIcon className="w-5 h-5" />
            </a>
            {/* Email */}
            <a href="mailto:paula@paulabad.tech?subject=Contacto%20desde%20tu%20portafolio&body=Hola%20Paula,%0A%0A" className={`transition-colors hover:text-purple-500 ${darkMode ? 'text-gray-300' : 'text-black'}`}>
              <Mail className="w-5 h-5" />
            </a>
            {/* Language Toggle */}
            <button onClick={toggleLanguage} className={`px-3 py-1 rounded-md font-medium transition-colors ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-black hover:bg-gray-100'}`}>
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
            <button onClick={toggleDarkMode} className={`transition-colors hover:text-purple-500 ${darkMode ? 'text-gray-300' : 'text-black'}`}>
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="flex md:hidden items-center gap-4">
            <button onClick={toggleLanguage} className={`px-3 py-1 rounded-md font-medium text-sm transition-colors ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-black hover:bg-gray-100'}`}>
              {language === 'es' ? 'EN' : 'ES'}
            </button>
            <button
              onClick={() => setSearchModalOpen(true)} // ← CAMBIAR ESTA LÍNEA
              className={`transition-colors hover:text-purple-500 ${darkMode ? 'text-gray-300' : 'text-black'}`}
            >
              <Search className="w-5 h-5" />
            </button>
            <button onClick={toggleDarkMode} className={`transition-colors hover:text-purple-500 ${darkMode ? 'text-gray-300' : 'text-black'}`}>
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`transition-colors ${darkMode ? 'text-gray-300' : 'text-black'}`}>
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

      {/* Main Content */}
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className={`text-2xl md:text-4xl font-bold mb-8 transition-colors ${darkMode ? 'text-white' : 'text-black'}`}>
            {language === 'es' ? 'Proyectos' : 'Projects'}
          </h1>

          <div className={`mb-12 p-4 rounded-lg border ${darkMode ? 'bg-purple-900/20 border-purple-500/30' : 'bg-purple-50 border-purple-200'}`}>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {language === 'es' 
                ? 'Todos los proyectos que presento a continuación han sido desarrollados en mi labor como instructora e investigadora en el SENA. Por esta razón, el código, las aplicaciones, la documentación y los repositorios son propiedad del SENA. Aquí encontrarás únicamente una breve descripción de cada proyecto, junto con las habilidades, problemática resuelta y tecnologías que utilicé en su desarrollo.'
                : 'All the projects presented below were developed during my work as an instructor and researcher at SENA. For this reason, the code, applications, documentation, and repositories are the property of SENA. Here you will find only a brief description of each project, along with the skills, the resulting problem, and the technologies I used during development.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {displayedProjects.map((project) => {
              const stats = projectStats[project.id] || { views: 0, likes: 0, liked: false };
              const imageData = nasaImages[project.id];
              
              return (
                <article 
                  key={project.id}
                  className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 hover:border-purple-500/50 hover:shadow-purple-500/20' 
                      : 'bg-white border-gray-200 hover:border-purple-500/50 hover:shadow-purple-500/20'
                  }`}
                  onClick={() => handleProjectClick(project.id, project.slug)}
                >
                  <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-black">
                    {loadingImages ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                      </div>
                    ) : imageData ? (
                      <>
                        <Image
                          src={imageData.url}
                          alt={imageData.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          unoptimized
                          priority={project.id <= 3}
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-xs truncate">{imageData.title}</p>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full animate-pulse bg-gray-700" />
                    )}
                  </div>

                  <div className="p-6">
                    <h2 className={`text-xl font-bold mb-3 line-clamp-2 group-hover:text-purple-500 transition-colors ${
                      darkMode ? 'text-white' : 'text-black'
                    }`}>
                      {project.translations[language].title}
                    </h2>

                    <div className={`flex items-center gap-3 text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {stats.views}
                      </span>
                      <span>•</span>
                      <button
                        onClick={(e) => toggleLike(project.id, e)}
                        className={`flex items-center gap-1 transition-colors ${stats.liked ? 'text-red-500' : 'hover:text-red-500'}`}
                      >
                        <Heart className={`w-4 h-4 ${stats.liked ? 'fill-current' : ''}`} />
                        {stats.likes}
                      </button>
                      <span>•</span>
                      <span className="text-xs">
                        {new Date(project.date).toLocaleDateString(
                          language === 'es' ? 'es-CO' : 'en-US',  
                          { day: 'numeric', month: 'short', year: 'numeric' }
                        )}
                      </span>
                    </div>

                    <p className={`mb-4 text-sm line-clamp-3 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {project.translations[language].description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index}
                          className={`px-3 py-1 text-xs rounded-full border ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-100 border-gray-300 text-gray-700'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className={`px-3 py-1 text-xs rounded-full border ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-100 border-gray-300 text-gray-700'
                        }`}>
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Show More Button */}
          {hasMoreProjects && (
            <div className="flex justify-center">
              <button
                onClick={showMoreProjects}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 border ${
                  darkMode 
                    ? 'bg-transparent border-gray-700 text-gray-300 hover:border-purple-500 hover:text-purple-400' 
                    : 'bg-transparent border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {language === 'es' ? 'Mostrar más' : 'Show More'}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* AGREGAR ESTE COMPONENTE AL FINAL, ANTES DEL CIERRE DEL DIV PRINCIPAL */}
      <SearchModal 
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        darkMode={darkMode}
        language={language}
      />

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