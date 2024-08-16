import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getContacts } from "@/api/ClientAPI";
import { ContactArray } from "@/types/index";
import { HashLoader } from "react-spinners";
import HeadersContact from "@/components/HeadersContact";
import ContactFilter from "@/components/ContactFilter";
import { formatDate } from "@/utils/utils";
import PaginacionClients from "@/components/PaginacionClients";

export default function ContactReportView() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const opcion = queryParams.get('opcion') || 'todos';
  const fechaHoy = new Date().toISOString();
  const page = queryParams.get('page') || 1;
  const cantDatos = 200;
  const indexStart = page === '1' ? 0 : (Number(page) - 1) * cantDatos;
  const indexEnd = (indexStart + cantDatos) - 1;

  const {data, isLoading} = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts
  });

  const arrayCut: ContactArray = [];

  if (opcion === 'todos') {
    data?.map(clientData => {
      arrayCut.push(clientData);
    });
  }

  if (opcion === 'contactado') {
    data?.map(clientData => {
      if (clientData.result !== 'S/W' && clientData.result !== 'NE' && clientData.result !== 'NI' &&clientData.result !== 'YC') {
        arrayCut.push(clientData);
      }
    });
  }

  if (opcion === 'diario') {
    data?.map(clientData => {
      if (formatDate(clientData.createdAt) === formatDate(fechaHoy)) {
        arrayCut.push(clientData);
      }
    });
  }

  data?.map((clientData) => {
    if (clientData.result === opcion) {
      arrayCut.push(clientData);
    }
  });

  const contactsArray: ContactArray = [];

  arrayCut.map(client => {
    if (arrayCut.indexOf(client) >= indexStart && arrayCut.indexOf(client) <= indexEnd) {
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
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black">Reporte de Contactos por Resultado</h1>
        <p className="text-lg font-light text-gray-500">Selecciona un resultado para ver el reporte de contactos</p>

        <nav className="my-5 mt-5">
          <Link
            className=" bg-red-400 hover:bg-red-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/clients'
          >Volver a Clientes</Link>
        </nav>

        <div className="pb-2">
          <p className="text-xs text-orange-600 font-bold">{`Página: ${page}`}</p>
          <p className="text-xs text-orange-600 font-bold">{`Registros: ${indexStart + 1}-${indexEnd >= contactsArray.length ? contactsArray.length : indexEnd + 1} de ${contactsArray.length}`}</p>
        </div>

        <PaginacionClients cantData={contactsArray.length} />

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={() => console.log('Buscando')}
          noValidate
        >

          <div className="mb-5 space-y-3">
            <label htmlFor="contact" className="text-sm uppercase font-bold">
              Selecciona un motivo:
            </label>
            <select
              id="contact"
              defaultValue={'Seleccione'}
              className="w-full p-3  border border-gray-200"
              onChange={(e) => navigate(location.pathname + `?opcion=${e.target.value}`)}
            >
              <option value="Seleccione" disabled>Seleccione</option>
              <option value={'todos'}>Todos</option>
              <option value={'diario'}>Del Día</option>
              <option value={'contactado'}>Contacto Exitoso</option>
              <option value={'S/W'}>Sin WhatsApp</option>
              <option value={'NE'}>Número Equivocado</option>
              <option value={'NI'}>Número Incompleto</option>
              <option value={'YC'}>Ya Contactado</option>
            </ select>

            {/* {errors.contact && (
              <ErrorMessage>{errors.contact.message}</ErrorMessage>
            )} */}
          </div>
        </form>
        
        {contactsArray.length ? (
          <>
            <HeadersContact />
            <ContactFilter arrayCut={contactsArray} />
          </>

        ) : (
          <p className="text-center py-20">No hay <span className="text-red-600 font-bold">contactos</span> con este resultado {''}
          </p>
        )}

      </div>
    </>
  );
}