import { Link } from "react-router-dom";

export default function NotFoundView() {
  return (
    <>
      <img src="/icon.png" alt="Logotipo Distribuidora Hernán 2050" className="w-60 mb-10 p-2 m-auto" />

      <h1 className="font-black text-center text-4xl">Error <span className="text-red-500">404</span></h1>
      <h1 className="font-light text-center text-2xl">Página No Encontrada</h1>
      <p className="mt-10 text-center">
        Tal vez quieras volver al {' '}
        <Link className=" text-red-500 font-bold" to={'/'}>Inicio</Link>
      </p>
    </>
  );
}