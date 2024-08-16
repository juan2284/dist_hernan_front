import { getClientByTelephone } from "@/api/ClientAPI";
import DeleteClientModal from "@/components/DeleteClientModal";
import ErrorMessage from "@/components/ErrorMessage";
import HeadersTable from "@/components/HeadersTable";
import SearchResult from "@/components/SearchResult";
import { SearchTelephoneForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link} from "react-router-dom";
import { HashLoader } from "react-spinners";

export default function SearchClientView() {
  const initialValues: SearchTelephoneForm = {
    telephone: ''
  };

  const { register, handleSubmit, formState: {errors}} = useForm({ defaultValues: initialValues });

  const mutation = useMutation({
    mutationFn: getClientByTelephone
  });
  const handleSearchTelephone = async (formData: SearchTelephoneForm) => {
    mutation.mutate(formData.telephone);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black">Buscar Cliente</h1>
        <p className="text-lg font-light text-gray-500 mt-5">Ingresa el número de teléfono del cliente que deseas buscar</p>

        <nav className="my-5 ">
          <Link
            className=" bg-red-400 hover:bg-red-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/clients'
          >Volver a Clientes</Link>
        </nav>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg flex md:flex-row justify-start items-center gap-2"
          onSubmit={handleSubmit(handleSearchTelephone)}
          noValidate
        >
          <label htmlFor="telephone" className="w-1/5 text-sm uppercase font-bold text-center">
            Teléfono:
          </label>
          <input
            id="telephone"
            className="w-3/5 p-3 border border-gray-200"
            type="text"
            placeholder="Teléfono del Cliente"
            {...register("telephone", {
              required: "El Teléfono del Cliente es obligatorio",
            })}
          />

          {errors.telephone && (
            <ErrorMessage>{errors.telephone.message}</ErrorMessage>
          )}

          <input
            type="submit"
            value='Buscar'
            className="w-1/5 bg-red-600 hover:bg-red-700 p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>        
      </div>

      {/* Poner condicional para ocultar cuando no haya resultados */}
      {mutation.isPending && (
        <div className="flex flex-row justify-center items-center p-32">
          <HashLoader color="#dc2626" />
        </div>
      )}
      {mutation.error && <p className="text-center mt-10">{mutation.error.message}</p>}
      {mutation.data?.length ? (
          <>
            <HeadersTable />
            <SearchResult results={mutation.data} />
          </>
      ) : (<p className="mt-10 font-bold text-lg text-red-600 text-center">No hay resultados que mostrar</p>)}

      <DeleteClientModal />
    </>
  )
}
