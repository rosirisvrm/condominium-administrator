import { faker } from '@faker-js/faker';

export const notifications = [
    {
        id: '3',
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
    },
    {
        id: '2',
        title: 'Mantenimiento de jardines jueves',
        text: 'Atento el próximo mantenimiento',
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
        status: { label: 'Programada', value: 0 }
    },
    {
        id: '1',
        title: 'Próximo vencimiento mensualidad mayo',
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
    },
    {
        id: '0',
        title: 'Asamblea de propietarios próximo viernes',
        text: 'Se convoca a asamblea de propietarios, asiste!',
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
    }
]