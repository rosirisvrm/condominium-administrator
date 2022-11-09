import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import { Login } from './pages/Login';
import Products from './pages/Products';
import Blog from './pages/Blog';

import { Page404 } from './pages/Page404';
import { Landing } from './pages/Landing';
import { DashboardApp } from './pages/DashboardApp';
import { Ingresos, Egresos, CreatePay, PayDetail } from './pages/Accounting';
import { Users, CreateUser, UserDetail } from './pages/Users';

// import { Groups } from './pages/Groups';
// import { Permissions } from './pages/Permissions';

import { Employees } from './pages/Employees';
import { Providers } from './pages/Providers';
import { News } from './pages/News';
import { Notifications } from './pages/Notifications';
import { Events } from './pages/Events';
import { Surveys } from './pages/Surveys';
import { Visits, CreateVisit, VisitDetail } from './pages/Visits';
import { Requests, CreateRequest, RequestDetail } from './pages/Requests';
import { ExternalCommunication } from './pages/ExternalCommunication';
import { CustomizeSite } from './pages/CustomizeSite';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Landing />,
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'home', element: <DashboardApp /> },

        { 
          path: 'contabilidad',
          children: [
            { path: 'egresos', element: <Egresos /> },
            { path: 'ingresos', element: <Ingresos /> },
            { path: 'enviar-pago', element: <CreatePay /> },
            { path: 'detalle-pago', element: <PayDetail /> },
          ] 
        },
        
        { path: 'usuarios', element: <Users /> },
        { path: 'usuarios/crear', element: <CreateUser /> },
        { path: 'usuarios/editar/:id', element: <CreateUser /> },
        { path: 'usuarios/detalle/:id', element: <UserDetail /> },


        { path: 'roles', element: <Products /> },
        { path: 'permisos', element: <Blog /> },
        { path: 'empleados', element: <Employees /> },
        { path: 'proveedores', element: <Providers /> },
        { path: 'noticias', element: <News /> },
        { path: 'notificaciones', element: <Notifications /> },
        { path: 'eventos', element: <Events /> },
        { path: 'encuestas', element: <Surveys /> },

        { path: 'visitas', element: <Visits /> },
        { path: 'visitas', element: <CreateVisit /> },
        { path: 'visitas', element: <CreateVisit /> },
        { path: 'visitas', element: <VisitDetail /> },

        { path: 'solicitudes-sugerencias', element: <Requests /> },
        { path: 'solicitudes-sugerencias/crear', element: <CreateRequest /> },
        { path: 'solicitudes-sugerencias/editar/:id', element: <CreateRequest /> },
        { path: 'solicitudes-sugerencias/detalle/:id', element: <RequestDetail /> },

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
