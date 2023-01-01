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
    content: faker.lorem.paragraph(),
    image: `/static/mock-images/covers/cover_${1}.jpg`,
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