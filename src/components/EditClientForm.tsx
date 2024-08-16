import { Link, useNavigate } from "react-router-dom";
import { Client, ClientFormData } from "../types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateClient } from "@/api/ClientAPI";
import ClientForm from "./ClientForm";
import { formatDate } from "@/utils/utils";

type EditClientFormProps = {
  data: ClientFormData;
  clientId: Client['_id'];
};

export default function EditClientForm({data, clientId}: EditClientFormProps) {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
    name: data.name,
    last_name: data.last_name,
    telephone: data.telephone,
    vehicle: data.vehicle,
    type_oil: data.type_oil,
    brand_oil: data.brand_oil,
    filter: data.filter,
    mileage: data.mileage,
    service_date: formatDate(data.service_date)
  }});

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateClient,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['clients']});
      queryClient.invalidateQueries({queryKey: ['editClient', clientId]});
      toast.success(data);
      navigate('/clients');
    }
  });

  const handleForm = (formData: ClientFormData) => {
    const data = {
      formData,
      clientId
    }
    mutate(data);
  };
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black">Editar Cliente</h1>
        <p className="text-lg font-light text-gray-500 mt-5">Llena el siguiente formulario para editar los datos del cliente</p>

        <nav className="my-5 ">
          <Link
            className=" bg-red-400 hover:bg-red-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/clients'
          >Volver a Clientes</Link>
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
            value='Guardar Cambios'
            className=" bg-red-600 hover:bg-red-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}