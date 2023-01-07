import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
// components
import { AuthRoute } from './components/AuthRoute';
//
import { Login } from './pages/Login';
// import Products from './pages/Products';
import Blog from './pages/Blog';

import { Page404 } from './pages/Page404';
import { Landing } from './pages/Landing';
import { DashboardApp } from './pages/DashboardApp';
import { 
  Income, 
  Expenses, 
  Payments, 
  Invoices, 
  CreatePayment, 
  EditPayment, 
  PayDetail, 
  ExpensesPaymentDetail 
} from './pages/Accounting';
import { Users, CreateUser, EditUser, UserDetail } from './pages/Users';

import { Roles } from './pages/Roles';
// import { Permissions } from './pages/Permissions';

import { Employees, CreateEmployee, EmployeeDetail } from './pages/Employees';
import { Providers, CreateProvider, ProviderDetail } from './pages/Providers';
import { News } from './pages/News/News';
import { CreateNews } from './pages/News/CreateNews';
import { NewsDetail } from './pages/News/NewsDetail';
import { Notifications } from './pages/Notifications';
import { Events } from './pages/Events';
import { Surveys, CreateSurvey, SurveyDetail } from './pages/Surveys';
import { Visits, CreateVisit, VisitDetail } from './pages/Visits';
import { Requests, CreateRequest, EditRequest, RequestDetail } from './pages/Requests';
import { ExternalCommunication } from './pages/ExternalCommunication';
import { CustomizeSite } from './pages/CustomizeSite';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { PaymentMethods } from './pages/PaymentMethods';

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
                  <Expenses />
                </AuthRoute>
              )
            },
            { 
              path: 'ingresos', 
              element: (
                <AuthRoute>
                  <Income />
                </AuthRoute>
              )
            },
            { 
              path: 'pagos', 
              element: (
                <AuthRoute>
                  <Payments />
                </AuthRoute>
              )
            },
            { 
              path: 'facturas', 
              element: (
                <AuthRoute>
                  <Invoices />
                </AuthRoute>
              )
            },
            { 
              path: 'crear-pago', 
              element: (
                <AuthRoute>
                  <CreatePayment />
                </AuthRoute>
              )
            },
            { 
              path: 'editar-pago/:id', 
              element: (
                <AuthRoute>
                  <EditPayment />
                </AuthRoute>
              )
            },
            { 
              path: 'detalle-pago/:id', 
              element: (
                <AuthRoute>
                  <PayDetail />
                </AuthRoute>
              )
            },
            { 
              path: 'detalle-egreso/:id', 
              element: (
                <AuthRoute>
                  <ExpensesPaymentDetail />
                </AuthRoute>
              )
            },
          ] 
        },
        
// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

        // Roles
        { 
          path: 'roles', 
          element: (
            <AuthRoute>
              <Roles />
            </AuthRoute>
          )
        },

// ----------------------------------------------------------------------

        // Permisssions
        { 
          path: 'permisos', 
          element: (
            <AuthRoute>
              <Blog />
            </AuthRoute>
          )
        },

// ----------------------------------------------------------------------

        // Employees
        { 
          path: 'empleados', 
          element: (
            <AuthRoute>
              <Employees />
            </AuthRoute>
          )
        },
        { 
          path: 'empleados/crear', 
          element: (
            <AuthRoute>
              <CreateEmployee />
            </AuthRoute>
          ) 
        },
        { 
          path: 'empleados/editar/:id', 
          element: (
            <AuthRoute>
              <CreateEmployee />
            </AuthRoute>
          )
        },
        { 
          path: 'empleados/detalle/:id', 
          element: (
            <AuthRoute>
              <EmployeeDetail />
            </AuthRoute>
          )
        },

// ----------------------------------------------------------------------

        // Providers
        { 
          path: 'proveedores', 
          element: (
            <AuthRoute>
              <Providers />
            </AuthRoute>
          )
        },
        { 
          path: 'proveedores/crear', 
          element: (
            <AuthRoute>
              <CreateProvider />
            </AuthRoute>
          ) 
        },
        { 
          path: 'proveedores/editar/:id', 
          element: (
            <AuthRoute>
              <CreateProvider />
            </AuthRoute>
          )
        },
        { 
          path: 'proveedores/detalle/:id', 
          element: (
            <AuthRoute>
              <ProviderDetail />
            </AuthRoute>
          )
        },

// ----------------------------------------------------------------------

        // News
        { 
          path: 'noticias', 
          element: (
            <AuthRoute>
              <News />
            </AuthRoute>
          ) 
        },
        { 
          path: 'noticias/crear', 
          element: (
            <AuthRoute>
              <CreateNews />
            </AuthRoute>
          ) 
        },
        { 
          path: 'noticias/editar/:id', 
          element: (
            <AuthRoute>
              <CreateNews />
            </AuthRoute>
          )
        },
        { 
          path: 'noticias/detalle/:id', 
          element: (
            <AuthRoute>
              <NewsDetail />
            </AuthRoute>
          )
        },

// ----------------------------------------------------------------------

        // Notifications
        { 
          path: 'notificaciones', 
          element: (
            <AuthRoute>
              <Notifications /> 
            </AuthRoute>
          )
        },

// ----------------------------------------------------------------------

        // Events
        { 
          path: 'eventos', 
          element: (
            <AuthRoute>
              <Events />
            </AuthRoute>
          )
        },

// ----------------------------------------------------------------------

        // Polls
        { 
          path: 'encuestas', 
          element: (
            <AuthRoute>
              <Surveys />
            </AuthRoute>
          )
        },
        { 
          path: 'encuestas/crear', 
          element: (
            <AuthRoute>
              <CreateSurvey /> 
            </AuthRoute>
          )
        },
        { 
          path: 'encuestas/detalle/:id', 
          element: (
            <AuthRoute>
              <SurveyDetail /> 
            </AuthRoute>
          )
        },

// ----------------------------------------------------------------------

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
          path: 'informacion-general', 
          element: (
            <AuthRoute>
              <Settings />
            </AuthRoute>
          )
        },

        // Payment Methods
        { 
        path: 'metodos-de-pago', 
        element: (
          <AuthRoute>
            <PaymentMethods />
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
