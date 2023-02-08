import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

//  http request here
export const getRoles = () =>
  [...Array(6)].map(() => ({
    id: faker.datatype.uuid(),
    name: sample(['Administrador', 'Junta de condominio', 'Propietario']),
    description: faker.lorem.sentence(),
    status: sample([
      { label: 'Activo', value: 0 },
      { label: 'Inactivo', value: 1 },
    ]),
    numberOfUsers: faker.random.numeric(1),
  }));

export const getRole = () => ({
  id: faker.datatype.uuid(),
  name: sample(['Administrador', 'Junta de condominio', 'Propietario']),
  description: faker.lorem.sentence(),
  status: sample([
    { label: 'Activo', value: 0 },
    { label: 'Inactivo', value: 1 },
  ]),
  numberOfUsers: faker.random.numeric(1),
  permissions: [...Array(6)].map(() => ({
    permission: sample([
      { label: 'Crear', value: 0 },
      { label: 'Eliminar', value: 1 },
      { label: 'Editar', value: 2 },
      { label: 'Ver', value: 3 },
    ]),
    module: sample([
      { label: 'Contabilidad', value: 0 },
      { label: 'Usuarios', value: 1 },
      { label: 'Roles', value: 2 },
      { label: 'Empleados', value: 4 },
      { label: 'Noticias', value: 5 },
      { label: 'Notificaciones', value: 6 },
    ])
  }))
});

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
    { label: 'Usuarios', value: 1 },
    { label: 'Roles', value: 2 },
    { label: 'Empleados', value: 4 },
    { label: 'Noticias', value: 5 },
    { label: 'Notificaciones', value: 6 },
]);

export const postRoleStatus = (body) => {
  console.log('creando usuario');
  console.log('body: ', body);

  return true;
}
