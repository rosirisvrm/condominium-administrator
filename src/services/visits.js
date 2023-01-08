import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

//  http request here
export const getVisits = () =>
  [...Array(6)].map(() => ({
    id: faker.datatype.uuid(),
    reason: sample(['Fiesta en la piscina', 'Parrandón navideño', 'Pintura del lobby']),
    name: faker.name.findName(),
    date: faker.date.birthdate(),
    checkIn: faker.date.birthdate(),
    place: sample(['Piscina', 'Plaza', 'Lobby']),
    guestId: faker.random.numeric(8),
  }));

// export const getEmployee = (id) => ({
//     id,
//     name: faker.name.findName(),
//     identification: faker.random.numeric(8),
//     address: faker.address.cityName() + faker.address.streetAddress(),
//     phone: faker.phone.number('+58 412 ### ####'),
//     email: `${faker.random.word()}@${faker.random.word()}.com`,
//     position: faker.name.jobType(),
//     description: faker.lorem.paragraph(),
//     startDate: faker.date.past(),
//     endDate: faker.date.future(),
//     file: faker.system.filePath(),
//     paymentMethod: {
//         paymentMethodType: { label: 'Transferencia', value: 0 },
//         bank: {
//             value: "0115",
//             label: "BANCO EXTERIOR C.A."
//         },
//         identificationType: { label: 'V', value: 0 },
//         paymentMethodIdentification: faker.random.numeric(8),
//         bankAcount: faker.random.numeric(20),
//         paymentMethodPhone: faker.phone.number('+58 412 ### ####'),
//     },
// });

// export const postEmployee = (body) => {
//     console.log('creando');
//     console.log('body: ', body);

//     return true;
// }

// export const putEmployee = (id, body) => {
//     console.log('editando');
//     console.log('id: ', id);
//     console.log('body: ', body);

//     return true;
// }
