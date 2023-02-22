import { faker } from '@faker-js/faker/locale/es_MX';
import { sample } from 'lodash';
import { mockNotifications, TITLES, DESCRIPTIONS } from '../_mock/notifications';

export const getNotificationsList = ({ perPage = 24 } = {}) => [...mockNotifications(perPage)]

export const getNotification = (id) => ({
    id,
    title: TITLES[0],
    text: DESCRIPTIONS[0],
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