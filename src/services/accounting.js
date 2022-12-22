import { faker } from '@faker-js/faker';

//  http request here 
export const getExpenses = () => ([...Array(24)].map(() => ({
    id: faker.datatype.uuid(),
    subject: faker.lorem.sentence(4),
    amount: faker.finance.amount(),
    reference: faker.datatype.number(),
    status: {
      value: parseInt(faker.random.numeric(1, { 
        bannedDigits: ['3', '4', '5', '6', '7', '8', '9'], 
        allowLeadingZeros: true
      }), 10),
      label: 'Pendiente',
    },
    date: faker.date.past(),
    user: {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      address: faker.address.cityName() + faker.address.streetAddress(),
    }
  }))
);

export const getIncome = () => ([...Array(24)].map(() => ({
    id: faker.datatype.uuid(),
    subject: faker.lorem.sentence(4),
    amount: faker.finance.amount(),
    reference: faker.datatype.number(),
    status: {
      value: parseInt(faker.random.numeric(1, { 
        bannedDigits: ['3', '4', '5', '6', '7', '8', '9'], 
        allowLeadingZeros: true
      }), 10),
      label: 'Pendiente',
    },
    date: faker.date.past(),
    // User data 
    userId: faker.datatype.uuid(),
    name: faker.name.findName(),
    address: faker.address.cityName() + faker.address.streetAddress(),
  }))
);

export const getPayments = ({ perPage = 24 } = {}) => ([...Array(perPage)].map(() => ({
  id: faker.datatype.uuid(),
  subject: faker.lorem.sentence(4),
  amount: faker.finance.amount(),
  reference: faker.datatype.number(),
  status: {
    value: parseInt(faker.random.numeric(1, { 
      bannedDigits: ['3', '4', '5', '6', '7', '8', '9'], 
      allowLeadingZeros: true
    }), 10),
    label: 'Pendiente',
  },
  date: faker.date.past(),
  user: {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    address: faker.address.cityName() + faker.address.streetAddress(),
  }
})));


export const getInvoices = () => ([...Array(24)].map(() => ({
  id: faker.datatype.uuid(),
  subject: faker.lorem.sentence(4),
  amount: faker.finance.amount(),
  reference: faker.datatype.number(),
  status: {
    value: 1,
    label: 'Aprobado',
  },
  date: faker.date.past(),
  user: {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    address: faker.address.cityName() + faker.address.streetAddress(),
  },
  invoiceNumber: faker.datatype.number(),
}))
);

export const getPayment = (id) => ({
    id,
    subject: faker.lorem.sentence(4),
    amount: faker.finance.amount(),
    reference: faker.datatype.number(),
    status: {
      value: parseInt(faker.random.numeric(1, { 
        bannedDigits: ['3', '4', '5', '6', '7', '8', '9'], 
        allowLeadingZeros: true
      }), 10),
      label: 'Pendiente',
    },
    date: faker.date.past(),
    user: {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      address: faker.address.cityName() + faker.address.streetAddress(),
    },
    receiverType: { label: 'Empleado', value: 0 },
    receiver: {
      label: 'Antony',
      value: 1,
      id: 1,
      name: faker.name.findName(),
      identification: faker.datatype.number(),
      address: faker.address.cityName() + faker.address.streetAddress(),
      phone: faker.phone.number('+58 412 ### ####'),
      email: `${faker.random.word()}@${faker.random.word()}.com`,
      paymentMethod: 'Pago Móvil Banco Banesco'
    },
    paymentMethod: { label: 'Efectivo', value: 4 },
    file: `/static/mock-images/products/product_${0}.jpg`,
    description: faker.finance.transactionDescription(),
    rate: faker.finance.amount(),
});

export const getReceiverTypeOptions = () => ([
    { label: 'Empleado', value: 0 },
    { label: 'Proveedor', value: 1 },
]);

export const getReceiverOptions = (type) => {
  //  http request here 
  // console.log('receiver type', type);

    // Employees
    if(type === 0){

      const res = [...Array(5)].map(() => ({
        label: faker.name.findName(),
        value: faker.datatype.uuid(),
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        identification: faker.datatype.number(),
        address: faker.address.cityName() + faker.address.streetAddress(),
        phone: faker.phone.number('+58 412 ### ####'),
        email: `${faker.random.word()}@${faker.random.word()}.com`,
        paymentMethod: 'Transferencia Banco Banesco'
      }))

      res.push({
        label: 'Antony',
        value: 1,
        id: 1,
        name: faker.name.findName(),
        identification: faker.datatype.number(),
        address: faker.address.cityName() + faker.address.streetAddress(),
        phone: faker.phone.number('+58 412 ### ####'),
        email: `${faker.random.word()}@${faker.random.word()}.com`,
        paymentMethod: 'Transferencia Banco Banesco'
      })

      return res;
    }

    // Providers
    const res = [...Array(5)].map(() => ({
      label: faker.name.findName(),
      value: faker.datatype.uuid(),
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      identification: faker.datatype.number(),
      address: faker.address.cityName() + faker.address.streetAddress(),
      phone: faker.phone.number('+58 412 ### ####'),
      email: `${faker.random.word()}@${faker.random.word()}.com`,
      paymentMethod: 'Transferencia Banco Banesco'
    }))

    res.push({
      label: 'Antony',
      value: 1,
      id: 1,
      name: faker.name.findName(),
      identification: faker.datatype.number(),
      address: faker.address.cityName() + faker.address.streetAddress(),
      phone: faker.phone.number('+58 412 ### ####'),
      email: `${faker.random.word()}@${faker.random.word()}.com`,
      paymentMethod: 'Transferencia Banco Banesco'
    })

    return res;
};

export const getStatusOptions = () => ([
  { label: 'Pendiente', value: 0 },
  { label: 'Aprobado', value: 1 },
  { label: 'Rechazado', value: 2 },
]);

export const postPayment = (body) => {
    console.log('creando');
    console.log('body: ', body);

    return true;
}

export const putPayment = (id, body) => {
    console.log('editando');
    console.log('id: ', id);
    console.log('body: ', body);

    return true;
}