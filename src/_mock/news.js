import { faker } from '@faker-js/faker/locale/es_MX';

const TITLES = [
    'Nuevas sanciones por incumplimiento de pago de mensualidad',
    'Aumento en el monto de la mensualidad',
    'Piscina cerrada por un mes',
    'Avería de portón principal de la residencia',
    'Términos acordados para el mantenimiento de tanques de agua',
    'Resumen de Asamblea de Propietarios',
]

const DESCRIPTIONS = [
    'Se informa sobre el nuevo monto de los intereses por morosidad',
    'Se informa sobre el nuevo monto de la mensualidad para mantenimiento de bienes comunes del condominio',
    'El uso de la piscina se pausa por un mes debido a las lluvias',
    'Se explican las razones de avería del portón',
    'Se presentan los puntos tratados y las decisiones tomadas en la última asamblea',
    'Se presentan los puntos tratados y las decisiones tomadas en la última asamblea',
]

function mockNews(perPage = 24) {
    return [...Array(perPage)].map((_, index) => ({
        id: faker.datatype.uuid(),
        title: TITLES[index],
        sumary: DESCRIPTIONS[index],
        content: faker.lorem.paragraph(),
        image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
        file: faker.system.filePath(),
        postedAt: faker.date.recent(),
        author: {
            id: faker.datatype.uuid(),
            name: faker.name.findName(),
        }
    }))
}

export { mockNews, TITLES, DESCRIPTIONS };