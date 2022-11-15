import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
// components
import { AuthRoute } from './components/AuthRoute';
//
import { Login } from './pages/Login';
import Products from './pages/Products';
import Blog from './pages/Blog';

import { Page404 } from './pages/Page404';
import { Landing } from './pages/Landing';
import { DashboardApp } from './pages/DashboardApp';
import { Ingresos, Egresos, CreatePay, PayDetail } from './pages/Accounting';
import { Users, CreateUser, EditUser, UserDetail } from './pages/Users';

// import { Groups } from './pages/Groups';
// import { Permissions } from './pages/Permissions';

import { Employees } from './pages/Employees';
import { Providers } from './pages/Providers';
import { News } from './pages/News';
import { Notifications } from './pages/Notifications';
import { Events } from './pages/Events';
import { Surveys } from './pages/Surveys';
import { Visits, CreateVisit, VisitDetail } from './pages/Visits';
import { Requests, CreateRequest, EditRequest, RequestDetail } from './pages/Requests';
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
        { 
          path: 'home', 
          element: (
            <AuthRoute>
              <DashboardApp /> 
            </AuthRoute>
          ) 
        },
        // Accounting
        { 
          path: 'contabilidad',
          children: [
            { 
              path: 'egresos', 
              element: (
                <AuthRoute>
                  <Egresos />
                </AuthRoute>
              )
            },
            { 
              path: 'ingresos', 
              element: (
                <AuthRoute>
                  <Ingresos />
                </AuthRoute>
              )
            },
            { 
              path: 'enviar-pago', 
              element: (
                <AuthRoute>
                  <CreatePay />
                </AuthRoute>
              )
            },
            { 
              path: 'detalle-pago', 
              element: (
                <AuthRoute>
                  <PayDetail />
                </AuthRoute>
              )
            },
          ] 
        },
        
        // Users
        { 
          path: 'usuarios', 
          element: ( 
            <AuthRoute>
              <Users />
            </AuthRoute>
          ) 
        },
        { 
          path: 'usuarios/crear', 
          element: (
            <AuthRoute>
              <CreateUser />
            </AuthRoute>
          ) 
        },
        { 
          path: 'usuarios/editar/:id', 
          element: (
            <AuthRoute>
              <EditUser />
            </AuthRoute>
          )
        },
        { 
          path: 'usuarios/detalle/:id', 
          element: (
            <AuthRoute>
              <UserDetail />
            </AuthRoute>
          )
        },

        // Roles
        { 
          path: 'roles', 
          element: (
            <AuthRoute>
              <Products />
            </AuthRoute>
          )
        },

        // Permisssions
        { 
          path: 'permisos', 
          element: (
            <AuthRoute>
              <Blog />
            </AuthRoute>
          )
        },

        // Employees
        { 
          path: 'empleados', 
          element: (
            <AuthRoute>
              <Employees />
            </AuthRoute>
          )
        },

        // Providers
        { 
          path: 'proveedores', 
          element: (
            <AuthRoute>
              <Providers />
            </AuthRoute>
          )
        },

        // News
        { 
          path: 'noticias', 
          element: (
            <AuthRoute>
              <News />
            </AuthRoute>
          ) 
        },

        // Notifications
        { 
          path: 'notificaciones', 
          element: (
            <AuthRoute>
              <Notifications /> 
            </AuthRoute>
          )
        },

        // Events
        { 
          path: 'eventos', 
          element: (
            <AuthRoute>
              <Events />
            </AuthRoute>
          )
        },

        // Polls
        { 
          path: 'encuestas', 
          element: (
            <AuthRoute>
              <Surveys />
            </AuthRoute>
          )
        },

        // Visits
        { 
          path: 'visitas', 
          element: (
            <AuthRoute>
              <Visits />
            </AuthRoute>
          )
        },
        { 
          path: 'visitas', 
          element: (
            <AuthRoute>
              <CreateVisit />
            </AuthRoute>
          )
        },
        { 
          path: 'visitas', 
          element: (
            <AuthRoute>
              <CreateVisit /> 
            </AuthRoute>
          )
        },
        { 
          path: 'visitas', 
          element: (
            <AuthRoute>
              <VisitDetail /> 
            </AuthRoute>
          )
        },

        // Request and Suggestions
        { 
          path: 'solicitudes-sugerencias', 
          element: (
            <AuthRoute>
              <Requests />
            </AuthRoute>
          )
        },
        { 
          path: 'solicitudes-sugerencias/crear', 
          element: (
            <AuthRoute>
              <CreateRequest /> 
            </AuthRoute>
          )
        },
        { 
          path: 'solicitudes-sugerencias/editar/:id', 
          element: (
            <AuthRoute>
              <EditRequest /> 
            </AuthRoute>
          )
        },
        { 
          path: 'solicitudes-sugerencias/detalle/:id', 
          element: (
            <AuthRoute>
              <RequestDetail /> 
            </AuthRoute>
          )
        },

        // External Communication
        { 
          path: 'comunicacion-externa', 
          element: (
            <AuthRoute>
              <ExternalCommunication />
            </AuthRoute>
          )
        },

        // Customize Site
        { 
          path: 'personalizar-sitio', 
          element: (
            <AuthRoute>
              <CustomizeSite />
            </AuthRoute>
          )
        },

        // Profile
        { 
          path: 'perfil', 
          element: (
            <AuthRoute>
              <Profile />
            </AuthRoute>
          )
        },

        // Settings
        { 
          path: 'ajustes', 
          element: (
            <AuthRoute>
              <Settings />
            </AuthRoute>
          )
        },
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
