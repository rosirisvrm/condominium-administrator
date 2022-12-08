import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

//  http request here 
export const getSurveys = () => {
    return [...Array(24)].map((_) => ({
        id: faker.datatype.uuid(),
        title: faker.name.findName(),
        description: faker.name.findName(),
        status: sample([
          'Por Enviar',
          'Enviada',
          'Terminada',
        ]),
        initialDate: faker.date.past(),
        finalDate: faker.date.past(),
        users: 30,
        anwers: 18
    })); 
};

export const getSurvey = (id) => ({
    id,
    title: faker.name.findName(),
    description: faker.name.findName(),
    status: {
        label: 'Enviada',
        value: 1,
    },
    questions: [],
    initialDate: faker.date.past(),
    finalDate: faker.date.past(),
    users: 30,
    anwersAccount: 18
});

export const getStatusOptions = () => ([
    { label: 'Por Enviar', value: 0 },
    { label: 'Enviada', value: 1 },
    { label: 'Terminada', value: 2 },
])

export const postSurvey = (body) => {
    console.log('creando');
    console.log('body: ', body);

    return true;
}

export const putSurvey = (id, body) => {
    console.log('editando');
    console.log('id: ', id);
    console.log('body: ', body);

    return true;
}


