'use client';
import { useState, useEffect } from 'react';
import { Search, Moon, Sun, Mail, Menu, X, Calendar, Tag, ExternalLink, Github, ArrowLeft, Loader } from 'lucide-react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import ProyectoContent from './ProyectoContent';

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

// DATOS DE PROYECTOS (debe coincidir con proyectos/page.js)
const projectsData = [
  {
    id: 1,
    slug: 'invoiceflow',
    translations: {
      es: {
        title: 'Sistema Integral de Facturación e Inventario para PYMES'
      },
      en: {
        title: 'InvoiceFlow - Comprehensive Invoicing & Inventory Management System for SMEs'
      }
    },
    image: null,
    tags: ['Java 17', 'Spring Boot', 'Spring Cloud', 'Kafka', 'PostgreSQL', 'MongoDB', 'Angular', 'Docker', 'GitLab'],
    projectUrl: 'https://paulabad.tech',
    githubUrl: 'https://github.com/paulabadt/invoiceflow',
    readmeFiles: {
      es: 'README.es.md',
      en: 'README.md'
    }
  },
  {
    id: 2,
    slug: 'data-observatory',
    translations: {
      es: {
        title: 'Observatorio de Salud Mental Escolar - Bogotá'
      },
      en: {
        title: 'School Mental Health Observatory - Bogotá'
      }
    },
    image: null,
    date: '2024-11-20',
    tags: ['Python', 'Pandas', 'Numpy', 'Matplotlib', 'TensorFlow', 'Scikit-learn', 'Streamlit', 'Google Colab'],
    projectUrl: 'https://escolar.example.com',
    githubUrl: 'https://github.com/paulabadt/data-observatory',
    readmeFiles: {
      es: 'README.es.md',
      en: 'README.md'
    }
  },
  {
    id: 3,
    slug: 'smart-access',
    translations: {
      es: {
        title: 'Sistema de Control de Acceso Basado en IoT'
      },
      en: {
        title: 'IoT-Based Access Control System'
      }
    },
    image: null,
    date: '2024-09-10',
    tags: ['C++', 'Python', 'Arduino', 'FastAPI', 'React', 'Docker', 'Jest', 'GitHub Actions'],
    projectUrl: 'https://boutiqueluna.com',
    githubUrl: 'https://github.com/paulabadt/smart-access',
    readmeFiles: {
      es: 'README.es.md',
      en: 'README.md'
    }
  },
  {
    id: 4,
    slug: 'e-commerce',
    translations: {
      es: {
        title: 'Plataforma de E-Commerce con Microservicios Serverless en AWS'
      },
      en: {
        title: 'Serverless E-Commerce Microservices Platform on AWS'
      }
    },
    image: null,
    tags: ['Java 17', 'Spring Boot', 'AWS ', 'Node.js', 'Amazon DynamoDB', 'Terraform ', 'AWS CodePipeline', 'DevOps', 'React', 'GitHub Actions'],
    projectUrl: 'https://paulabad.tech',
    githubUrl: 'https://github.com/paulabadt/e-commerce',
    readmeFiles: {
      es: 'README.es.md',
      en: 'README.md'
    }
  },
  {
    id: 5,
    slug: 'dental-flow',
    translations: {
      es: {
        title: 'Sistema Inteligente de Gestión de Citas Odontológicas con Integración WhatsApp'
      },
      en: {
        title: 'Smart Dental Appointment Management System with WhatsApp Integration'
      }
    },
    image: null,
    date: '2024-11-20',
    tags: ['Java 11', 'Spring Boot', 'PostgreSQL', 'Hibernate', 'Maven', 'Angular', 'API WhatsApp', 'Docker', 'Postman', 'Jenkins', 'GitLab'],
    projectUrl: 'https://escolar.example.com',
    githubUrl: 'https://github.com/paulabadt/dental-flow',
    readmeFiles: {
      es: 'README.es.md',
      en: 'README.md'
    }
  },
  {
    id: 6,
    slug: 'irrigation',
    translations: {
      es: {
        title: 'Sistema Inteligente de Riego IoT para Cultivos de Caña de Azúcar'
      },
      en: {
        title: 'Intelligent IoT Irrigation System for Sugarcane Crops'
      }
    },
    image: null,
    date: '2024-09-10',
    tags: ['C++', 'Python', 'Arduino', 'TensorFlow', 'Mosquitto MQTT', 'Grafana', 'React', 'GitHub'],
    projectUrl: 'https://boutiqueluna.com',
    githubUrl: 'https://github.com/paulabadt/irrigation',
    readmeFiles: {
      es: 'README.es.md',
      en: 'README.md'
    }
  },
];

export default function ProjectDetail() {
  const params = useParams();
  const slug = params?.slug;
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [readmeContent, setReadmeContent] = useState('');
  const [loading, setLoading] = useState(true);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleLanguage = () => setLanguage(language === 'es' ? 'en' : 'es');

  const project = projectsData.find(p => p.slug === slug);

   // Fetch README
  useEffect(() => {
    async function fetchReadme() {
      if (!project || !project.githubUrl || !project.readmeFiles) {
        setLoading(false);
        return;
      }

      try {
        const repoPath = project.githubUrl.replace('https://github.com/', '');
        const readmeFile = project.readmeFiles[language] || project.readmeFiles.en || 'README.md';
        
        // Intentar con main
        let readmeUrl = `https://raw.githubusercontent.com/${repoPath}/main/${readmeFile}`;
        let response = await fetch(readmeUrl);
        
        if (!response.ok) {
          // Intentar con master
          readmeUrl = `https://raw.githubusercontent.com/${repoPath}/master/${readmeFile}`;
          response = await fetch(readmeUrl);
        }
        
        if (response.ok) {
          const text = await response.text();
          setReadmeContent(text);
        }
      } catch (error) {
        console.error('Error fetching README:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchReadme();
  }, [project, language]);

  if (!project) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <p className={darkMode ? 'text-white' : 'text-black'}>
          {language === 'es' ? 'Proyecto no encontrado' : 'Project not found'}
        </p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* JSON-LD Schema para página About Me */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareSourceCode',
            name: project.translations.es.title,
            description: project.translations.es.description,
            author: {
              '@type': 'Person',
              name: 'Paula Abad',
              url: 'https://paulabad.tech',
            },
            programmingLanguage: project.tags,
            url: `https://paulabad.tech/proyectos/${slug}`,
          }),
        }}
      />
      {/* Header - Igual que las otras páginas */}
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

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`transition-colors hover:text-purple-500 ${darkMode ? 'text-gray-300' : 'text-black'}`}
              aria-label="Cambiar modo"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="flex md:hidden items-center gap-4">
            <button onClick={toggleLanguage} className={`px-3 py-1 rounded-md font-medium text-sm transition-colors ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-black hover:bg-gray-100'}`}>
              {language === 'es' ? 'EN' : 'ES'}
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
                    href="https://tiktok.com/@paulabadtech" 
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
        <article className="max-w-3xl mx-auto">
          {/* GitHub README */}
          {loading ? (
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {language === 'es' ? 'Cargando...' : 'Loading...'}
                </p>
              </div>
            </div>
          ) : (
            <ProyectoContent 
              proyecto={project}
              readmeContent={readmeContent}
              language={language}
              darkMode={darkMode}
            />
          )}
        </article>
      </main>

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