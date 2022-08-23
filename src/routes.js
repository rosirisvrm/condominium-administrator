import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import { Login } from './pages/Login';
import { Page404 } from './pages/Page404';
import DashboardApp from './pages/DashboardApp';
// import { Landing } from './pages/Landing';
import { Accounting } from './pages/Accounting';
import { Users } from './pages/Users';
import { Groups } from './pages/Groups';
import { Employees } from './pages/Employees';
import { Providers } from './pages/Providers';
import { News } from './pages/News';
import { Notifications } from './pages/Notifications';
import { Events } from './pages/Events';
import { Surveys } from './pages/Surveys';
import { Visits } from './pages/Visits';
import { RequestsSuggestions } from './pages/RequestsSuggestions';
import { ExternalCommunication } from './pages/ExternalCommunication';
import { CustomizeSite } from './pages/CustomizeSite';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // {
    //   path: '/',
    //   element: <Landing />,
    // },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'home', element: <DashboardApp /> },
        { path: 'contabilidad', element: <Accounting /> },
        { path: 'usuarios', element: <Users /> },
        { path: 'grupos', element: <Groups /> },
        { path: 'empleados', element: <Employees /> },
        { path: 'proveedores', element: <Providers /> },
        { path: 'noticias', element: <News /> },
        { path: 'notificaciones', element: <Notifications /> },
        { path: 'eventos', element: <Events /> },
        { path: 'encuestas', element: <Surveys /> },
        { path: 'visitas', element: <Visits /> },
        { path: 'solicitudes-sugerencias', element: <RequestsSuggestions /> },
        { path: 'comunicacion-externa', element: <ExternalCommunication /> },
        { path: 'personalizar-sitio', element: <CustomizeSite /> },
        { path: 'perfil', element: <Profile /> },
        { path: 'ajustes', element: <Settings /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/home" /> },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
