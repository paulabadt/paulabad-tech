import HomeClient from './home-client';

// ✅ Generar metadata dinámicamente
export async function generateMetadata() {
  return {
    title: 'Tu web está perdiendo clientes, análisis gratis con Inteligencia Artificial',
    description: 'Paula Abad: Desarrollador de Software & Instructora del SENA. Creo Webs, Apps e IA que sí venden. Atrévete a verlo.',
    
    openGraph: {
      type: 'website',
      locale: 'es_CO',
      url: 'https://paulabad.tech',
      siteName: 'Paula Abad',
      title: 'Tu web está perdiendo clientes, análisis gratis con Inteligencia Artificial',
      description: 'Paula Abad: Desarrollador de Software & Instructora del SENA. Creo Webs, Apps e IA que sí venden. Atrévete a verlo.',
      images: [
        {
          url: 'https://paulabad.tech/og-home.jpg',
          width: 1200,
          height: 630,
          alt: 'Análisis Web con IA - Mejora tu sitio web',
          type: 'image/jpeg',
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      site: '@libeluladoradas',
      creator: '@libeluladoradas',
      title: 'Tu web está perdiendo clientes',
      description: 'Análisis gratuito de tu sitio web con IA en 60 segundos. Atrévete a verlo.',
      images: ['https://paulabad.tech/og-home.jpg'],
    },
  };
}

export default function Home() {
  return <HomeClient />;
}