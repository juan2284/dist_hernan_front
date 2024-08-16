import { getClientById } from "@/api/ClientAPI";
import ContactClientForm from "@/components/ContactClientForm";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";

export default function ContactClientView() {
  const params = useParams();
  const clientId = params.clientId!;

  const { data, isLoading, isError} = useQuery({
    queryKey: ['contactClient', clientId],
    queryFn: () => getClientById(clientId),
    retry: false
  });

  if (isLoading) return (
    <>
      <div className="flex flex-row justify-center items-center p-32">
        <HashLoader color="#dc2626" />
      </div>
    </>
  );
  if (isError) return <Navigate to={'/404'}/>;
  if (data) return <ContactClientForm data={data} clientId={clientId}/>;
}