import { addClientsMassive } from "@/api/ClientAPI";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddMassiveView() {

  const {register, handleSubmit} = useForm();

  const { mutate } = useMutation({
    mutationFn: addClientsMassive,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data);
    }
  });

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    mutate();
    console.log(e.target);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black">Añadir Listado Masivo</h1>
        <p className="text-lg font-light text-gray-500 mt-5">Selecciona el archivo de carga con los datos. </p>
        <p className="text-lg font-light text-gray-500">Debe tener extensión .xls, .xlsx o .csv</p>
        <p className="text-lg font-light text-gray-500">Max. 2Mb por archivo.</p>

        <nav className="my-5 flex flex-col md:flex-row justify-between items-center">
          <Link
            className=" bg-red-400 hover:bg-red-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/clients'
          >Volver a Clientes</Link>
        </nav>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg flex flex-col justify-center items-center"
          noValidate
          encType="multipart/form-data"
          method="POST"
        >

          <input
            id="file"
            type="file"
            accept="application/vnd.ms-excel, text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            className="w-full text-sm p-2 mb-2 border-2 border-amber-500"
            onChange={(e) => handleForm(e)}
          />

          <input
            type="submit"
            value='Cargar Archivo'
            className=" bg-red-600 hover:bg-red-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}