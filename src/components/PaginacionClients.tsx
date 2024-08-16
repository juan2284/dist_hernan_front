import { useLocation, useNavigate } from "react-router-dom";

type PaginacionClientsProps = {
  cantData: number;
};

export default function PaginacionClients({cantData}: PaginacionClientsProps) {  
  const botonesPag = Math.ceil(cantData / 200);
  const paginacionArray: number[] = [];
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activePage = queryParams.get('page')! || 1;
  
  const active = 'bg-red-500 text-white';
  
  for (let i = 0; i < botonesPag; i++) {
    paginacionArray.push(i + 1);
  }

  return (
    <>
      <nav className="w-full flex-wrap flex flex-row justify-start items-center gap-2">
        {paginacionArray.map(number => (
          <button
            type="button"
            key={number}
            className={activePage.toString() === number.toString() ? active + ` border-2 border-red-500 px-3 py-2 hover:bg-red-500 hover:text-white font-bold` : `border-2 border-red-500 px-2 py-1 hover:bg-red-500 hover:text-white font-bold`}
            onClick={() => navigate(location.pathname + `?page=${number}`)}
          >
            {number}
          </button>
        ))}
      </nav>
    </>
  );
}