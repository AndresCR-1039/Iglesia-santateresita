import { Heart, Building, CheckCircle } from "lucide-react";

export default function DonacionesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
      <div className="bg-blue-50/50 p-12 rounded-[3rem] border border-blue-100 mb-16">
        <div className="w-20 h-20 bg-blue-900 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
          <Heart size={40} fill="white" />
        </div>
        <h1 className="text-4xl font-bold font-outfit text-blue-900 mb-4">Apoya Nuestra Obra</h1>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Tu generosidad permite que la Parroquia Santa Teresita continúe su misión evangelizadora 
          y sus obras de caridad con los más necesitados de la comunidad.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-16">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <Building className="text-blue-900" size={24} />
            <h3 className="text-xl font-bold text-gray-900 font-outfit">Transferencia Bancaria</h3>
          </div>
          <ul className="space-y-4 text-gray-600">
            <li><strong>Banco:</strong> Banco Ejemplo</li>
            <li><strong>Tipo de Cuenta:</strong> Ahorros</li>
            <li><strong>Número:</strong> 123-456-789</li>
            <li><strong>NIT:</strong> 800.000.000-0</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">PSE</div>
            <h3 className="text-xl font-bold text-gray-900 font-outfit">Pago en Línea (PSE)</h3>
          </div>
          <p className="text-gray-600 mb-8 text-sm">
            Realiza tus ofrendas de forma segura y rápida a través de la plataforma PSE desde cualquier bando.
          </p>
          <button className="mt-auto bg-blue-900 text-white w-full py-4 rounded-2xl font-bold hover:bg-blue-800 transition-colors shadow-lg">
            Ir a Pagar con PSE
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-3xl flex flex-col sm:flex-row items-center gap-6 justify-center">
        <div className="flex -space-x-2">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-blue-100"></div>
          ))}
        </div>
        <p className="text-gray-500 text-sm font-medium flex items-center gap-2">
          <CheckCircle className="text-green-500" size={16} />
          Más de 500 donaciones recibidas este mes.
        </p>
      </div>
    </main>
  );
}
