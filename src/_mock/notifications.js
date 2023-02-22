import { faker } from '@faker-js/faker/locale/es_MX';
import { sample } from 'lodash';

const TITLES = [
    'Nueva noticia publicada',
    'Pago rechazado',
    'Pago realizado exitosamente',
    'Mensualidad vencida',
    'Nueva noticia publicada',
    'Próximo vencimiento mensualidad',
    'Pago aprobado',
]

const DESCRIPTIONS = [
    'Términos acordados para el mantenimiento de tanques de agua',
    'El pago realizado con asunto Pago Mensualidad de enero fue rechazado',
    'Ha realizado un pago con asunto Pago mensualidad de enero',
    'Por favor cancela y cumple con los pagos de tu condominio',
    'Avería de portón principal de la residencia',
    'Cancele para estar solvente con su condominio',
    'El pago realizado con asunto Pago Mensualidad de diciembre fue aprobado',
]

const TYPES = [
    'published_news',
    'payment_rejected',
    'payment_sent',
    'payment_date_due',
    'published_news',
    'payment_date_due_soon',
    'payment_approved',
]

function mockNotifications(perPage = 24) {
    return [...Array(perPage)].map((_, index) => ({
        id: faker.datatype.uuid(),
        title: TITLES[index],
        text: DESCRIPTIONS[index],
        date: faker.date.recent(),
        hour: faker.date.recent(),
        users: [...Array(3)].map(() => ({
            id: faker.datatype.uuid(),
            name: faker.name.findName(),
            address: faker.address.secondaryAddress(),
        })),
        author: {
            id: faker.datatype.uuid(),
            name: faker.name.findName(),
            address: faker.address.secondaryAddress(),
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
        type: TYPES[index]
    }))
}

function mockNotification(id) {
    return ({
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
    })
}

export { mockNotifications, mockNotification };