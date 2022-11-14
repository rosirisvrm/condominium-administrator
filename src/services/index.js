import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { number } from 'yup';
import mockUsers from '../_mock/user'

//  http request here 
export const getUsers = () => mockUsers;

export const getUser = (id) => ({
    id: number(id),
    name: faker.name.findName(),
    identification: 23456789,
    address: faker.address.buildingNumber() ,
    phone: faker.phone.number('+48 91 ### ## ##'),
    email: 'user@example.com',
    role: {
        label: sample([
            'Propietario',
            'Junta de Condominio'
        ]),
        value: sample(['Propietario', 'Junta de Condominio']) === 'Propietario' ? 0 : 1,
    },
});

export const getRoleOptions = () => ([
    { label: 'Propietario', value: 0 },
    { label: 'Junta de Condominio', value: 1 },
]);
    


