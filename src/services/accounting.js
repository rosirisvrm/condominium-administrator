import { faker } from '@faker-js/faker';
import { mockExpenses, mockPayments, mockIncome, mockInvoices, mockPayment } from '../_mock/accounting';

export const getExpenses = ({ perPage = 24 } = {}) => [...mockExpenses(perPage)];

export const getIncome = ({ perPage = 24 } = {}) => [...mockIncome(perPage)];

export const getPayments = ({ perPage = 24 } = {}) => [... mockPayments(perPage)];

export const getInvoices = ({ perPage = 24 } = {}) => [...mockInvoices(perPage)];

export const getPayment = (id) => ({ ...mockPayment(id) });

export const getReceiverTypeOptions = () => ([
    { label: 'Empleado', value: 0 },
    { label: 'Proveedor', value: 1 },
]);

export const getReceiverOptions = (type) => {
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
    console.log('creating');
    console.log('body: ', body);

    return true;
}

export const putPayment = (id, body) => {
    console.log('editing: ', id);
    console.log('body: ', body);

    return true;
}

export const deletePayment = (id) => {
  console.log('deleting', id);

  return true;
}

export const downloadPayment = () => {
  console.log('downloading');

  return true;
}

export const downloadInvoicesList = () => {
  console.log('downloading');

  return true;
}

export const downloadInvoice = (id) => {
  console.log('downloading: ', id);

  return true;
}