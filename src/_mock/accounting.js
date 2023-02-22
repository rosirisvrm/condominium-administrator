import { faker } from '@faker-js/faker/locale/es_MX';
import { sample } from 'lodash';

function mockExpenses(length = 24) {
   return [...Array(length)].map(() => ({
        id: faker.datatype.uuid(),
        subject: sample([
            'Pago proveedor por productos de limpieza',
            'Pago jardinero',
            'Pago conserje',
            'Pago reparación portón',
            'Pago proveedor por luces de lobby',
            'Pago mantenimiento piscina',
        ]),
        amount: faker.finance.amount(),
        reference: faker.datatype.number(),
        status: sample([
            { label: 'Pendiente', value: 0 },
            { label: 'Completado', value: 1 },
        ]),
        date: faker.date.past(),
    }))
}

function mockIncome(length = 24) {
   return ([...Array(length)].map(() => ({
        id: faker.datatype.uuid(),
        subject: `Mensualidad ${
            sample(['enero', 'febrero', 'marzo','abril', 'mayo', 'junio', 
            'julio', 'agosto','septiembre', 'octubre', 'noviembre', 'diciembre'])
        }`,
        amount: 10,
        reference: faker.datatype.number(),
        status: sample([
            { label: 'Pendiente', value: 0 },
            { label: 'Aprobado', value: 1 },
            { label: 'Rechazado', value: 2 },
        ]),
        date: faker.date.past(),
        userId: faker.datatype.uuid(),
        name: faker.name.findName(),
        address: `Edificio ${
            faker.random.numeric(1, { bannedDigits: ['0','5','6','7','8','9'] })
        }`,
    })))
}

function mockPayments(length = 24){
    return [...Array(length)].map(() => ({
        id: faker.datatype.uuid(),
        subject: sample([
            `Mensualidad ${sample(['enero', 'febrero', 'marzo','abril', 'mayo', 'junio', 
            'julio', 'agosto','septiembre', 'octubre', 'noviembre', 'diciembre'])}`,
            sample(['Pago especial', 'Pago extraordinario']),
        ]),
        amount: 10,
        reference: faker.datatype.number(),
        status: sample([
            { label: 'Pendiente', value: 0 },
            { label: 'Aprobado', value: 1 },
            { label: 'Rechazado', value: 2 },
        ]),
        date: faker.date.past(),
        user: {
            id: faker.datatype.uuid(),
            name: faker.name.findName(),
            address: `Edificio ${
                faker.random.numeric(1, { bannedDigits: ['0','5','6','7','8','9'] })
            }`,
        }
    }))
}

function mockInvoices(length = 24) {
    return [...Array(length)].map(() => ({
        id: faker.datatype.uuid(),
        subject: `Mensualidad ${
            sample(['enero', 'febrero', 'marzo','abril', 'mayo', 'junio', 
            'julio', 'agosto','septiembre', 'octubre', 'noviembre', 'diciembre'])
        }`,
        amount: 10.00,
        reference: faker.datatype.number(),
        status: {
          value: 1,
          label: 'Aprobado',
        },
        date: faker.date.past(),
        user: {
          id: faker.datatype.uuid(),
          name: faker.name.findName(),
          address: `Edificio ${
            faker.random.numeric(1, { bannedDigits: ['0','5','6','7','8','9'] })
          }`,
        },
        invoiceNumber: faker.datatype.number(),
      }))
    
}

function mockPayment(id){
    return ({
        id,
        subject: sample([
            `Mensualidad ${sample(['enero', 'febrero', 'marzo','abril', 'mayo', 'junio', 
            'julio', 'agosto','septiembre', 'octubre', 'noviembre', 'diciembre'])}`,
            sample(['Pago especial', 'Pago extraordinario']),
        ]),
        amount: 10,
        reference: faker.datatype.number(),
        status: sample([
            { label: 'Pendiente', value: 0 },
            { label: 'Aprobado', value: 1 },
            { label: 'Rechazado', value: 2 },
        ]),
        date: faker.date.past(),
        user: {
          id: faker.datatype.uuid(),
          name: faker.name.findName(),
          address: `Edificio ${
            faker.random.numeric(1, { bannedDigits: ['0','5','6','7','8','9'] })
        }`,
        },
        receiverType: { label: 'Empleado', value: 0 },
        receiver: {
          label: faker.name.findName(),
          value: 1,
          id: 1,
          name: faker.name.findName(),
          identification: faker.datatype.number(7),
          address: faker.address.cityName() + faker.address.streetAddress(),
          phone: faker.phone.number('+58 412 ### ####'),
          email: `${faker.random.word()}@${faker.random.word()}.com`,
          paymentMethod: 'Pago Móvil Banco Banesco'
        },
        paymentMethod: { label: 'Efectivo', value: 4 },
        file: `/static/mock-images/news/news_${1}.jpg`,
        description: faker.finance.transactionDescription(),
        rate: faker.finance.amount(),
    })
}

export { mockExpenses, mockPayments, mockIncome, mockInvoices, mockPayment };