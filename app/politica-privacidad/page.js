export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4">
      <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 md:p-12">
        <h1 className="text-4xl font-bold text-white mb-8">Política de Privacidad</h1>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Información que recopilamos</h2>
            <p>
              Recopilamos la siguiente información cuando utilizas nuestro servicio de análisis web:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
              <li>Nombre completo</li>
              <li>Número de WhatsApp</li>
              <li>URL del sitio web a analizar</li>
              <li>Dirección IP</li>
              <li>Información del navegador</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Uso de la información</h2>
            <p>Utilizamos tu información para:</p>
            <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
              <li>Realizar el análisis técnico de tu sitio web</li>
              <li>Enviarte los resultados del análisis</li>
              <li>Contactarte con recomendaciones personalizadas</li>
              <li>Mejorar nuestros servicios</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Protección de datos</h2>
            <p>
              Tus datos están protegidos y almacenados de forma segura. No compartimos tu información 
              con terceros sin tu consentimiento explícito.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Tus derechos</h2>
            <p>Tienes derecho a:</p>
            <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
              <li>Acceder a tus datos personales</li>
              <li>Solicitar la corrección de datos incorrectos</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Revocar tu consentimiento en cualquier momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Contacto</h2>
            <p>
              Para consultas sobre estos términos:<br />
              <strong>Email:</strong><a href="mailto:paula@paulabad.tech"> paula@paulabad.tech</a><br />
              <strong>WhatsApp:</strong><a href="https://wa.me/573054434287?text=Hola%20Paula,%20quiero%20más%20información%20sobre%20tus%20servicios%20de%20optimización%20web."> +57 305 443 4287</a>
            </p>
          </section>
        </div>

        <div className="mt-8 pt-8 border-t border-purple-500/20">
          <a 
            href="/" 
            className="text-purple-400 hover:text-purple-300 underline"
          >
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}