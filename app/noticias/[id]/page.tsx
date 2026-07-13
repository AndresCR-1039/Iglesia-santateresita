import { getNewsById } from "@/services/newsService";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NoticiaDetalle({ params }: Props) {
  const { id } = await params;
  
  let noticia;
  try {
    noticia = await getNewsById(id);
  } catch (e) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/noticias" className="inline-flex items-center text-blue-900 hover:text-blue-700 mb-8 font-medium">
        <ChevronLeft size={20} /> Volver a noticias
      </Link>

      <div className="relative h-[25rem] w-full rounded-3xl overflow-hidden shadow-2xl mb-10">
        <Image
          src={noticia.imagen_url || "/imagen.png"}
          alt={noticia.titulo}
          fill
          className="object-cover"
          priority
        />
      </div>

      <header className="mb-10 text-center">
        <div className="flex items-center justify-center gap-2 text-gray-500 mb-4 font-medium uppercase tracking-widest text-xs">
          <Calendar size={16} />
          {new Date(noticia.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-outfit text-blue-900 leading-tight">
          {noticia.titulo}
        </h1>
      </header>

      <div 
        className="prose prose-lg max-w-none prose-blue prose-headings:font-outfit text-gray-700 leading-relaxed font-inter"
        dangerouslySetInnerHTML={{ __html: noticia.contenido }}
      />
    </article>
  );
}
