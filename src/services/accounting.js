import { faker } from '@faker-js/faker';

//  http request here 
export const getExpenses = () => ([...Array(24)].map((_, index) => ({
    id: faker.datatype.uuid(),
    subject: `Asunto de pago ${index}`,
    amount: 100,
    reference: faker.datatype.number(),
    status: {
      value: 0,
      label: 'Pendiente'
    },
    date: faker.date.past(),
    user: {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      address: faker.address.buildingNumber(),
    }
  }))
);

export const getIncome = () => ([...Array(24)].map((_, index) => ({
    id: faker.datatype.uuid(),
    subject: `Asunto de pago ${index}`,
    amount: 100,
    reference: faker.datatype.number(),
    status: {
      value: 0,
      label: 'Pendiente'
    },
    date: faker.date.past(),
    // User data 
    userId: faker.datatype.uuid(),
    name: faker.name.findName(),
    address: faker.address.buildingNumber(),
  }))
);

export const getPayments = () => ([...Array(24)].map((_, index) => ({
    id: faker.datatype.uuid(),
    subject: `Asunto de pago ${index}`,
    amount: 100,
    reference: faker.datatype.number(),
    status: {
      value: 0,
      label: 'Pendiente'
    },
    date: faker.date.past(),
    user: {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      address: faker.address.buildingNumber(),
    }
  }))
);

export const getInvoices = () => ([...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  subject: `Asunto de pago ${index}`,
  amount: 100,
  reference: faker.datatype.number(),
  status: {
    value: 0,
    label: 'Pendiente'
  },
  date: faker.date.past(),
  user: {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    address: faker.address.buildingNumber(),
  },
  invoiceNumber: faker.datatype.number(),
}))
);

export const getPayment = (id) => ({
    id,
    subject: 'Whiteboard Templates By Industry Leaders',
    amount: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
    reference: faker.datatype.number(),
    status: {
      value: 0,
      label: 'Pendiente'
    },
    date: faker.date.past(),
    user: {
      id: faker.datatype.uuid(),
      name: faker.name.findName(), 
    },
    receiverType: { label: 'Empleado', value: 0 },
    receiver: {
      label: faker.name.findName(),
      value: faker.datatype.uuid(),
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      identification: faker.datatype.number(),
      address: faker.address.buildingNumber() ,
      phone: faker.phone.number('+48 91 ### ## ##'),
      email: 'user@example.com',
      paymentMethod: 'Transferencia Banco Banesco'
    },
    paymentMethod: { label: 'Transferencia Banco Banesco', value: 0 },
    file: `/static/mock-images/products/product_${0}.jpg`,
    description: 'How to Animate a SVG with border-image',
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
      return ([...Array(5)].map(() => ({
        label: faker.name.findName(),
        value: faker.datatype.uuid(),
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        identification: faker.datatype.number(),
        address: faker.address.buildingNumber() ,
        phone: faker.phone.number('+48 91 ### ## ##'),
        email: 'user@example.com',
        paymentMethod: 'Transferencia Banco Banesco'
      })))
    }

    // Providers
    return ([...Array(5)].map(() => ({
      label: faker.name.findName(),
      value: faker.datatype.uuid(),
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      identification: faker.datatype.number(),
      address: faker.address.buildingNumber() ,
      phone: faker.phone.number('+48 91 ### ## ##'),
      email: 'user@example.com',
      paymentMethod: 'Transferencia Banco Banesco'
    })))
};

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