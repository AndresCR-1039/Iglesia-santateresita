import { getNews } from "@/services/newsService";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";

export default async function NoticiasPage() {
  const news = await getNews();

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold font-outfit text-blue-900 mb-4 text-center">Noticias y Actualidad</h1>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Mantente al día con los eventos, anuncios y reflexiones de nuestra comunidad parroquial.
      </p>

      {news.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400">No hay noticias publicadas en este momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <article key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
              <div className="relative h-48">
                <Image
                  src={item.imagen_url || "/imagen.png"}
                  alt={item.titulo}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                  <Calendar size={14} />
                  {new Date(item.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{item.titulo}</h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {item.resumen}
                </p>
                <Link
                  href={`/noticias/${item.id}`}
                  className="mt-auto text-blue-900 font-semibold text-sm hover:text-blue-700 inline-flex items-center gap-1"
                >
                  Leer noticia completa →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
