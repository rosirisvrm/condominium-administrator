import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

//  http request here 
export const getSurveys = () => ([...Array(24)].map(() => ({
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
        answers: 18
})))

export const getSurvey = (id) => ({
    id,
    title: faker.lorem.sentence(5),
    description: faker.lorem.paragraph(),
    initialDate: faker.date.past(),
    finalDate: faker.date.future(),
    file: faker.system.filePath(),
    questions: [...Array(5)].map(() => ({
        id: faker.datatype.uuid(),
        question: faker.lorem.sentence(5),
        questionDescription: faker.lorem.paragraph(),
        type: { label: 'Abierta', value: 0 },
        options: [...Array(4)].map(() => ({
            id: faker.datatype.uuid(),
            option: faker.lorem.sentence(1),
        })),
        answers: [...Array(25)].map(() => ({
            id: faker.datatype.uuid(),
            user: {
                id: 1,
                name: faker.name.findName(), 
                address: faker.address.buildingNumber(),
            },
            answer: faker.lorem.sentence(1),
        })),
    })),
    sendByRole: false,
    users: [...Array(30)].map(() => ({
        id: 1,
        name: faker.name.findName(), 
        address: faker.address.buildingNumber(),
    })),
    roles: [...Array(2)].map(() => ({
        id: 1,
        name: faker.name.jobType(), 
        amount: faker.random.numeric(2),
    })),
    status: { label: 'Enviada', value: 1 },
});

export const getUsersOptions = () => ([
    { name: faker.name.findName(), id: 0, address: faker.address.buildingNumber() },
    { name: faker.name.findName(), id: 1, address: faker.address.buildingNumber() },
    { name: faker.name.findName(), id: 2, address: faker.address.buildingNumber() },
    { name: faker.name.findName(), id: 3, address: faker.address.buildingNumber() },
    { name: faker.name.findName(), id: 4, address: faker.address.buildingNumber() }
])

export const getRolesOptions = () => ([
    { name: 'Propietario', id: 0, amount: 80 },
    { name: 'Junta de Condominio', id: 1, amount: 3 },
    { name: 'Administrador', id: 2, amount: 1 }
])

export const getStatusOptions = () => ([
    { label: 'Por Enviar', value: 0 },
    { label: 'Enviada', value: 1 },
    { label: 'Terminada', value: 2 },
])

export const getUsersStatusOptions = () => ([
    { label: 'Respondió', value: 0 },
    { label: 'Por responder', value: 1 },
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


