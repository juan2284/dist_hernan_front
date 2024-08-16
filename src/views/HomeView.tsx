import { Link } from "react-router-dom";


export default function HomeView() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2">

        <img src="/icon.png" alt="Logotipo Distribuidora Hernán 2050" className="w-60 mb-10 p-2" />

        <div className="flex flex-col md:flex-row justify-center items-center gap-2">
          <Link
            className="bg-amber-400 hover:bg-amber-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/clients'
          >Listado de Clientes</Link>

          <Link
            className="bg-orange-400 hover:bg-orange-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/clients/create'
          >Agregar Cliente</Link>

          <Link
            className="bg-red-400 hover:bg-red-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/clients/search'
          >Buscar Cliente</Link>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-2">
          <Link
            className="bg-orange-400 hover:bg-orange-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/clients/reminders'
          >Recordatorios</Link>

          <Link
            className="bg-red-400 hover:bg-red-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/clients/reports'
          >Reportes Contacto</Link>
        </div>

      </div>
    </>
  );
}