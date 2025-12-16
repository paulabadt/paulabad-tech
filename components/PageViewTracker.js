'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
      window.gtag('event', 'page_view', {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}