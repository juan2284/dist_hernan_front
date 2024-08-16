import { getReminders } from "@/api/ClientAPI";
import DeleteClientModal from "@/components/DeleteClientModal";
import HeadersTable from "@/components/HeadersTable";
import SearchResult from "@/components/SearchResult";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";

export default function RemindersView() {

  const { data, isLoading } = useQuery({
    queryKey: ['reminders'],
    queryFn: getReminders
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
      <h1 className="text-5xl font-black">Recordatorios</h1>
      <p className="text-lg font-light text-gray-500 mt-5">Gestiona los recordatorios pendientes</p>

      <nav className="my-5 ">
        <Link
          className=" bg-red-400 hover:bg-red-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          to='/clients'
        >Volver a Clientes</Link>
      </nav>

      {data.length ? (
        <>
          <HeadersTable />
          <SearchResult results={data} />
        </>

      ) : (
        <p className="text-center py-20">No hay recordatorios <span className='text-red-600 font-bold'>Pendientes</span></p>
      )}

      <DeleteClientModal />
    </>
  );
}