import { faker } from '@faker-js/faker/locale/es_MX';
import { sample } from 'lodash';

const TITLES = [
    'Evento de carnaval',
    'Pago rechazado',
    'Mantenimiento eléctrico',
    'Pago realizado exitosamente',
    'Mensualidad vencida',
    'Asamblea de propietarios',
    'Próximo vencimiento mensualidad'
]

const DESCRIPTIONS = [
    'Estás invitado al evento de carnaval del condominio',
    'El pago realizado con asunto Pago Mensualidad de diciembre fue rechazado',
    'Toma tus previsiones ante el mantenimiento planificado',
    'Ha realizado un pago con asunto Pago mensualidad de enero',
    'Por favor cancela y cumple con los pagos de tu condominio',
    'Asiste y participa en las decisiones de tu condominio',
    'Cancele para estar solvente con su condominio'
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
        type: sample([
            'published_news',
            'payment_sent',
            'payment_approved',
            'payment_rejected',
            'payment_date_due',
            'payment_date_due_soon'
        ])
    }))
}

export { mockNotifications, TITLES, DESCRIPTIONS };