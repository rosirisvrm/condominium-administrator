import { faker } from '@faker-js/faker';

//  http request here 
export const getProviders = () => [...Array(24)].map(() => ({
    id: faker.datatype.uuid(),
    companyName: faker.company.companyName(),
    product: faker.commerce.productName(),
    address: faker.address.cityName() + faker.address.streetAddress(),
    phone: faker.phone.number('+58 412 ### ####'),
    email: `${faker.random.word()}@${faker.random.word()}.com`,
    description: faker.lorem.paragraph(),
    file: faker.system.filePath(),
}));

export const getProvider = (id) => ({
    id,
    companyName: faker.company.companyName(),
    companyDescription: faker.lorem.paragraph(),
    product: faker.commerce.productName(),
    productDescription: faker.lorem.paragraph(),
    address: faker.address.cityName() + faker.address.streetAddress(),
    phone: faker.phone.number('+58 412 ### ####'),
    email: `${faker.random.word()}@${faker.random.word()}.com`,
    description: faker.lorem.paragraph(),
    file: faker.system.filePath(),
    paymentMethod: { 
        paymentMethodType: { label: 'Transferencia', value: 0 },
        bank: {
            value: "0115",
            label: "BANCO EXTERIOR C.A."
        },
        identificationType: { label: 'V', value: 0 },
        paymentMethodIdentification: faker.random.numeric(8),
        bankAcount: faker.random.numeric(20),
        paymentMethodPhone: faker.phone.number('+58 412 ### ####'),
    },
});

export const postProvider = (body) => {
    console.log('creando');
    console.log('body: ', body);

    return true;
}

export const putProvider = (id, body) => {
    console.log('editando');
    console.log('id: ', id);
    console.log('body: ', body);

    return true;
}