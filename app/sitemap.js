export default function sitemap() {
  const baseUrl = 'https://paulabad.tech';
  const currentDate = new Date();
  
  return [
    // ✅ PÁGINA PRINCIPAL (Landing Page)
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly', // Cambia frecuentemente por el análisis de sitios
      priority: 1.0, // Máxima prioridad
    },
    
    // Sobre mí
    {
      url: `${baseUrl}/about-me`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    
    // Blog
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly', // Se actualiza seguido
      priority: 0.9,
    },
    
    // Proyectos (página principal)
    {
      url: `${baseUrl}/proyectos`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    
    // Proyectos individuales
    {
      url: `${baseUrl}/proyectos/invoiceflow`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/proyectos/data-observatory`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/proyectos/smart-access`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/proyectos/e-commerce`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/proyectos/dental-flow`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/proyectos/irrigation`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Páginas legales (si las tienes)
    {
      url: `${baseUrl}/politica-privacidad`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terminos-condiciones`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
