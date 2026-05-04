'use client';

import { Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function LanguageSelector() {
  const pathname = usePathname();
  const isSpanish = pathname.startsWith('/es');

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium">
        <Globe className="w-4 h-4" />
        <span>{isSpanish ? 'ES' : 'EN'}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <a 
          href="/"
          className={`block px-4 py-3 text-sm hover:bg-gray-50 rounded-t-lg ${!isSpanish ? 'bg-purple-50 text-purple-600 font-semibold' : 'text-gray-700'}`}
        >
          🇺🇸 English
        </a>
        <a 
          href="/es"
          className={`block px-4 py-3 text-sm hover:bg-gray-50 rounded-b-lg ${isSpanish ? 'bg-purple-50 text-purple-600 font-semibold' : 'text-gray-700'}`}
        >
          🇪🇸 Español
        </a>
      </div>
    </div>
  );
}