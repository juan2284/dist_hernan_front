export default function HeadersContact() {
  return (
    <>
      <ul role="list" className="bg-red-500 mt-10 shadow-lg">
        <li className="flex justify-between gap-x-6 px-3 py-3">
          <div className="w-full flex min-w-0">
            <div className="w-full min-w-0 flex flex-row gap-x-4 justify-center items-center">
              <p className="w-full text-white text-sm uppercase font-bold border-e-2 border-e-red-400 pr-2 text-center">
                Nombre
              </p>
              <p className="w-full text-white text-sm uppercase font-bold border-e-2 border-e-red-400 pr-2 text-center">
                Apellido
              </p>
              <p className="w-full text-white text-sm uppercase font-bold border-e-2 border-e-red-400 pr-2 text-center">
                Teléfono
              </p>
              <p className="w-full text-white text-sm uppercase font-bold border-e-2 border-e-red-400 pr-2 text-center">
                Fecha Servicio
              </p>
              <p className="w-full text-white text-sm uppercase font-bold border-e-2 border-e-red-400 pr-2 text-center">
                Contacto
              </p>
            </div>
          </div>
        </li>
      </ul>
    </>
  )
}
