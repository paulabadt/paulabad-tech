export default function TerminosCondiciones() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4">
      <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 md:p-12">
        <h1 className="text-4xl font-bold text-white mb-8">Términos y Condiciones</h1>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Aceptación de términos</h2>
            <p>
              Al utilizar nuestro servicio de análisis web, aceptas estos términos y condiciones en su totalidad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Descripción del servicio</h2>
            <p>
              Ofrecemos un servicio gratuito de análisis web que utiliza inteligencia artificial para 
              evaluar aspectos técnicos de sitios web, incluyendo rendimiento, SEO y accesibilidad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Limitaciones del servicio</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>El análisis es informativo y no constituye asesoramiento profesional definitivo</li>
              <li>Los resultados son aproximados y pueden variar</li>
              <li>El servicio gratuito se limita a un análisis por sitio web</li>
              <li>No garantizamos disponibilidad 24/7 del servicio</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Uso aceptable</h2>
            <p>Te comprometes a:</p>
            <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
              <li>Proporcionar información veraz y precisa</li>
              <li>No utilizar el servicio para fines ilegales</li>
              <li>No intentar acceder a áreas restringidas del sistema</li>
              <li>No realizar análisis masivos o automatizados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Propiedad intelectual</h2>
            <p>
              Todos los informes generados son propiedad de Paula Abad. Los clientes reciben 
              una licencia no exclusiva para uso personal del informe de su sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Limitación de responsabilidad</h2>
            <p>
              No nos hacemos responsables por decisiones tomadas basándose únicamente en nuestro 
              análisis. Recomendamos consultar con profesionales para decisiones importantes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. 
              Los cambios serán efectivos al publicarse en esta página.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Contacto</h2>
            <p>
              Para consultas sobre estos términos:<br />
              <strong>Email:</strong><a href="mailto:paula@paulabad.tech"> paula@paulabad.tech</a><br />
              <strong>WhatsApp:</strong><a href="https://wa.me/573113724894?text=Hola%20Paula,%20quiero%20más%20información%20sobre%20tus%20servicios%20de%20optimización%20web."> +57 311 372 4894</a>
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