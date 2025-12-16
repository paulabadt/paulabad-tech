'use client';

import { useEffect, ReactNode } from 'react';

interface AnalyticsWrapperProps {
  children: ReactNode;
}

export default function AnalyticsWrapper({ children }: AnalyticsWrapperProps) {
  useEffect(() => {
    // Cargar script de Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-L7FDLPZ024';
    document.head.appendChild(script1);

    // Inicializar Google Analytics
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-L7FDLPZ024', {
        page_path: window.location.pathname
      });
    `;
    document.head.appendChild(script2);

    console.log('✅ Google Analytics loaded');
  }, []);

  return <>{children}</>;
}