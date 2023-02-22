import { faker } from '@faker-js/faker/locale/es_MX';

const TITLES = [
    'Nuevas sanciones por incumplimiento de mensualidad',
    'Aumento en el monto de la mensualidad',
    'Piscina cerrada por un mes',
    'Avería de portón principal de la residencia',
    'Términos acordados para el mantenimiento de tanques',
    'Resumen de Asamblea de Propietarios',
]

const DESCRIPTIONS = [
    'Se informa sobre las restricciones por morosidad',
    'Se informa sobre el nuevo monto de la mensualidad para mantenimiento de áreas comunes',
    'El uso de la piscina se pausa por un mes por reparación de motor',
    'Se explican las razones de avería del portón',
    'Se presenta el horario acordado para mantenimiento de los tanques',
    'Se presentan los puntos tratados y las decisiones tomadas en la última asamblea',
]

function mockNews(length = 24) {
    return [...Array(length)].map((_, index) => ({
        id: faker.datatype.uuid(),
        title: TITLES[index],
        sumary: DESCRIPTIONS[index],
        content: faker.lorem.paragraph(),
        image: `/static/mock-images/news/news_${index + 1}.jpeg`,
        file: faker.system.filePath(),
        postedAt: faker.date.recent(),
        author: {
            id: faker.datatype.uuid(),
            name: faker.name.findName(),
        }
    }))
}

function mockDetailNews(id) {
    return ({
        id,
        title: TITLES[2],
        sumary: DESCRIPTIONS[2],
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        image: `/static/mock-images/news/news_${3}.jpeg`,
        file: faker.system.filePath(),
        postedAt: faker.date.recent(),
        author: {
            id: faker.datatype.uuid(),
            name: faker.name.findName(),
        },
    })
}

export { mockNews, mockDetailNews };