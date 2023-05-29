import { faker } from '@faker-js/faker';
import { notifications } from '../mock/notifications';

export const getNotificationsList = (newRegister) => {

    if(newRegister){
        const newNotifications = [...notifications]

        newNotifications.unshift({
            ...newRegister,
        })

        return newNotifications;
    }

    return [...notifications]
}

export const getNotification = (id) => ({
    id,
    title: 'Mensualidad mayo vencida',
    text: 'Realizar el pago de la mensualidad pendiente',
    date: faker.date.recent(),
    hour: faker.date.recent(),
    users: [
        {
            id: '4',
            name: 'Carlos Gutiérrez',
            address: 'Manzana 12 - 4',
        },
        {
            id: '3',
            name: 'Ramón Figuera',
            address: 'Manzana 5 - 1',
        },
        {
            id: '2',
            name: 'María Sifuentes',
            address: 'Manzana 7 - 3',
        },
        {
            id: '1',
            name: 'Clara Montoya',
            address: 'Manzana 1 - 8',
        },
    ],
    author: {
        id: '0',
        name: 'Rosiris Romero',
        address: 'Manzana 12 - 9',
    },
    status: { label: 'Enviada', value: 1 }
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