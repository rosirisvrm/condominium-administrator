import { mockRoles, mockRole } from '../_mock/roles';

export const getRoles = () => ([...mockRoles()]);

export const getRole = () => ({ ...mockRole() });

export const getRoleStatusOptions = () => ([
    { label: 'Activo', value: 0 },
    { label: 'Inactivo', value: 1 },
]);

export const getPermissionsStatusOptions = () => ([
    { label: 'Crear', value: 0 },
    { label: 'Eliminar', value: 1 },
    { label: 'Editar', value: 2 },
    { label: 'Ver', value: 3 },
]);

export const getModuleStatusOptions = () => ([
    { label: 'Contabilidad', value: 0 },
    { label: 'Pagos', value: 1 },
    { label: 'Usuarios', value: 2 },
    { label: 'Roles', value: 3 },
    { label: 'Empleados', value: 4 },
    { label: 'Noticias', value: 5 },
    { label: 'Notificaciones', value: 6 },
]);

export const postRole = (body) => {
  console.log('creating');
  console.log('body: ', body);

  return true;
}

export const putRole = (id, body) => {
  console.log('editing id: ', id);
  console.log('body: ', body);

  return true;
}

export const deleteRole = (id) => {
  console.log('deleting ', id);

  return true;
}

export const downloadRole = () => {
  console.log('downloading');

  return true;
}
