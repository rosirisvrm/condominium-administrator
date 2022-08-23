// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: getIcon('eva:pie-chart-2-fill'),
  // },
  {
    title: 'home',
    path: '/dashboard/home',
    icon: getIcon('bxs:home'),
  },
  {
    title: 'contabilidad',
    path: '/dashboard/contabilidad',
    icon: getIcon('fa-solid:wallet'),
  },
  {
    title: 'usuarios',
    path: '/dashboard/usuarios',
    icon: getIcon('ph:users-fill'),
  },
  {
    title: 'grupos',
    path: '/dashboard/grupos',
    icon: getIcon('fa-solid:users'),
  },
  {
    title: 'empleados',
    path: '/dashboard/empleados',
    icon: getIcon('fa-solid:toolbox'),
  },
  {
    title: 'proveedores',
    path: '/dashboard/proveedores',
    icon: getIcon('bxs:user-detail'),
  },
  {
    title: 'noticias',
    path: '/dashboard/noticias',
    icon: getIcon('fluent:news-20-filled'),
  },
  {
    title: 'notificaciones',
    path: '/dashboard/notificaciones',
    icon: getIcon('file-icons:telegram'),
  },
  {
    title: 'eventos',
    path: '/dashboard/eventos',
    icon: getIcon('ant-design:calendar-filled'),
  },
  {
    title: 'encuestas',
    path: '/dashboard/encuestas',
    icon: getIcon('bxs:bar-chart-square'),
  },
  {
    title: 'visitas',
    path: '/dashboard/visitas',
    icon: getIcon('el:person'),
  },
  {
    title: 'solicitudes y sugerencias',
    path: '/dashboard/solicitudes-sugerencias',
    icon: getIcon('bi:chat-dots-fill'),
  },
  {
    title: 'comunicación externa',
    path: '/dashboard/comunicacion-externa',
    icon: getIcon('entypo:mail'),
  },
  {
    title: 'personalizar sitio',
    path: '/dashboard/personalizar-sitio',
    icon: getIcon('bxs:edit'),
  },
];

export default navConfig;
