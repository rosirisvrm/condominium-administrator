import { faker } from '@faker-js/faker';
import { expenses, paymentsApproved, paymentsPending, invoices, homePayments } from '../mock/accounting';

export const getExpenses = (newRegister) => {

  if(newRegister){
    const newExpenses = [...expenses]

    newExpenses.unshift({
      id: '4',
      subject: newRegister.subject,
      amount: newRegister.amount,
      reference: newRegister.reference,
      status: { label: 'Pendiente', value: 0 },
      date: newRegister.date,
      user: {
        id: '0',
        name: 'Rosiris Romero',
        address: 'Manzana 15 - 1',
      }
    })

    return newExpenses;
  }

  return [...expenses]
};

export const getIncome = (state) => state === 'approved' ? [...paymentsApproved] : [...paymentsPending];

export const getPayments = () => [...homePayments];

export const getInvoices = () => [...invoices];

export const getPayment = (id) => ({
    id,
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
    receiverType: { label: 'Empleado', value: 0 },
    receiver: {
      label: 'Antony Medina',
      value: 1,
      id: 1,
      name: faker.name.findName(),
      identification: faker.datatype.number(),
      address: faker.address.cityName() + faker.address.streetAddress(),
      phone: faker.phone.number('+58 412 ### ####'),
      email: `${faker.random.word()}@${faker.random.word()}.com`,
      paymentMethod: 'Pago Móvil Banco Banesco'
    },
    paymentMethod: { label: 'Transferencia Banco Mercantil', value: 0 },
    file: `http://localhost:3000/static/mock-images/products/comprobante-pago.jpg`,
    description: 'Pago de mensualidad pendiente',
    rate: 26.34,
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

  const PDF_FILE_URL = 'http://localhost:3000/static/mock-files/factura-condominio.pdf';

  fetch(PDF_FILE_URL)
    .then(response => response.blob())
    .then(blob => {
      const blobURL = window.URL.createObjectURL(new Blob([blob]))
      const aTag = document.createElement('a');
      aTag.href = blobURL;
      aTag.setAttribute('download', 'factura-condominio.pdf');
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
    })

  return true;
}