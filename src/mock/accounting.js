import { faker } from '@faker-js/faker';

export const expenses = [
  {
    id: '0',
    subject: 'Pago proveedor luces entrada',
    amount: 100,
    reference: 118725,
    status: { label: 'Completado', value: 1 },
    date: faker.date.recent(),
    user: {
      id: '0',
      name: 'Rosiris Romero',
      address: 'Manzana 15 - 1',
    }
  },
  {
    id: '1',
    subject: 'Pago reparación portón',
    amount: 20,
    reference: 9126352,
    status: { label: 'Completado', value: 1 },
    date: faker.date.recent(),
    user: {
      id: '0',
      name: 'Rosiris Romero',
      address: 'Manzana 15 - 1',
    }
  },
  {
    id: '2',
    subject: 'Pago conserje mes de mayo',
    amount: 50,
    reference: 1424372,
    status: { label: 'Completado', value: 1 },
    date: faker.date.recent(),
    user: {
      id: '0',
      name: 'Rosiris Romero',
      address: 'Manzana 15 - 1',
    }
  },
  {
    id: '3',
    subject: 'Pago jardinero',
    amount: 30,
    reference: 5262813,
    status: { label: 'Completado', value: 1 },
    date: faker.date.recent(),
    user: {
      id: '0',
      name: 'Rosiris Romero',
      address: 'Manzana 15 - 1',
    }
  }
]

export const paymentsApproved = [
    {
      id: '3',
      subject: 'Pago de mensualidad de mayo 2023',
      amount: 5,
      reference: '23823561',
      status: {
        value: 1,
        label: 'Aprobado',
      },
      date: faker.date.recent(),
      user: {
        id: faker.datatype.uuid(),
        name: 'Carlos Gutiérrez',
        address: 'Manzana 12 - 4',
      },
      userId: faker.datatype.uuid(),
      name: 'Carlos Gutiérrez',
      address: 'Manzana 12 - 4',
      invoiceNumber: '000263',
    },
    {
      id: '2',
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
      userId: faker.datatype.uuid(),
      name: 'Ramón Figuera',
      address: 'Manzana 5 - 1',
      invoiceNumber: '000262',
    },
    {
      id: '1',
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
      userId: faker.datatype.uuid(),
      name: 'María Sifuentes',
      address: 'Manzana 7 - 3',
      invoiceNumber: '000261',
    },
    {
      id: '0',
      subject: 'Pago cuota mayo 2023',
      amount: 5,
      reference: faker.datatype.number(),
      status: {
        value: 1,
        label: 'Aprobado',
      },
      date: '18-05-2023',
      user: {
        id: faker.datatype.uuid(),
        name: 'Clara Montoya',
        address: 'Manzana 1 - 8',
      },
      userId: faker.datatype.uuid(),
      name: 'Clara Montoya',
      address: 'Manzana 1 - 8',
      invoiceNumber: '000260',
    },
];

export const paymentsPending = [
  {
    id: '3',
    subject: 'Pago de mensualidad de mayo 2023',
    amount: 5,
    reference: '23823561',
    status: {
      value: 0,
      label: 'Pendiente',
    },
    date: faker.date.recent(),
    user: {
      id: faker.datatype.uuid(),
      name: 'Carlos Gutiérrez',
      address: 'Manzana 12 - 4',
    },
    userId: faker.datatype.uuid(),
    name: 'Carlos Gutiérrez',
    address: 'Manzana 12 - 4',
    invoiceNumber: '000263',
  },
  {
    id: '2',
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
    userId: faker.datatype.uuid(),
    name: 'Ramón Figuera',
    address: 'Manzana 5 - 1',
    invoiceNumber: '000262',
  },
  {
    id: '1',
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
    userId: faker.datatype.uuid(),
    name: 'María Sifuentes',
    address: 'Manzana 7 - 3',
    invoiceNumber: '000261',
  },
  {
    id: '0',
    subject: 'Pago cuota mayo 2023',
    amount: 5,
    reference: faker.datatype.number(),
    status: {
      value: 1,
      label: 'Aprobado',
    },
    date: '18-05-2023',
    user: {
      id: faker.datatype.uuid(),
      name: 'Clara Montoya',
      address: 'Manzana 1 - 8',
    },
    userId: faker.datatype.uuid(),
    name: 'Clara Montoya',
    address: 'Manzana 1 - 8',
    invoiceNumber: '000260',
  },
];

export const homePayments = [
  {
    id: '3',
    subject: 'Pago de mensualidad de mayo 2023',
    amount: 5,
    reference: '23823561',
    status: {
      value: 0,
      label: 'Pendiente',
    },
    date: '29-05-2023',
    user: {
      id: faker.datatype.uuid(),
      name: 'Carlos Gutiérrez',
      address: 'Manzana 12 - 4',
    },
    userId: faker.datatype.uuid(),
    name: 'Carlos Gutiérrez',
    address: 'Manzana 12 - 4',
    invoiceNumber: '000263',
  },
  {
    id: '2',
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
    userId: faker.datatype.uuid(),
    name: 'Ramón Figuera',
    address: 'Manzana 5 - 1',
    invoiceNumber: '000262',
  },
  {
    id: '1',
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
    userId: faker.datatype.uuid(),
    name: 'María Sifuentes',
    address: 'Manzana 7 - 3',
    invoiceNumber: '000261',
  },
  {
    id: '0',
    subject: 'Pago cuota mayo 2023',
    amount: 5,
    reference: faker.datatype.number(),
    status: {
      value: 1,
      label: 'Aprobado',
    },
    date: '18-05-2023',
    user: {
      id: faker.datatype.uuid(),
      name: 'Clara Montoya',
      address: 'Manzana 1 - 8',
    },
    userId: faker.datatype.uuid(),
    name: 'Clara Montoya',
    address: 'Manzana 1 - 8',
    invoiceNumber: '000260',
  },
]

export const invoices = [
  {
    id: '3',
    subject: 'Pago de mensualidad de mayo 2023',
    amount: 5,
    reference: '23823561',
    status: {
      value: 1,
      label: 'Aprobado',
    },
    date: '20-05-2023',
    user: {
      id: faker.datatype.uuid(),
      name: 'Carlos Gutiérrez',
      address: 'Manzana 12 - 4',
    },
    userId: faker.datatype.uuid(),
    name: 'Carlos Gutiérrez',
    address: 'Manzana 12 - 4',
    invoiceNumber: '000263',
  },
  {
    id: '2',
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
    userId: faker.datatype.uuid(),
    name: 'Ramón Figuera',
    address: 'Manzana 5 - 1',
    invoiceNumber: '000262',
  },
  {
    id: '0',
    subject: 'Pago cuota mayo 2023',
    amount: 5,
    reference: faker.datatype.number(),
    status: {
      value: 1,
      label: 'Aprobado',
    },
    date: '18-05-2023',
    user: {
      id: faker.datatype.uuid(),
      name: 'Clara Montoya',
      address: 'Manzana 1 - 8',
    },
    userId: faker.datatype.uuid(),
    name: 'Clara Montoya',
    address: 'Manzana 1 - 8',
    invoiceNumber: '000260',
  },
];