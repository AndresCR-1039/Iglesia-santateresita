import Image from "next/image";

export default function NosotrosPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold font-outfit text-blue-900 mb-6">Nuestra Historia</h1>
        <div className="h-1 w-24 bg-blue-900 mx-auto rounded-full mb-10"></div>
        
        <p className="text-xl text-gray-600 leading-relaxed font-light">
          La Parroquia Santa Teresita del Niño Jesús es un corazón espiritual en el centro de nuestra comunidad.
        </p>
      </div>

      <div className="space-y-12 text-gray-700 leading-relaxed font-inter">
        <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
          <h2 className="text-2xl font-bold font-outfit text-blue-900 mb-4">Nuestra Patrona</h2>
          <p>
            Santa Teresa del Niño Jesús, conocida como la "Pequeña Flor", nos enseña el "caminito" de la infancia espiritual. 
            Su vida de humildad, amor y confianza absoluta en Dios es la brújula que guía nuestra parroquia.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-outfit text-blue-900 mb-4">Misión</h2>
          <p>
            Evangelizar con alegría, servir a los más necesitados y construir una comunidad fraterna donde todos 
            puedan experimentar el amor de Dios a través de la liturgia y la acción social.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-outfit text-blue-900 mb-4">Nuestros Sacerdotes</h2>
          <p>
            Contamos con un equipo pastoral dedicado a acompañar a las familias en todos los momentos de la vida, 
            desde los sacramentos iniciales hasta el acompañamiento en la madurez y la dificultad.
          </p>
        </section>
      </div>
    </main>
  );
}
