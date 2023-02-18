import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { number } from 'yup';

//  http request here 
export const getUsers = () => [...Array(24)].map((_, index) => ({
    id: faker.datatype.uuid(),
    avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
    name: faker.name.findName(),
    address: faker.address.buildingNumber(),
    phone: faker.phone.number('+48 91 ### ## ##'),
    email: 'user@example.com',
    role: sample([
      'Propietario',
      'Junta de Condominio',
    ]),
}));

export const getUser = (id) => ({
    id: number(id),
    name: faker.name.findName(),
    identification: faker.datatype.number(),
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
    { label: 'Administrador', value: 2 },
]);

export const postUser = (body) => {
    console.log('creating');
    console.log('body: ', body);

    return true;
}

export const putUser = (id, body) => {
    console.log('editing: ', id);
    console.log('body: ', body);

    return true;
}

export const deleteUser = (id) => {
    console.log('deleting ', id);

    return true;
}

export const downloadUser = () => {
    console.log('downloading');

    return true;
}