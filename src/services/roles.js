import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

//  http request here
export const getRoles = () =>
  [...Array(6)].map(() => ({
    id: faker.datatype.uuid(),
    name: sample(['Administrador', 'Junta de condominio', 'propietario']),
    description: faker.lorem.sentence(),
    status: sample([
      { label: 'Abierta', value: 0 },
      { label: 'Cerrada', value: 1 },
    ]),
    numberOfUsers: faker.random.numeric(1),
  }));

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
    { label: 'Permisos', value: 3 },
    { label: 'Empleados', value: 4 },
    { label: 'Noticias', value: 5 },
    { label: 'Notificaciones', value: 6 },
    { label: 'Eventos', value: 7 },
    { label: 'Encuestas', value: 8 },
    { label: 'Visitas', value: 9 },
    { label: 'Solicitudes y Sugerencias', value: 10 },
    { label: 'Comunicación Externa', value: 11 },
    { label: 'Personalizar sitio', value: 12 },
]);

export const postRoleStatus = (body) => {
  console.log('creando usuario');
  console.log('body: ', body);

  return true;
}

// export const getEmployee = (id) => ({
//     id,
//     name: faker.name.findName(),
//     identification: faker.random.numeric(8),
//     address: faker.address.cityName() + faker.address.streetAddress(),
//     phone: faker.phone.number('+58 412 ### ####'),
//     email: `${faker.random.word()}@${faker.random.word()}.com`,
//     position: faker.name.jobType(),
//     description: faker.lorem.paragraph(),
//     startDate: faker.date.past(),
//     endDate: faker.date.future(),
//     file: faker.system.filePath(),
//     paymentMethod: {
//         paymentMethodType: { label: 'Transferencia', value: 0 },
//         bank: {
//             value: "0115",
//             label: "BANCO EXTERIOR C.A."
//         },
//         identificationType: { label: 'V', value: 0 },
//         paymentMethodIdentification: faker.random.numeric(8),
//         bankAcount: faker.random.numeric(20),
//         paymentMethodPhone: faker.phone.number('+58 412 ### ####'),
//     },
// });

// export const postEmployee = (body) => {
//     console.log('creando');
//     console.log('body: ', body);

//     return true;
// }

// export const putEmployee = (id, body) => {
//     console.log('editando');
//     console.log('id: ', id);
//     console.log('body: ', body);

//     return true;
// }
