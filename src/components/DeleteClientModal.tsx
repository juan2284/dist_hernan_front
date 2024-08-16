import { deleteClient } from "@/api/ClientAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function DeleteClientModal() {

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const deleteClientId = queryParams.get('deleteClient')!;
  const show = deleteClientId ? true : false;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteClient,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['editClient', deleteClientId] });
      navigate('/clients');
    }
  });

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">

                <Dialog.Title
                  as="h3"
                  className="font-black text-4xl  my-5"
                >Eliminar Cliente </Dialog.Title>

                <p className="text-lg font-light">Confirma que deseas eliminar este {''}
                  <span className="text-red-600">Cliente</span>
                </p>

                <div className="flex md:flex-row justify-center items-center gap-2">
                  <button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 w-full p-3 mt-2 text-white uppercase font-bold cursor-pointer transition-colors"
                    onClick={() => mutate(deleteClientId)}
                  >Eliminar Cliente</button>

                  <button
                    type="button"
                    className="bg-gray-600 hover:bg-gray-700 w-full p-3 mt-2 text-white uppercase font-bold cursor-pointer transition-colors"
                    onClick={() => navigate(location.pathname, { replace: true })}
                  >Cancelar</button>                  
                </div>

                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
