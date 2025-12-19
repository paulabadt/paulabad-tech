// components/ChristmasBanner.jsx
'use client'

import { useState, useEffect } from 'react'
import { X, Gift, MessageCircle } from 'lucide-react'
import Image from 'next/image'

export default function ChristmasBanner() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const wasClosed = sessionStorage.getItem('christmasBannerClosed')
      if (!wasClosed) {
        setIsVisible(true)
      }
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])
  
  const handleClose = (e) => {
    e.stopPropagation()
    setIsVisible(false)
    sessionStorage.setItem('christmasBannerClosed', 'true')
  }
  
  const handleBannerClick = () => {
    const phoneNumber = '573054434287'
    const message = encodeURIComponent(
      '🎄 ¡Hola Paula! Me interesa el Plan Especial de Cierre de Año: Desarrollo Web + Catálogo WhatsApp Gratis. ¿Me puedes dar más información?'
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
    setIsVisible(false)
    sessionStorage.setItem('christmasBannerClosed', 'true')
  }
  
  if (!isVisible) return null
  
  return (
    <>
      {/* Overlay oscuro con efecto de nieve */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={handleClose}
      >
        {/* Efecto de nieve */}
        <div className="snowflakes" aria-hidden="true">
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
        </div>
      </div>
      
      {/* Banner Modal - Más compacto */}
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-lg animate-slideUp cursor-pointer"
        onClick={handleBannerClick}
      >
        <div className="bg-gradient-to-br from-red-600 via-red-700 to-green-700 rounded-2xl shadow-2xl overflow-hidden border-4 border-white relative transform hover:scale-105 transition-transform duration-300">
          
          {/* Decoración navideña superior */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-green-400 to-red-400 z-10"></div>
          
          {/* Luces navideñas animadas */}
          <div className="absolute top-2 left-0 right-0 flex justify-around px-4 pointer-events-none z-10">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full animate-pulse"
                style={{
                  backgroundColor: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#22c55e' : '#ef4444',
                  animationDelay: `${i * 0.2}s`,
                  boxShadow: '0 0 10px currentColor'
                }}
              />
            ))}
          </div>
          
          {/* Botón cerrar - MÁS VISIBLE */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-20 bg-white hover:bg-gray-100 text-red-600 rounded-full p-2 transition-all shadow-xl hover:scale-110 border-2 border-red-600"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Contenido - MÁS COMPACTO */}
          <div className="p-6 pt-8 text-white relative z-10">
            
            {/* Logo más pequeño */}
            <div className="flex justify-center mb-3">
              <div className="relative">
                <div className="w-14 h-14 bg-white rounded-full p-1 shadow-xl">
                  <Image
                    src="/logo.png"
                    alt="Paula Abad"
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                </div>
                <div className="absolute -top-2 -right-1 text-3xl animate-bounce">
                  🎅
                </div>
              </div>
            </div>
            
            {/* Badge de oferta */}
            <div className="flex justify-center mb-3">
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-red-800 px-3 py-1.5 rounded-full text-xs font-bold animate-pulse shadow-lg">
                <Gift className="w-3 h-3" />
                OFERTA EXCLUSIVA 2025
              </div>
            </div>
            
            {/* Título principal - más compacto */}
            <div className="text-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold mb-1.5 drop-shadow-lg">
                🎄 Plan Especial de Cierre de Año
              </h2>
              <p className="text-lg md:text-xl font-semibold text-yellow-300">
                Prepárate para el 2026
              </p>
            </div>
            
            {/* Oferta destacada - MÁS COMPACTA */}
            <div className="bg-white text-gray-900 rounded-xl p-4 mb-4 shadow-2xl border-4 border-yellow-400">
              <div className="text-center">
                {/* Emoji */}
                <div className="text-4xl mb-2 animate-bounce">
                  🎁
                </div>
                
                {/* Texto destacado - MÁS PEQUEÑO */}
                <div className="space-y-1.5">
                  <div className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-green-600 to-red-600 leading-tight">
                    Desarrollo de tu Web
                  </div>
                  <div className="text-xl font-bold text-gray-700">
                    +
                  </div>
                  <div className="text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-red-600 to-green-600 leading-tight">
                    Configuración de Catálogo de WhatsApp ¡Gratis!
                  </div>
                </div>
              </div>
            </div>
            
            {/* Call to Action - más compacto */}
            <div className="text-center mb-3">
              <div className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-full text-base shadow-xl animate-bounce cursor-pointer transition-colors">
                <MessageCircle className="w-5 h-5" />
                ¡Quiero esta oferta!
              </div>
            </div>
            
            {/* Términos y condiciones - más compacto */}
            <div className="text-center">
              <p className="text-xs text-white/80">
                Aplican términos y condiciones
              </p>
              <p className="text-xs font-semibold text-yellow-300 mt-0.5">
                ⏰ Promo por tiempo limitado
              </p>
            </div>
            
          </div>
          
          {/* Decoración inferior con regalos - más pequeña */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-around py-1.5 bg-gradient-to-t from-black/20 to-transparent pointer-events-none">
            <span className="text-xl animate-bounce" style={{ animationDelay: '0s' }}>🎁</span>
            <span className="text-xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎄</span>
            <span className="text-xl animate-bounce" style={{ animationDelay: '0.4s' }}>🎁</span>
            <span className="text-xl animate-bounce" style={{ animationDelay: '0.6s' }}>⭐</span>
            <span className="text-xl animate-bounce" style={{ animationDelay: '0.8s' }}>🎁</span>
          </div>
          
        </div>
      </div>
    </>
  )
}