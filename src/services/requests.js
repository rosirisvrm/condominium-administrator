import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

//  http request here 
export const getRequests = () => [...Array(24)].map((_, index) => ({
    id: faker.datatype.uuid(),
    avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
    name: faker.name.findName(),
    address: faker.address.buildingNumber(),
    subject: faker.lorem.sentence(3),
    level: sample(['Alta', 'Media', 'Baja']),
    status: sample([
      'Pendiente',
      'Aprobada',
      'Rechazada',
    ]),
}));

export const getLevelOptions = () => ([
    { label: 'Alta', value: 0 },
    { label: 'Media', value: 1 },
    { label: 'Baja', value: 2 }
]);

export const getRequest = (id) => ({
    id,
    user: 'Ann Bode',
    userAddress: 'C-2-3',
    subject: faker.name.findName(),
    level: {
        label: 'Alta',
        value: 0,
    },
    description: faker.name.findName(),
    status: {
        label: 'Rechazada',
        value: 2,
    },
    comments: [
      { 
        user: 'Administrador', 
        date: '09-09-2022',
        time: '18:02', 
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.' 
      },
      { 
        user: 'Administrador', 
        date: '09-09-2022',
        time: '18:02', 
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.' 
      }
    ]
});

export const getStatusOptions = () => ([
    { label: 'Pendiente', value: 0 },
    { label: 'Aprobada', value: 1 },
    { label: 'Rechazada', value: 2 }
])

export const postRequest = (body) => {
    console.log('creando solicitud o sugerencia');
    console.log('body: ', body);

    return true;
}

export const putRequest = (id, body) => {
    console.log('editando solicitud o sugerencia');
    console.log('id: ', id);
    console.log('body: ', body);

    return true;
}


