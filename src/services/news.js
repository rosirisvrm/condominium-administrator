import { faker } from '@faker-js/faker';

//  http request here 
export const getNewsList = ({ perPage = 24 } = {}) => [...Array(perPage)].map((_, index) => ({
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(5),
    sumary: faker.lorem.paragraph(),
    content: faker.lorem.paragraph(),
    image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
    file: faker.system.filePath(),
    postedAt: faker.date.recent(),
    sections: [...Array(3)].map(() => ({
        id: faker.datatype.uuid(),
        title: faker.lorem.sentence(5),
        content: faker.lorem.paragraph(),
        file: faker.system.filePath(),
    })),
    author: {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
    }
}));

export const getNews = (id) => ({
    id,
    title: faker.lorem.sentence(5),
    sumary: faker.lorem.paragraph(1),
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    image: `/static/mock-images/covers/cover_${2}.jpg`,
    file: faker.system.filePath(),
    postedAt: faker.date.recent(),
    // sections: [...Array(3)].map(() => ({
    //     id: faker.datatype.uuid(),
    //     title: faker.lorem.sentence(5),
    //     content: faker.lorem.paragraph(),
    //     file: faker.system.filePath(),
    // })),
    author: {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
    },
});

export const postNews = (body) => {
    console.log('creando');
    console.log('body: ', body);

    return true;
}

export const putNews = (id, body) => {
    console.log('editando');
    console.log('id: ', id);
    console.log('body: ', body);

    return true;
}