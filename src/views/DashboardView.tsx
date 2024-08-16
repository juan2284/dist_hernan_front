import { useQuery } from "@tanstack/react-query";
import { getClients } from '@/api/ClientAPI';
import { Link, useLocation } from "react-router-dom";
import { ArrayCutType } from "../types";
import { HashLoader } from "react-spinners";
import HeadersTable from '@/components/HeadersTable';
import DeleteClientModal from '@/components/DeleteClientModal';
import SearchResult from '@/components/SearchResult';
import PaginacionClients from "@/components/PaginacionClients";

export default function DashboardView() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page') || 1;
  const cantDatos = 200;
  const indexStart = page === '1' ? 0 : (Number(page) - 1) * cantDatos;
  const indexEnd = (indexStart + cantDatos) - 1;

  const {data, isLoading} = useQuery({
    queryKey: ['clients'],
    queryFn: getClients
  });

  const contactsArray: ArrayCutType = [];

  data?.map(client => {
    if (data.indexOf(client) >= indexStart && data.indexOf(client) <= indexEnd) {
      contactsArray.push(client);
    }
  });

  if (isLoading) return (
    <>
      <div className="flex flex-row justify-center items-center p-32">
        <HashLoader color="#dc2626" />
      </div>
    </>
  );
  if (data) return (
    <>
      <h1 className="text-5xl font-black">Clientes</h1>
      <p className="text-lg font-light text-gray-500 mt-5">Gestiona tus Clientes</p>

      <nav className="my-5 ">
        <div className='m-0 p-0 flex md:flex-row justify-center items-center gap-2'>
          <Link
            className=" bg-red-400 hover:bg-red-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/clients/create'
          >Nuevo Cliente</Link>

          <Link
            className=" bg-red-400 hover:bg-red-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/clients/search'
          >Buscar Cliente</Link>
        </div>
      </nav>

      <div className="pb-2">
        <p className="text-xs text-orange-600 font-bold">{`Página: ${page}`}</p>
        <p className="text-xs text-orange-600 font-bold">{`Registros: ${indexStart + 1}-${indexEnd >= data.length ? data.length : indexEnd + 1} de ${data.length}`}</p>
      </div>

      <PaginacionClients cantData={data.length} />

      {data.length ? (
        <>        
          <HeadersTable />
          <SearchResult results={contactsArray} />
        </>

      ) : (
        <p className="text-center py-20">No hay clientes aún {''}
          <Link
            to='/clients/create'
            className=" text-red-600 font-bold"
          >Añadir Cliente</Link>
        </p>
      )}

      <DeleteClientModal />
    </>
  );
}