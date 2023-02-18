import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

export const getNotificationsList = ({ perPage = 24 } = {}) => [...Array(perPage)].map(() => ({
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(5),
    text: faker.lorem.paragraph(7),
    date: faker.date.recent(),
    hour: faker.date.recent(),
    users: [...Array(3)].map(() => ({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
    })),
    author: {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        address: faker.address.cityName() + faker.address.streetAddress(),
    },
    status: sample([
        {
            label: 'Programada',
            value: 0
        },
        {
            label: 'Enviada',
            value: 1
        }
    ])
}));

export const getNotification = (id) => ({
    id,
    title: faker.lorem.sentence(5),
    text: faker.lorem.paragraph(7),
    date: faker.date.recent(),
    hour: faker.date.recent(),
    users: [...Array(3)].map(() => ({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        address: faker.address.cityName() + faker.address.streetAddress(),
    })),
    author: {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
    },
    status: sample([
        {
            label: 'Programada',
            value: 0
        },
        {
            label: 'Enviada',
            value: 1
        }
    ])
});

export const postNotification = (body) => {
    console.log('creando');
    console.log('body: ', body);

    return true;
}

export const putNotification = (id, body) => {
    console.log('editando');
    console.log('id: ', id);
    console.log('body: ', body);

    return true;
}

export const deleteNotification = (id) => {
    console.log('deleting id ', id);
    return true;
}

export const downloadNotification = () => {
    console.log('downloading');
    return true;
}