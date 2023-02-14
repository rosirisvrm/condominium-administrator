import { faker } from '@faker-js/faker';
import { BANKS } from '../constants';

export const getCoinOptions = () => ([
    { label: 'USD', value: 0, symbol: '$', description: 'Dólar americano' },
    { label: 'VES', value: 1, symbol: 'bs', description: 'Bolívar venezolano' },
]);

export const getRate = () => ({
    label: 'Tasa Oficial BCV',
    value: 10.00,
});

export const getPaymentMethodOptions = () => ([
    { 
        label: 'Transferencia Banco Mercantil', 
        value: 1,
        type: { label: 'Transferencia', value: 0 },
        bank: {
            value: "0105",
            label: "BANCO MERCANTIL C.A."
        },
        identificationType: { label: 'V', value: 0 },
        identification: faker.random.numeric(8),
        bankAcount: faker.random.numeric(20),
        phone: faker.phone.number('+58 412 ### ####'),
    },
    { 
        label: 'Transferencia Banco Banesco', 
        value: 0,
        type: { label: 'Transferencia', value: 0 },
        bank:  {
            value: "0134",
            label: "BANESCO BANCO UNIVERSAL"
        },
        identificationType: { label: 'V', value: 0 },
        identification: faker.random.numeric(8),
        bankAcount: faker.random.numeric(20),
        phone: faker.phone.number('+58 412 ### ####'),
    },
    { 
        label: 'Pago Móvil Banco BNC', 
        value: 2,
        type: { label: 'Pago Móvil', value: 1 },
        bank: {
            value: "0191",
            label: "BANCO NACIONAL DE CREDITO"
        },
        identificationType: { label: 'V', value: 0 },
        identification: faker.random.numeric(8),
        bankAcount: faker.random.numeric(20),
        phone: faker.phone.number('+58 412 ### ####'),
    },
    { 
        label: 'Pago Móvil Banco Provincial', 
        value: 3,
        type: { label: 'Pago Móvil', value: 1 },
        bank: {
            value: "0108",
            label: "BANCO PROVINCIAL BBVA"
        },
        identificationType: { label: 'V', value: 0 },
        identification: faker.random.numeric(8),
        bankAcount: faker.random.numeric(20),
        phone: faker.phone.number('+58 412 ### ####'),
    },
    { 
        label: 'Efectivo', 
        value: 4,
        type: { label: 'Efectivo', value: 2 },
    }
]);

export const getPaymentMethodTypeOptions = () => ([
    { label: 'Transferencia', value: 0 },
    { label: 'Pago Móvil', value: 1 },
    { label: 'Efectivo', value: 2 },
]);

export const getBankOptions = () => ([...BANKS]);

export const getIdentificationTypeOptions = () => ([
    { label: 'V', value: 0 },
    { label: 'J', value: 1 },
    { label: 'E', value: 2 },
]);

export const getGeneralInfo = () => ({
    id: faker.datatype.uuid(),
    logo: `/static/logo.svg`,
    condominiumName: faker.company.companyName(),
    feeAmount: faker.finance.amount(),
    address: faker.address.cityName() + faker.address.streetAddress(),
    phone: faker.phone.number('+58 412 ### ####'),
    email: `${faker.random.word()}@${faker.random.word()}.com`,
    description: faker.lorem.paragraph(),
    dueDate: faker.date.future(),
    administrator: {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        identification: faker.random.numeric(8),
        address: faker.address.cityName() + faker.address.streetAddress(),
        phone: faker.phone.number('+58 412 ### ####'),
        email: `${faker.random.word()}@${faker.random.word()}.com`,
    },
    condoBoard: [...Array(3)].map(() => ({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        identification: faker.random.numeric(8),
        address: faker.address.cityName() + faker.address.streetAddress(),
        phone: faker.phone.number('+58 412 ### ####'),
        email: `${faker.random.word()}@${faker.random.word()}.com`,
    }))
});

export const putGeneralInfo = (id, body) => {
    console.log('editando');
    console.log('id: ', id);
    console.log('body: ', body);

    return true;
}