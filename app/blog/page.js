'use client';
import { useState, useEffect } from 'react';
import { Search, Moon, Sun, Mail, Menu, X, Eye, Heart, ExternalLink, Github } from 'lucide-react';
import SearchModal from '@/components/SearchModal'; // ← AGREGAR ESTA LÍNEA

// Iconos SVG
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

// ===== POKÉMON IMAGES ===== 
// Lindos y populares
const cutePokemon = [4, 25, 39, 133, 151, 172, 175, 183, 360, 659];

// Poderosos y cool
const coolPokemon = [6, 94, 130, 131, 143, 150, 248, 350, 445, 448, 643];

// Legendarios
const legendaryPokemon = [150, 151, 249, 250, 384, 385, 483, 484, 487, 433, 197, 216, 1];

// Combinar todos en un solo array con URLs
const pokemonImages = [
  ...cutePokemon.map(id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`),
  ...coolPokemon.map(id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`),
  ...legendaryPokemon.map(id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`),
];

// Traducciones
const translations = {
  es: {
    title: 'Análisis Web con IA',
    description: 'Herramienta que analiza sitios web usando Inteligencia Artificial y genera informes PDF detallados con recomendaciones de mejora.',
  },
  en: {
    title: 'AI-Powered Web Analysis',
    description: 'Tool that analyzes websites using Artificial Intelligence and generates detailed PDF reports with improvement recommendations.',
  }
};

// ===== EDITA TUS POST AQUÍ =====
const postsData = [
  {
    id: 1,
    translations: {
      es: {
        title: 'Modelo de clasificación utilizando SQL en Google BigQuery:',
        description: 'Google BigQuery es una poderosa herramienta que permite realizar análisis de datos a gran escala en la nube, y también es posible utilizarla para entrenar modelos de aprendizaje automático. ',
      },
      en: {
        title: 'Classification Model Using SQL in Google BigQuery',
        description: 'Google BigQuery is a powerful tool that enables large-scale data analysis in the cloud, and it can also be used to train machine learning models.',
      }
    },
    image: pokemonImages[13],
    date: '2023-08-04',
    tags: ['Google Bigquery', 'SQL', 'Google Cloud', 'Data Analytics', 'Inteligencia Artificial'],
    postUrl: 'https://www.linkedin.com/posts/gdgcloudsantiago_allcloudlatam-activity-7093005805993488384-IBiA?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAA24wzABP4XESdRVVp2E0zAjMnPiWJ3Dums&utm_campaign=whatsapp',
  },
  {
    id: 2,
    translations: {
      es: {
        title: 'Jueves de Python',
        description: 'Juega Snake Game y práctica Python con la librería Pygame.',
      },
      en: {
        title: 'Python Thursdays',
        description: 'Play Snake Game and practice Python with the Pygame library.',
      }
    },
    image: pokemonImages[17],
    date: '2022-12-16',
    tags: ['Python', 'Pygame'],
    postUrl: 'https://www.linkedin.com/posts/data-engineering-latam_juega-snake-game-y-pr%C3%A1ctica-python-con-la-activity-7004195435082874880-Zz0p?utm_source=share&utm_medium=member_desktop',
  },
  {
    id: 3,
    translations: {
      es: {
        title: 'Tipos de Algoritmos de Machine Learning',
        description: 'El momento de elegir el algoritmo que se aplicará en un proyecto de machine learning es decisivo en la calidad de los pronósticos y en la selección de estrategias.',
      },
      en: {
        title: 'Types of Machine Learning Algorithms',
        description: 'The moment of choosing the algorithm to apply in a machine learning project is decisive for the quality of the predictions and the selection of strategies.',
      }
    },
    image: pokemonImages[0],
    date: '2022-11-30',
    tags: ['Machine Learning', 'Data Science', 'Predictive models', 'Logistic regression', 'Data engineering'],
    postUrl: 'https://www.linkedin.com/posts/data-engineering-latam_los-algoritmos-de-machine-learning-activity-7003427241208463360-gd-S?utm_source=share&utm_medium=member_desktop',
  },
  {
    id: 4,
    translations: {
      es: {
        title: 'Python: Estructuras de Control',
        description: 'Participe como Speaker para el grupo de estudio Python de la comunidad Data Engineering Latam.',
      },
      en: {
        title: 'Python: Control Structures',
        description: 'I participated as a speaker for the Python study group of the Data Engineering Latam community.',
      }
    },
    image: pokemonImages[2],
    date: '2022-09-20',
    tags: ['Python', 'Algorithms', 'Control structures'],
    postUrl: 'https://youtu.be/hT160XTQpG0?si=H_tpxQVWNbjGXKSx',
  },
  {
    id: 5,
    translations: {
      es: {
        title: '3 Libros para iniciar en Data Science',
        description: 'Una recopilación de 3 libros para iniciar tu camino en la Ciencia de Datos.',
      },
      en: {
        title: '3 Books to Start in Data Science',
        description: 'A collection of three books to help you begin your journey into Data Science.',
      }
    },
    image: pokemonImages[30],
    date: '2022-08-16',
    tags: ['Data science', 'Clustering', 'Neural networks'],
    postUrl: 'https://www.linkedin.com/posts/data-engineering-latam_libros-data-science-activity-6964929181067399168-OnS7?utm_source=share&utm_medium=member_desktop',
  },
  {
    id: 6,
    translations: {
      es: {
        title: 'Cierre del Reto HBO',
        description: 'Como organizadora del Reto HBO, participe como speaker en la comunidad Data Engineering Latam. Creando tu primer Dashboard desde cero.',
      },
      en: {
        title: 'Do You Already Know the Types of Data Analysis?',
        description: 'Here are some examples of business questions that can help guide each type of data analysis',
      }
    },
    image: pokemonImages[32],
    date: '2022-07-08',
    tags: ['Data analytics', 'Business intelligence', 'Storytelling ', 'Dashboard', 'Power BI'],
    postUrl: 'https://youtu.be/NI4RHohtvwM?si=fHjgmfJVzFISQ5lb',
  },
  {
    id: 7,
    translations: {
      es: {
        title: '¿𝗬𝗮 𝗰𝗼𝗻𝗼𝗰𝗲𝘀 𝗹𝗼𝘀 𝘁𝗶𝗽𝗼𝘀 𝗱𝗲 𝗔𝗻á𝗹𝗶𝘀𝗶𝘀 𝗱𝗲 𝗗𝗮𝘁𝗼𝘀?',
        description: 'Algunos ejemplos de las 𝗽𝗿𝗲𝗴𝘂𝗻𝘁𝗮𝘀 𝗰𝗼𝗺𝗲𝗿𝗰𝗶𝗮𝗹𝗲𝘀 que nos ayudarán a realizar cada uno de estos tipos de análisis de datos.',
      },
      en: {
        title: 'Do You Already Know the Types of Data Analysis?',
        description: 'Here are some examples of business questions that can help guide each type of data analysis',
      }
    },
    image: pokemonImages[31],
    date: '2022-07-02',
    tags: ['Data analytics', 'Business intelligence', 'Data driven', 'Predictive analytics', 'Power BI'],
    postUrl: 'https://www.linkedin.com/posts/data-engineering-latam_preguntas-comerciales-para-el-an%C3%A1lisis-de-activity-6948686082339151872-BZ0e?utm_source=share&utm_medium=member_desktop',
  },
  {
    id: 8,
    translations: {
      es: {
        title: 'Tips de un Data Scientist para el Reto HBO',
        description: 'En 5 minutos Paula Abad le realizó 3 preguntas claves a un Data Scientist para ayudarte con el 𝗥𝗲𝘁𝗼 𝗛𝗕𝗢.',
      },
      en: {
        title: 'Tips from a Data Scientist for the HBO Challenge',
        description: 'In just 5 minutes, Paula Abad asked a Data Scientist three key questions to help you with the HBO Challenge.',
      }
    },
    image: pokemonImages[33],
    date: '2022-07-01',
    tags: ['Data analytics', 'Business intelligence', 'Data driven', 'Predictive analytics', 'Power BI'],
    postUrl: 'https://www.linkedin.com/posts/data-engineering-latam_tips-data-scientist-reto-hbo-activity-6948408790954168321-fVbZ?utm_source=share&utm_medium=member_desktop',
  },
];

export default function Posts() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [postStats, setPostStats] = useState({});
  const [searchModalOpen, setSearchModalOpen] = useState(false); // ← AGREGAR ESTA LÍNEA
  const [visiblePosts, setVisiblePosts] = useState(4); // ← AGREGAR ESTA LÍNEA (muestra 4 posts inicialmente)

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleLanguage = () => setLanguage(language === 'es' ? 'en' : 'es');

  // Mostrar más posts
  const showMorePosts = () => {
    setVisiblePosts(prev => prev + 4); // ← Muestra 4 posts más cada vez
  };

  // Cargar stats de localStorage
  useEffect(() => {
    const saved = localStorage.getItem('postStats');
    if (saved) {
      setPostStats(JSON.parse(saved));
    } else {
      // Inicializar con 0
      const initial = {};
      postsData.forEach(p => {
        initial[p.id] = { views: 0, likes: 0, liked: false };
      });
      setPostStats(initial);
    }
  }, []);

  // Guardar stats en localStorage
  const saveStats = (newStats) => {
    setPostStats(newStats);
    localStorage.setItem('postStats', JSON.stringify(newStats));
  };

  // Incrementar vista
  const addView = (postId) => {
    const newStats = { ...postStats };
    if (!newStats[postId]) {
      newStats[postId] = { views: 0, likes: 0, liked: false };
    }
    newStats[postId].views += 1;
    saveStats(newStats);
  };

  // Toggle like
  const toggleLike = (postId, e) => {
    e.stopPropagation();
    const newStats = { ...postStats };
    if (!newStats[postId]) {
      newStats[postId] = { views: 0, likes: 0, liked: false };
    }
    
    if (newStats[postId].liked) {
      newStats[postId].likes -= 1;
      newStats[postId].liked = false;
    } else {
      newStats[postId].likes += 1;
      newStats[postId].liked = true;
    }
    saveStats(newStats);
  };

  const displayedPosts = postsData.slice(0, visiblePosts); // ← AGREGAR
  const hasMorePosts = visiblePosts < postsData.length; // ← AGREGAR

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Blog de Paula Abad',
            url: 'https://paulabad.tech/blog',
            description: 'Artículos sobre desarrollo de software, Python, BigQuery, Machine Learning',
            author: {
              '@type': 'Person',
              name: 'Paula Abad',
              url: 'https://paulabad.tech',
            },
          }),
        }}
      />
      {/* Header */}
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
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 className={`text-2xl md:text-4xl font-bold mb-12 transition-colors ${darkMode ? 'text-white' : 'text-black'}`}>
            {language === 'es' ? 'Blog' : 'Blog'}
          </h1>

          {/* Posts List */}
          <div className="space-y-12">
            {displayedPosts.map((post) => { // ← CAMBIAR postsData por displayedPosts
              const stats = postStats[post.id] || { views: 0, likes: 0, liked: false };
              
              return (
                <article 
                  key={post.id}
                  className="group cursor-pointer"
                  onClick={() => {
                    // ← AGREGAR ESTA FUNCIÓN
                    addView(post.id);
                    if (post.postUrl) {
                      window.open(post.postUrl, '_blank');
                    }
                  }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Image */}
                    {post.image && (
                      <div className="flex-shrink-0 w-full md:w-48 h-64 md:h-40 rounded-lg overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23a855f7' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='24' font-family='Arial'%3EProyecto%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1">
                      {/* Title */}
                      <h2 className={`text-2xl font-bold mb-2 group-hover:text-purple-500 transition-colors ${darkMode ? 'text-white' : 'text-black'}`}>
                        {post.translations[language].title}  {/* <-- Usar traducción */}
                      </h2>

                      {/* Meta */}
                      <div className={`flex items-center gap-4 text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <span>{new Date(post.date).toLocaleDateString(
                          language === 'es' ? 'es-CO' : 'en-US',  
                          { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          }
                        )}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {stats.views}
                        </span>
                        <span>•</span>
                        <button
                          onClick={(e) => toggleLike(post.id, e)}
                          className={`flex items-center gap-1 transition-colors ${stats.liked ? 'text-red-500' : 'hover:text-red-500'}`}
                        >
                          <Heart className={`w-4 h-4 ${stats.liked ? 'fill-current' : ''}`} />
                          {stats.likes}
                        </button>
                      </div>

                      {/* Description */}
                      <p className={`mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {post.translations[language].description}  {/* <-- Usar traducción */}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className={`px-3 py-1 text-xs rounded-full border ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-100 border-gray-300 text-gray-700'}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Botón Mostrar Más */}
          {hasMorePosts && (
            <div className="flex justify-center mt-12">
              <button
                onClick={showMorePosts}
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