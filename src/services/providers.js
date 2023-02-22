import { faker } from '@faker-js/faker/locale/es_MX';

export const getProviders = (length = 24) => [...Array(length)].map(() => {
    const companyName = faker.company.companyName()
    return ({
        id: faker.datatype.uuid(),
        companyName,
        product: faker.commerce.product(),
        address: `${faker.address.streetName()} ${faker.address.streetAddress(true)}`,
        phone: faker.phone.number('+58 412 ### ####'),
        email: faker.internet.email(companyName, '', 'gmail.com'),
        file: faker.system.filePath(),
    })
});

export const getProvider = (id) => {
    const companyName = faker.company.companyName()
    return ({
        id,
        companyName,
        companyDescription: faker.lorem.paragraph(),
        product: faker.commerce.product(),
        productDescription: faker.lorem.paragraph(),
        address: `${faker.address.streetName()} ${faker.address.streetAddress(true)}`,
        phone: faker.phone.number('+58 412 ### ####'),
        email: faker.internet.email(companyName, '', 'gmail.com'),
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
    })
};

export const postProvider = (body) => {
    console.log('creating');
    console.log('body: ', body);

    return true;
}

export const putProvider = (id, body) => {
    console.log('editing: ', id);
    console.log('body: ', body);

    return true;
}

export const deleteProvider = (id) => {
    console.log('deleting', id);

    return true;
}

export const downloadProvider = () => {
    console.log('downloading');

    return true;
}