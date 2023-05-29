import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

export const getUsers = () => {
    return [
        {
            id: faker.datatype.uuid(),
            name: 'Carlos Gutiérrez',
            identification: '7895437',
            address: 'Manzana 12 - 4',
            phone: faker.phone.number('+58 412 282 7887'),
            email: `carlosgmp@gmail.com`,
            role: sample([
                { label: 'Propietario', value: 0 },
            ]),
            avatarUrl: `/static/mock-images/avatars/avatar_${1}.jpg`,
        },
        {
            id: faker.datatype.uuid(),
            name: 'Ramón Figuera',
            identification: '9876375',
            address: 'Manzana 5 - 1',
            phone: faker.phone.number('+58 412 782 6625'),
            email: `ramon4659@gmail.com`,
            role: sample([
                { label: 'Propietario', value: 0 },
            ]),
            avatarUrl: `/static/mock-images/avatars/avatar_${1}.jpg`,
        },
        {
            id: faker.datatype.uuid(),
            name: 'María Sifuentes',
            identification: '10908876',
            address: 'Manzana 7 - 3',
            phone: faker.phone.number('+58 416 112 9834'),
            email: `mariasifu@gmail.com`,
            role: sample([
                { label: 'Junta de Condominio', value: 2 },
            ]),
            avatarUrl: `/static/mock-images/avatars/avatar_${1}.jpg`,
        },
        {
            id: faker.datatype.uuid(),
            name: 'Clara Montoya',
            identification: '16852334',
            address: 'Manzana 1 - 8',
            phone: faker.phone.number('+58 414 878 1009'),
            email: `montoyact@gmail.com`,
            role: sample([
                { label: 'Junta de Condominio', value: 1 },
            ]),
            avatarUrl: `/static/mock-images/avatars/avatar_${1}.jpg`,
        },
        {
            id: faker.datatype.uuid(),
            name: 'Rosiris Romero',
            identification: faker.random.numeric(8),
            address: 'Manzana 12 - 9',
            phone: '+58 412 1761190',
            email: `rosirisvrm@gmail.com`,
            role: sample([
                { label: 'Administrador', value: 2 },
            ]),
            avatarUrl: `/static/mock-images/avatars/avatar_${1}.jpg`,
        }
    ]
};

export const getUser = (id) => {
    const password = faker.internet.password()
    return ({
        id,
        name: 'Samuel Ramírez',
        identification: '7895437',
        address: 'Manzana 21 - 4',
        phone: faker.phone.number('+58 412 282 7887'),
        email: `samuramirez@gmail.com`,
        role: sample([
            { label: 'Propietario', value: 0 },
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