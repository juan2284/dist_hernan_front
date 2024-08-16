import { createClient } from "@/api/ClientAPI";
import ClientForm from "@/components/ClientForm";
import { ClientFormData } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function AddClientView() {
  const navigate = useNavigate();
  const initialValues: ClientFormData = {
    name: "",
    last_name: "",
    telephone: "",
    vehicle: "",
    type_oil: "",
    brand_oil: "",
    filter: "",
    mileage: "",
    service_date: ""
  };

  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues});
  const { mutate } = useMutation({
    mutationFn: createClient,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate('/clients');
    }
  });

  const handleForm = (formData: ClientFormData) => mutate(formData);

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black">Añadir Cliente</h1>
        <p className="text-lg font-light text-gray-500 mt-5">Llena el siguiente formulario para agregar un cliente</p>

        <nav className="my-5 flex flex-col md:flex-row justify-between items-center">
          <Link
            className=" bg-red-400 hover:bg-red-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/clients'
          >Volver a Clientes</Link>

          {/* <Link
            className=" bg-red-400 hover:bg-red-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/clients/massive'
          >Carga Masiva</Link> */}
        </nav>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >

          <ClientForm
            register={register}
            errors={errors}
          />

          <input
            type="submit"
            value='Añadir Cliente'
            className=" bg-red-600 hover:bg-red-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
