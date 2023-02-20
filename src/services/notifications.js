import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

export const getNotificationsList = ({ perPage = 24 } = {}) => [...Array(perPage)].map(() => ({
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(5),
    text: faker.lorem.sentence(),
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
    ]),
    isUnRead: sample([true, false]),
    avatar: null,
    type: sample([
        'published_news',
        'payment_sent',
        'payment_approved',
        'payment_rejected',
        'payment_date_due',
        'payment_date_due_soon'
    ]),
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
    console.log('creating');
    console.log('body: ', body);

    return true;
}

export const putNotification = (id, body) => {
    console.log('editing: ', id);
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