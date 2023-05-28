import { faker } from '@faker-js/faker';
// import { sample } from 'lodash';

export const payments = [
    {
      id: faker.datatype.uuid(),
      subject: 'Pago de mensualidad de mayo 2023',
      amount: 5,
      reference: faker.datatype.number(),
      status: {
        value: 1,
        label: 'Aprobado',
      },
      date: '20-05-2023',
      user: {
        id: faker.datatype.uuid(),
        name: 'Samuel Ramírez',
        address: 'Manzana 21 - 4',
      },
      invoiceNumber: '000263',
    },
    {
      id: faker.datatype.uuid(),
      subject: 'Mensualidad mayo 2023',
      amount: 5,
      reference: faker.datatype.number(),
      status: {
        value: 1,
        label: 'Aprobado',
      },
      date: '20-05-2023',
      user: {
        id: faker.datatype.uuid(),
        name: 'Ramón Figuera',
        address: 'Manzana 5 - 1',
      },
      invoiceNumber: '000262',
    },
    {
      id: faker.datatype.uuid(),
      subject: 'Pago mayo',
      amount: 5,
      reference: faker.datatype.number(),
      status: {
        value: 2,
        label: 'Rechazado',
      },
      date: '19-05-2023',
      user: {
        id: faker.datatype.uuid(),
        name: 'María Sifuentes',
        address: 'Manzana 7 - 3',
      },
      invoiceNumber: '000261',
    },
];