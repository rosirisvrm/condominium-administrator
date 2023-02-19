import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

export const getUsers = () => [...Array(24)].map((_, index) => ({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    identification: faker.random.numeric(8),
    address: faker.address.cityName() + faker.address.streetAddress(),
    phone: faker.phone.number('+58 412 ### ####'),
    email: `${faker.random.word()}@${faker.random.word()}.com`,
    role: sample([
        { label: 'Propietario', value: 0 },
        { label: 'Junta de Condominio', value: 1 },
        { label: 'Administrador', value: 2 },
    ]),
    avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
}));

export const getUser = (id) => {
    const password = faker.internet.password()
    return ({
        id,
        name: faker.name.findName(),
        identification: faker.random.numeric(8),
        address: faker.address.cityName() + faker.address.streetAddress(),
        phone: faker.phone.number('+58 412 ### ####'),
        email: `${faker.random.word()}@${faker.random.word()}.com`,
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