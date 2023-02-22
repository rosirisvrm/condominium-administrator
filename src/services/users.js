import { faker } from '@faker-js/faker/locale/es_MX';
import { sample } from 'lodash';
import { mockUsers } from '../_mock/users';

export const getUsers = () => [...mockUsers(10)];

export const getUser = (id) => {
    const password = faker.internet.password()
    const name = faker.name.findName()
    return ({
        id,
        name,
        identification: faker.random.numeric(8),
        address: faker.address.secondaryAddress(),
        phone: faker.phone.number('+58 412 ### ####'),
        email: faker.internet.email(name, '', 'gmail.com'),
        role: sample([
            { label: 'Propietario', value: 0 },
            { label: 'Junta de Condominio', value: 1 },
            { label: 'Administrador', value: 2 },
        ]),
        avatarUrl: `/static/mock-images/avatars/avatar_${1}.jpg`,
        password,
        passwordConfirm: password,
    });
};

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