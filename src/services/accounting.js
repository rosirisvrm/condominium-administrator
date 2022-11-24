import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { number } from 'yup';
import mockUsers from '../_mock/user'

//  http request here 
export const getExpenses = () => {
  return [...Array(24)].map((_, index) => ({
    id: faker.datatype.uuid(),
    amount: 100,
    refrence: faker.datatype.number(),
    status: {
      value: 0,
      label: 'Pendiente'
    },
    date: faker.date.past(),
    user: {
      id: faker.datatype.uuid(),
      name: faker.name.findName(), 
    }
  }));
};

export const getIncome = () => {
  return [...Array(24)].map((_, index) => ({
    id: faker.datatype.uuid(),
    amount: 100,
    refrence: faker.datatype.number(),
    status: {
      value: 0,
      label: 'Pendiente'
    },
    date: faker.date.past(),
    user: {
      id: faker.datatype.uuid(),
      name: faker.name.findName(), 
    }
  }));
};

export const getPayments = () => {
  return [...Array(24)].map((_, index) => ({
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
    }
  }));
};

export const getPaid = (id) => ({
    id,
    amount: 100,
    refrence: faker.datatype.number(),
    status: {
      value: 0,
      label: 'Pendiente'
    },
    date: faker.date.past(),
    user: {
      id: faker.datatype.uuid(),
      name: faker.name.findName(), 
    }
});

// export const getRoleOptions = () => ([
//     { label: 'Propietario', value: 0 },
//     { label: 'Junta de Condominio', value: 1 },
//     { label: 'Administrador', value: 2 },
// ]);

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