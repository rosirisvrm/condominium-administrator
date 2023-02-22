import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

function mockRoles() {
    return ([
        {
          id: faker.datatype.uuid(),
          name: 'Administrador',
          description: faker.lorem.sentence(),
          status: sample([
            { label: 'Activo', value: 0 },
          ]),
          numberOfUsers: 1,
        },
        {
          id: faker.datatype.uuid(),
          name: 'Junta de condominio',
          description: faker.lorem.sentence(),
          status: sample([
            { label: 'Activo', value: 0 },
          ]),
          numberOfUsers: 3,
        },
        {
          id: faker.datatype.uuid(),
          name: 'Propietario',
          description: faker.lorem.sentence(),
          status: sample([
            { label: 'Activo', value: 0 },
          ]),
          numberOfUsers: 60,
        },
      ])
}

function mockRole() {
    return ({
        id: faker.datatype.uuid(),
        name: sample(['Propietario']),
        description: faker.lorem.sentence(),
        status: sample([
          { label: 'Activo', value: 0 },
        ]),
        numberOfUsers: 60,
        permissions: [
            {
                permission: { label: 'Ver', value: 3 },
                module: { label: 'Pagos', value: 0 },
            },
            {
                permission: { label: 'Crear', value: 0 },
                module: { label: 'Pagos', value: 0 },
            },
            {
                permission: { label: 'Editar', value: 2 },
                module: { label: 'Pagos', value: 0 },
            },
            {
                permission: { label: 'Eliminar', value: 1 },
                module: { label: 'Pagos', value: 0 },
            },
            {
                permission: { label: 'Ver', value: 3 },
                module: { label: 'Noticias', value: 5 },
            },
            {
                permission: { label: 'Ver', value: 3 },
                module: { label: 'Notificaciones', value: 6 },
            },
        ]
    })
}                 

export { mockRoles, mockRole };