import AboutMeClient from './about-me-client';

// ✅ Generar metadata dinámicamente 
export async function generateMetadata() {
  return {
    title: 'Paula Abad | Desarrollador de Software',
    description: 'Portafolio Profesional. Especializada en desarrollo backend, IoT, Java, Spring Boot',
    /*, Netbeans, microservicios, desarrollo de paginas web, análisis de datos con Python, Inteligencia Artificial, BigQuery, Cloud, Machine Learning y más.',*/
    
    openGraph: {
      type: 'website',
      locale: 'es_CO',
      url: 'https://paulabad.tech/about-me',
      siteName: 'Paula Abad Portafolio',
      title: 'Paula Abad | Desarrollador de Software',
      description: 'Portafolio profesional. Especializada en desarrollo backend, IoT, Java, Spring Boot',
      /*, Netbeans, microservicios, desarrollo de paginas web, análisis de datos con Python, Inteligencia Artificial, BigQuery, Cloud, Machine Learning y más.',*/
      images: [
        {
          url: 'https://paulabad.tech/og-portfolio.jpg',
          width: 1200,
          height: 630,
          alt: 'Paula Abad - Desarrollador de Software | Portafolio Profesional',
          type: 'image/jpeg',
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      site: '@libeluladoradas',
      creator: '@libeluladoradas',
      title: 'Paula Abad | Desarrollador de Software',
      description: 'Portafolio profesional - Backend, IoT, Java, Spring Boot.',
      images: ['https://paulabad.tech/og-portfolio.jpg'],
    },
  };
}

export default function AboutMe() {
  return <AboutMeClient />;
}