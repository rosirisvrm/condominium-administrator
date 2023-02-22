import { faker } from '@faker-js/faker/locale/es_MX';
import { sample } from 'lodash';

function mockExpenses(length = 24) {
   return [
        {
            id: faker.datatype.uuid(),
            subject: 'Pago proveedor por productos de limpieza',
            amount: faker.finance.amount(),
            reference: faker.datatype.number(),
            status: sample([
                { label: 'Pendiente', value: 0 },
                { label: 'Aprobado', value: 1 },
                { label: 'Rechazado', value: 2 },
            ]),
            date: faker.date.past(),
        },
        {
            id: faker.datatype.uuid(),
            subject: 'Pago jardinero',
            amount: faker.finance.amount(),
            reference: faker.datatype.number(),
            status: sample([
                { label: 'Pendiente', value: 0 },
                { label: 'Aprobado', value: 1 },
                { label: 'Rechazado', value: 2 },
            ]),
            date: faker.date.past(),
        },
        {
            id: faker.datatype.uuid(),
            subject: 'Pago conserje',
            amount: faker.finance.amount(),
            reference: faker.datatype.number(),
            status: sample([
                { label: 'Pendiente', value: 0 },
                { label: 'Aprobado', value: 1 },
                { label: 'Rechazado', value: 2 },
            ]),
            date: faker.date.past(),
        },
        {
            id: faker.datatype.uuid(),
            subject: 'Pago reparación portón',
            amount: faker.finance.amount(),
            reference: faker.datatype.number(),
            status: sample([
                { label: 'Pendiente', value: 0 },
                { label: 'Aprobado', value: 1 },
                { label: 'Rechazado', value: 2 },
            ]),
            date: faker.date.past(),
        },
        {
            id: faker.datatype.uuid(),
            subject: 'Pago proveedor por luces de lobby',
            amount: faker.finance.amount(),
            reference: faker.datatype.number(),
            status: sample([
                { label: 'Pendiente', value: 0 },
                { label: 'Aprobado', value: 1 },
                { label: 'Rechazado', value: 2 },
            ]),
            date: faker.date.past(),
        },
        {
            id: faker.datatype.uuid(),
            subject: 'Pago mantenimiento piscina',
            amount: faker.finance.amount(),
            reference: faker.datatype.number(),
            status: sample([
                { label: 'Pendiente', value: 0 },
                { label: 'Aprobado', value: 1 },
                { label: 'Rechazado', value: 2 },
            ]),
            date: faker.date.past(),
        }
    ]
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
    const list = [...Array(length)].map(() => ({
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
        user: {
            id: faker.datatype.uuid(),
            name: faker.name.findName(),
            address: `Edificio ${
                faker.random.numeric(1, { bannedDigits: ['0','5','6','7','8','9'] })
            }`,
        }
    }))

    const list2 = [...Array(5)].map(() => ({
        id: faker.datatype.uuid(),
        subject: sample(['Pago especial', 'Pago extraordinario']),
        amount: faker.finance.amount(),
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

    list2.forEach(item => list.push(item))

    return list;
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

export { mockExpenses, mockPayments, mockIncome, mockInvoices };