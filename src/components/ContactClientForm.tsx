import { Link, useNavigate } from "react-router-dom";
import { Client, ContactData, ContactFormData } from "../types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateContact } from "@/api/ClientAPI";
import { toast } from "react-toastify";
import ErrorMessage from "./ErrorMessage";
import { formatDate } from "@/utils/utils";

type ContactClientFormProps = {
  data: ContactFormData;
  clientId: Client['_id'];
}

export default function ContactClientForm({data, clientId}: ContactClientFormProps) {
  const navigate = useNavigate();
  const fecha = formatDate(new Date().toDateString());

  const horaActual = new Date().getHours();

  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
    contact: data.contact
  }});

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateContact,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['clients']});
      queryClient.invalidateQueries({queryKey: ['contactClient', clientId]});
      toast.success(data);
      navigate('/clients/reminders');
    }
  });

  const handleForm = (formData: ContactData) => {
    const data = {
      formData,
      clientId
    }
    mutate(data);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black">Contactar Cliente</h1>
        <p className="text-lg font-light text-gray-500">Recuerda seleccionar una respuesta para el contacto.</p>

        <nav className="my-5 mt-5">
          <Link
            className=" bg-red-400 hover:bg-red-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/clients/reminders'
          >Volver a Recordatorios</Link>
        </nav>

        {data.contact !== '-' ? <div className="w-full text-center font-bold p-2 bg-amber-400">Este Cliente ya fue contactado.</div> : null}

        <h1 className="text-xl font-black">Datos:</h1>
        <p className="text-xs font-light text-gray-600">Servicio realizado el {formatDate(data.service_date)}</p>

        <div className="w-full flex flex-col md:flex-row justify-start items-center mt-1">
          <div className="w-full md:w-2/12 text-center border-2 border-red-600 bg-red-600 text-white text-sm font-bold p-3">Nombre:</div>
          <div className="w-full md:w-10/12 border-2 border-red-600 p-3 text-sm">{data.name} {data.last_name}</div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-start items-center mt-1">
          <div className="w-full md:w-2/12 text-center border-2 border-red-600 bg-red-600 text-white text-sm font-bold p-3">Teléfono:</div>
          <div className="w-full md:w-10/12 border-2 border-red-600 p-3 text-sm">{data.telephone}</div>
        </div>

        <div className="w-full flex flex-col justify-start items-center mt-1">
          <div className="w-full text-center border-2 border-red-600 bg-red-600 text-white text-sm font-bold p-3">Mensaje:</div>
          <div className="w-full border-2 border-red-600 p-3 text-sm">
            <p>
              {horaActual < 12 ? 'Buenos días' : 'Buenas tardes'} {' '}
              {data.name === '---' ? null : (
                <>
                  Sr@ <span className="capitalize">{data.name.toLowerCase()}</span>.
                </>
              )}
              <br />
              <br />
              Hemos registrado que su vehículo {' '}
              {data.vehicle === '---' ? null : (
                <>
                  <span className="font-bold">{data.vehicle}</span>
                </>
              )} {' '}
              tuvo un cambio de aceite el día <span className="font-bold">{formatDate(data.service_date)}</span>, {' '}
              {data.brand_oil === '---' ? null : (
                <>
                  de la marca <span className="font-bold">{data.brand_oil}</span>
                </>
              )} {' '}
              {data.type_oil === '---' ? null : (
                <>                
                  de tipo <span className="font-bold">{data.type_oil}</span>
                </>
              )}.
              <br />
              <br />
              Este cambio se hizo hace mas de dos meses, por lo que le invitamos a asistir a nuestro local para hacer el mantenimiento correspondiente.
              <br />
              <br />
              Además por este mes estaremos ofreciendo diferentes servicios, combos y ofertas, y con la compra de nuestros aceites tendrá la mano de obra totalmente gratis.
              <br />
              <br />
              Viaja tranquil@ y segur@ con tu vehículo en óptimas condiciones.
              <br />
              <br />
              Le deseamos un feliz día.
              <br />
              <span className="font-bold">Distribuidora Hernán 2050</span>
            </p>
          </div>
        </div>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >

          <div className="mb-5 space-y-3">
            <label htmlFor="contact" className="text-sm uppercase font-bold">
              Resultado del Contacto:
            </label>
            <select
              id="contact"
              defaultValue={data.contact}
              className="w-full p-3  border border-gray-200"
              {...register("contact", {
                required: "Debes seleccionar un motivo de contacto para guardar los cambios.",
              })}
            >
              <option value="" disabled>Seleccione</option>
              <option value={data.contact}>{data.contact}</option>
              <option value={fecha}>Contactado Hoy</option>
              <option value={'S/W'}>Sin WhatsApp</option>
              <option value={'NE'}>Número Equivocado</option>
              <option value={'NI'}>Número Incompleto</option>
              <option value={'YC'}>Ya Contactado</option>
            </ select>

            {errors.contact && (
              <ErrorMessage>{errors.contact.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value='Registrar Contacto'
            className=" bg-red-600 hover:bg-red-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}