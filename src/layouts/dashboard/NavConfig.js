// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'home',
    path: '/dashboard/home',
    icon: getIcon('bxs:home'),
    outlineIcon: getIcon('ant-design:home-outlined'),
  },
  {
    title: 'contabilidad',
    path: '/dashboard/contabilidad',
    icon: getIcon('bi:calculator-fill'),
    outlineIcon: getIcon('bi:calculator'),
    children: [
      {
        title: 'Egresos',
        path: '/dashboard/contabilidad/egresos', 
      },
      {
        title: 'Ingresos',
        path: '/dashboard/contabilidad/ingresos',
      },
      // {
      //   title: 'Pagos',
      //   path: '/dashboard/contabilidad/pagos',
      // },
      {
        title: 'Facturas y Recibos',
        path: '/dashboard/contabilidad/facturas',
      }
    ]
  },
  {
    title: 'usuarios',
    path: '/dashboard/usuarios',
    icon: getIcon('ph:users-fill'),
    outlineIcon: getIcon('ph:users'),
  },
  // {
  //   title: 'roles',
  //   path: '/dashboard/roles',
  //   icon: getIcon('mdi:account-group'),
  //   outlineIcon: getIcon('mdi:account-group-outline'),
  // },
  // {
  //   title: 'empleados',
  //   path: '/dashboard/empleados',
  //   icon: getIcon('mdi:toolbox'),
  //   outlineIcon: getIcon('mdi:toolbox-outline'),
  // },
  // {
  //   title: 'proveedores',
  //   path: '/dashboard/proveedores',
  //   icon: getIcon('mdi:truck-delivery'),
  //   outlineIcon: getIcon('mdi:truck-delivery-outline'),
  // },
  {
    title: 'noticias',
    path: '/dashboard/noticias',
    icon: getIcon('mdi:newspaper-variant'),
    outlineIcon: getIcon('mdi:newspaper-variant-outline'),
  },
  {
    title: 'notificaciones',
    path: '/dashboard/notificaciones',
    icon: getIcon('fa-brands:telegram-plane'),
    outlineIcon: getIcon('la:telegram'),
  },
  // {
  //   title: 'eventos',
  //   path: '/dashboard/eventos',
  //   icon: getIcon('ic:baseline-date-range'),
  //   outlineIcon: getIcon('ic:outline-date-range'),
  // },
  // {
  //   title: 'encuestas',
  //   path: '/dashboard/encuestas',
  //   icon: getIcon('bxs:bar-chart-square'),
  //   outlineIcon: getIcon('bx:bar-chart-square'),
  // },
  // {
  //   title: 'visitas',
  //   path: '/dashboard/visitas',
  //   icon: getIcon('fa6-solid:person'),
  //   outlineIcon: getIcon('carbon:person'),
  // },
  // {
  //   title: 'solicitudes y sugerencias',
  //   path: '/dashboard/solicitudes-sugerencias',
  //   icon: getIcon('eva:message-circle-fill'),
  //   outlineIcon: getIcon('eva:message-circle-outline'),
  // },
  // {
  //   title: 'personalizar sitio',
  //   path: '/dashboard/personalizar-sitio',
  //   icon: getIcon('fa-solid:edit'),
  //   outlineIcon: getIcon('fa-regular:edit'),
  // },
];

export default navConfig;
