import { Menu, Transition } from "@headlessui/react";
import { ArrayCutType } from "../types";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "@/utils/utils";

type SearchResultProps = {
  results: ArrayCutType;
};

export default function SearchResult({results}: SearchResultProps) {
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <>
      <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-2 mb-10 bg-white shadow-lg">
        {results.map((client) => (
          <li key={client._id} className="flex justify-between gap-x-6 px-3 py-3">
            <div className="w-full flex min-w-0">
              <div className="w-full min-w-0 flex flex-row gap-x-4 justify-center items-center">
                <p className="w-full text-gray-600 cursor-pointer text-sm font-bold border-e-2 border-e-gray-200 pr-2 text-center">
                  {client.name}
                </p>
                <p className="w-full text-gray-600 cursor-pointer text-sm font-bold border-e-2 border-e-gray-200 pr-2 text-center">
                  {client.last_name}
                </p>
                <p className="w-full text-gray-600 cursor-pointer text-sm font-bold border-e-2 border-e-gray-200 pr-2 text-center">
                  {client.telephone}
                </p>
                <p className="w-full text-gray-600 cursor-pointer text-sm font-bold border-e-2 border-e-gray-200 pr-2 text-center">
                  {client.vehicle}
                </p>
                <p className="w-full text-gray-600 cursor-pointer text-sm font-bold border-e-2 border-e-gray-200 pr-2 text-center">
                  {client.type_oil}
                </p>
                <p className="w-full text-gray-600 cursor-pointer text-sm font-bold border-e-2 border-e-gray-200 pr-2 text-center">
                  {client.brand_oil}
                </p>
                <p className="w-full text-gray-600 cursor-pointer text-sm font-bold border-e-2 border-e-gray-200 pr-2 text-center">
                  {client.filter}
                </p>
                <p className="w-full text-gray-600 cursor-pointer text-sm font-bold border-e-2 border-e-gray-200 pr-2 text-center">
                  {client.mileage}
                </p>
                <p className="w-full text-gray-600 cursor-pointer text-sm font-bold border-e-2 border-e-gray-200 pr-2 text-center">
                  {formatDate(client.service_date)}
                </p>
                <div className="w-full text-gray-600 cursor-pointer text-sm font-bold border-e-2 border-e-gray-200 pr-2">
                  <div className="flex shrink-0 justify-center items-center gap-x-6">
                    <Menu as="div" className="relative flex-none">
                      <Menu.Button className="block text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <Bars3Icon className="h-5 w-5" aria-hidden="true" />
                      </Menu.Button>
                      <Transition as={Fragment} enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Menu.Items
                          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                        >
                          <Menu.Item>
                            <Link to={`/clients/${client._id}/contact`}
                              className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                              Contacto
                            </Link>
                          </Menu.Item>

                          <Menu.Item>
                            <Link to={`/clients/${client._id}/edit`}
                              className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                              Editar Cliente
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <button
                              type='button'
                              className='block px-3 py-1 text-sm leading-6 text-red-500'
                              onClick={() => navigate(location.pathname + `?deleteClient=${client._id}`)}
                            >
                              Eliminar Cliente
                            </button>
                          </Menu.Item>

                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}