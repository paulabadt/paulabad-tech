import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
import AnalyticsWrapper from './analytics-wrapper';

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://paulabad.tech'),
  
  title: {
    default: 'Paula Abad | Desarrollador de Software & Data Engineer - Portfolio Profesional',
    template: '%s | Paula Abad'
  },
  
  description: 'Portfolio de Paula Abad - Instructora e Investigadora en el SENA. Especializada en desarrollo backend, IoT, Java, Spring Boot, Netbeans, microservicios, desarrollo de paginas web, análisis de datos con Python, Inteligencia Artificial, BigQuery, AWS, Machine Learning y más. Blog sobre programación y proyectos de software. Proyectos de microservicios, e-commerce, sistemas de facturación y predicción con IA.',
  
  keywords: [
    'Paula Abad',
    'desarrollador de software',
    'desarrolladores de software',
    'desarrollo de soft',
    'desarrollo de sw',
    'software netbeans',
    'desarrollo de aplicaciones móviles',
    'empresas de desarrollo de software',
    'desarrollo de apps',
    'desarrollo de paginas web',
    'desarrolladores de apps',
    'programador de software',
    'aplicaciones de inteligencia artificial',
    'inteligencia artificial on line',
    'aplicaciones con inteligencia artificial',
    'aplicaciones de inteligencia artificial en medicina',
    'inteligencia artificial en procesos industriales',
    'programas con inteligencia artificial',
    'software developer',
    'backend developer',
    'frontend developer',
    'full stack developer',
    'IoT developer',
    'Python developer',
    'Java developer',
    'React developer',
    'Next.js developer',
    'Data Science',
    'Data Engineer',
    'BigQuery',
    'Google Cloud',
    'AWS',
    'Machine Learning',
    'Inteligencia Artificial',
    'SENA instructor',
    'Colombia developer',
    'Pereira developer',
    'portfolio desarrollador',
    'blog programación',
    'tutoriales python',
    'proyectos software',
    'microservicios',
    'REST API',
    'PostgreSQL',
    'MongoDB',
    'Docker',
    'Kubernetes',
    'Spring Boot',
    'Node.js',
    'análisis de datos',
    'ciencia de datos',
    'instructora tecnología',
    'investigadora software',
  ],
  
  authors: [{ name: 'Paula Abad', url: 'https://paulabad.tech' }],
  creator: 'Paula Abad',
  publisher: 'Paula Abad',
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    alternateLocale: ['en_US'],
    url: 'https://paulabad.tech',
    siteName: 'Paula Abad Portfolio',
    title: 'Paula Abad | Desarrollador de Software & Data Engineer',
    description: 'Portfolio profesional de Paula Abad - Desarrollo backend, IoT, Inteligencia Artificial, Data Science, Machine Learning. Instructora e Investigadora en el SENA. Experiencia en microservicios, AWS, Python y análisis de datos.',
    images: [
      {
        url: 'https://paulabad.tech/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Paula Abad - Desarrollador de Software',
        type: 'image/jpeg',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    site: '@libeluladoradas',
    creator: '@libeluladoradas',
    title: 'Paula Abad | Desarrollador de Software',
    description: 'Portfolio profesional - Desarrollo backend, IoT, Inteligencia Artificial, Data Science',
    images: ['https://paulabad.tech/og-image.jpg'],
  },
  
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  verification: {
    google: 'pendiente',
    yandex: 'pendiente',
  },
  
  category: 'technology',
  
  appleWebApp: {
    capable: true,
    title: 'Paula Abad',
    statusBarStyle: 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Canonical */}
        <link rel="canonical" href="https://paulabad.tech" />
        
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#8b5cf6" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1f2937" media="(prefers-color-scheme: dark)" />
        
        {/* Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://api.nasa.gov" />
        
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Paula Abad',
              url: 'https://paulabad.tech',
              image: 'https://paulabad.tech/paula-avatar.jpeg',
              sameAs: [
                'https://github.com/paulabadt',
                'https://tiktok.com/@paulabadtech',
                'https://twitter.com/libeluladoradas',
                'https://instagram.com/paulabadtech',
                'https://www.linkedin.com/in/tu-perfil',
              ],
              jobTitle: 'Desarrolladora de Software & Data Engineer',
              worksFor: {
                '@type': 'Organization',
                name: 'SENA',
                url: 'https://www.sena.edu.co',
              },
              alumniOf: {
                '@type': 'Organization',
                name: 'SENA',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Pereira',
                addressRegion: 'Risaralda',
                addressCountry: 'CO',
              },
              knowsAbout: [
                'Software Development',
                'Backend Development',
                'Frontend Development',
                'IoT',
                'Python',
                'Java',
                'Netbeans',
                'JavaScript',
                'React',
                'Next.js',
                'Node.js',
                'Data Science',
                'Machine Learning',
                'Artificial Intelligence',
                'BigQuery',
                'AWS',
                'Google Cloud',
                'PostgreSQL',
                'MongoDB',
              ],
              description: 'Desarrollador de software especializada en backend, IoT, Inteligencia Artificial y análisis de datos. Instructora e Investigadora en SENA.',
            }),
          }}
        />
      </head>
      <body className={poppins.className}>
        <AnalyticsWrapper>
          {children}
        </AnalyticsWrapper>
      </body>
    </html>
  );
}