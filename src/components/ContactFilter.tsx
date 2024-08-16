import { ContactArray } from "@/types/index";
import { formatDate } from "@/utils/utils";

type ContactFilterProps = {
  arrayCut: ContactArray;
};

export default function ContactFilter({arrayCut}: ContactFilterProps) {
  return (
    <>
      <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-2 mb-10 bg-white shadow-lg">
        {arrayCut.map((clientData) => (
          <li key={clientData._id} className="flex justify-between gap-x-6 px-3 py-3">
            <div className="w-full flex min-w-0">
              <div className="w-full min-w-0 flex flex-row gap-x-4 justify-center items-center">
                <p className="w-full text-gray-600 cursor-pointer text-sm font-bold border-e-2 border-e-gray-200 pr-2 text-center">
                  {clientData.client.name}
                </p>
                <p className="w-full text-gray-600 cursor-pointer text-sm font-bold border-e-2 border-e-gray-200 pr-2 text-center">
                  {clientData.client.last_name}
                </p>
                <p className="w-full text-gray-600 cursor-pointer text-sm font-bold border-e-2 border-e-gray-200 pr-2 text-center">
                  {clientData.client.telephone}
                </p>
                <p className="w-full text-gray-600 cursor-pointer text-sm font-bold border-e-2 border-e-gray-200 pr-2 text-center">
                  {formatDate(clientData.client.service_date)}
                </p>
                <p className="w-full text-gray-600 cursor-pointer text-sm font-bold border-e-2 border-e-gray-200 pr-2 text-center">
                  {clientData.result}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
