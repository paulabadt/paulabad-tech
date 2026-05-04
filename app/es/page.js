import HomeClient from './home-client';

// ✅ Generar metadata dinámicamente
export async function generateMetadata() {
  return {
    title: 'Paula Abad | Desarrollador de Software',
    description: 'Transformamos problemas reales de negocio en software con IA integrada que vende, automatiza y escala.',
    
    openGraph: {
      type: 'website',
      locale: 'es_CO',
      url: 'https://paulabad.tech',
      siteName: 'Paula Abad - Desarrollador de Software',
      title: 'Paula Abad | Desarrollador de Software',
      description: 'Transformamos problemas reales de negocio en software con IA integrada que vende, automatiza y escala.',
      images: [
        {
          url: 'https://paulabad.tech/og-home.jpg',
          width: 1200,
          height: 630,
          alt: 'Paula Abad | Desarrollador de Software',
          type: 'image/jpeg',
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      site: '@libeluladoradas',
      creator: '@libeluladoradas',
      title: 'Paula Abad | Desarrollador de Software',
      description: 'Transformamos problemas reales de negocio en software con IA integrada que vende, automatiza y escala.',
      images: ['https://paulabad.tech/og-home.jpg'],
    },
  };
}

export default function Home() {
  return <HomeClient />;
}