// components/ChecklistPasswordGuard.js
'use client';

import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function ChecklistPasswordGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  // Contraseña segura (CÁMBIALA)
  const CORRECT_PASSWORD = process.env.NEXT_PUBLIC_CHECKLIST_PASSWORD || 'paula2025';

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (attempts >= 5) {
      setError('Demasiados intentos fallidos. Intenta más tarde.');
      return;
    }

    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
      setError('');
      setAttempts(0);
      // Guardar en sessionStorage (solo para esta sesión)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('checklistAuth', 'true');
      }
    } else {
      setError('Contraseña incorrecta');
      setPassword('');
      setAttempts(prev => prev + 1);
    }
  };

  // Verificar si ya está autenticado al cargar
  const [checked, setChecked] = useState(false);
  
  if (typeof window !== 'undefined' && !checked) {
    if (sessionStorage.getItem('checklistAuth') === 'true') {
      setIsAuthenticated(true);
    }
    setChecked(true);
  }

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Contenedor Principal */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-4">
              <Lock size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Acceso Restringido</h1>
            <p className="text-gray-600 mt-2">Checklist de Migración Desktop → Web</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña de Acceso
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    error 
                      ? 'border-red-500 focus:border-red-600' 
                      : 'border-gray-300 focus:border-purple-500'
                  }`}
                  placeholder="Ingresa la contraseña"
                  disabled={attempts >= 5}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Mensaje de Error */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium">⚠️ {error}</p>
                {attempts < 5 && (
                  <p className="text-red-600 text-xs mt-1">
                    Intentos restantes: {5 - attempts}
                  </p>
                )}
              </div>
            )}

            {/* Botón Submit */}
            <button
              type="submit"
              disabled={attempts >= 5 || !password}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Acceder
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <p className="text-xs text-purple-900 text-center">
              Esta herramienta es para clientes de Paula Abad. 
              <br />
              <span className="font-semibold">No compartas la contraseña</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white">
          <p className="text-sm">
            ¿Preguntas? Contacta a{' '}
            <span className="font-bold">Paula Abad</span>
          </p>
          <a 
            href="https://wa.me/573054434287" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
          >
            WhatsApp: +57 305 443 4287
          </a>
        </div>
      </div>
    </div>
  );
}



// ============================================
// CÓMO CAMBIAR LA CONTRASEÑA
// ============================================

/*

OPCIÓN 1: Directa en el código (no recomendado)
- Ve a ChecklistPasswordGuard.js
- Línea: const CORRECT_PASSWORD = 'paula2025';
- Cámbialo por tu contraseña

OPCIÓN 2: Con variable de entorno (RECOMENDADO)
- Edita .env.local
- Agrega: NEXT_PUBLIC_CHECKLIST_PASSWORD=tu_nueva_contraseña
- La contraseña se lee automáticamente

OPCIÓN 3: Variable de entorno privada (MÁS SEGURO)
- En .env.local: CHECKLIST_PASSWORD=contraseña_secreta
- Modifica el page.js para leer desde server:
  const password = process.env.CHECKLIST_PASSWORD
- Esto es más seguro porque no se expone en el cliente

*/