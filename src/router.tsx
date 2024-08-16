import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import DashboardView from '@/views/DashboardView';
import AddClientView from './views/clients/AddClientView';
import EditClientView from './views/clients/EditClientView';
import SearchClientView from './views/clients/SearchClientView';
import HomeView from './views/HomeView';
import NotFoundView from './views/NotFoundView';
import RemindersView from './views/clients/RemindersView';
import ContactClientView from './views/clients/ContactClientView';
import ContactReportView from './views/clients/ContactReportView';
// import AddMassiveView from './views/clients/AddMassiveView';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<HomeView />} index />
          <Route path='/clients' element={<DashboardView />} />
          <Route path='/clients/create' element={<AddClientView />} />
          {/* <Route path='/clients/massive' element={<AddMassiveView />} /> */}
          <Route path='/clients/reminders' element={<RemindersView />} />
          <Route path='/clients/search' element={<SearchClientView />} />
          <Route path='/clients/reports' element={<ContactReportView />} />
          <Route path='/clients/:clientId/edit' element={<EditClientView />} />
          <Route path='/clients/:clientId/contact' element={<ContactClientView />} />
          <Route path='*' element={<NotFoundView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
