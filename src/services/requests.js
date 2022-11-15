import { faker } from '@faker-js/faker';
import mockRequests from '../_mock/request'

//  http request here 
export const getRequests = () => mockRequests;

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
      }
    ]
});

export const getStatusOptions = () => ([
    { label: 'Pendiente', value: 0 },
    { label: 'Aprobada', value: 1 },
    { label: 'Rechazada', value: 2 }
])


