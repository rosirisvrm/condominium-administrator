import { faker } from '@faker-js/faker';

//  http request here 
export const getNewsList = ({ perPage = 24 }) => [...Array(perPage)].map((_, index) => ({
    id: faker.datatype.uuid(),
    title: faker.name.findName(),
    sumary: faker.lorem.paragraph(),
    content: faker.lorem.paragraph(),
    image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
    postedAt: faker.date.recent(),
}));

export const getNews = (id) => ({
    id,
    title: faker.name.findName(),
    sumary: faker.lorem.paragraph(1),
    content: faker.lorem.paragraph(),
    createDate: faker.date.past(),
    updateDate: faker.date.past(),
    file: faker.system.filePath(),
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