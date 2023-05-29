import { faker } from '@faker-js/faker';

export const getNewsList = ({ perPage = 24 } = {}, ) => [
    {
        id: '2',
        title: 'Resumen de asamblea de propietarios',
        sumary: 'Se presentan los puntos tratados y las decisiones tomadas en la última asamblea',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image: `/static/mock-images/news/asamblea.jpeg`,
        file: 'http://localhost:3000/static/mock-files/reglamento-condominio.pdf',
        postedAt: faker.date.recent(),
        author: {
            id: '0',
            name: 'Rosiris Romero',
        }
    },
    {
        id: '1',
        title: 'Aumento en el monto de la mensualidad',
        sumary: 'Se informa el nuevo monto de la mensualidad para mantenimientos',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image: `/static/mock-images/news/monto.jpeg`,
        file: 'reglamento de condominio',
        postedAt: faker.date.recent(),
        author: {
            id: '1',
            name: 'Clara Montoya',
        }
    },
    {
        id: '0',
        title: 'Avería portón principal de la residencia',
        sumary: 'Se explican razones de avería del porton',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image: `/static/mock-images/news/porton.jpeg`,
        file: 'imagen porton',
        postedAt: faker.date.recent(),
        author: {
            id: '2',
            name: 'María Sifuentes',
        }
    }
]

export const getNews = (id) => ({
    id,
    title: 'Resumen de asamblea de propietarios',
    sumary: 'Se presentan los puntos tratados y las decisiones tomadas en la última asamblea',
    content: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `,
    image: `/static/mock-images/news/asamblea.jpeg`,
    file: 'minuta de asamblea',
    postedAt: faker.date.recent(),
    author: {
        id: '0',
        name: 'Rosiris Romero',
    }
});

export const postNews = (body) => {
    console.log('creating');
    console.log('body: ', body);

    return true;
}

export const putNews = (id, body) => {
    console.log('editing: ', id);
    console.log('body: ', body);

    return true;
}

export const deleteNews = (id) => {
    console.log('deleting ', id);

    return true;
}

export const downloadNews = () => {
    console.log('downloading');

    return true;
}