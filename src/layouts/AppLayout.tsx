import { Link, Outlet } from 'react-router-dom';
import Logo from '@/components/Logo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavMenu from '@/components/NavMenu';

export default function AppLayout() {
  return (
    <>
      <header className='bg-gradient-to-r from-amber-500 from-2% via-orange-600 via-10% to-red-600 to-30% py-3'>
        <div className=' max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-around items-center'>
          <div className='w-64'>
            <Link to={'/'} className='flex flex-col justify-center items-center'>
              <Logo />
              <h1 className='text-white font-bold text-xl'>Distribudora Hernán 2050</h1>
            </Link>
          </div>

          <NavMenu />
        </div>
      </header>

      <section className='max-w-screen-2xl mx-auto mt-10 p-5'>
        <Outlet />
      </section>

      <footer className='py-5'>
        <p className='text-center text-xs'>
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </footer>

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  )
}