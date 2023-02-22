import { faker } from '@faker-js/faker/locale/es_MX';
import { sample } from 'lodash';
import { getPaymentMethodOptions } from './customSettings';

export const getEmployees = (length = 24) => [...Array(length)].map(() => {
    const name = faker.name.findName()
    return ({
        id: faker.datatype.uuid(),
        name,
        identification: faker.random.numeric(8),
        address: `${faker.address.streetName()} ${faker.address.streetAddress(true)}`,
        phone: faker.phone.number('+58 412 ### ####'),
        email: faker.internet.email(name, '', 'gmail.com'),
        position: sample(['Conserje', 'Seguridad', 'Jardinero', 'Servicio', 'Pintor', 'Plomero']),
        description: faker.lorem.paragraph(),
        startDate: faker.date.past(),
        endDate: faker.date.future(),
        file: faker.system.filePath(),
        paymentMethod: sample(getPaymentMethodOptions)
    })
});

export const getEmployee = (id) => {
    const name = faker.name.findName()
    return ({
        id,
        name,
        identification: faker.random.numeric(8),
        address: `${faker.address.streetName()} ${faker.address.streetAddress(true)}`,
        phone: faker.phone.number('+58 412 ### ####'),
        email: faker.internet.email(name, '', 'gmail.com'),
        position: sample(['Conserje']),
        description: 'Persona que por oficio tiene a su cargo las llaves de un edificio o establecimiento público, cuida de su mantenimiento, vigilancia y limpieza y realiza otros trabajos no especializados.',
        startDate: faker.date.past(),
        endDate: faker.date.future(),
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

export const postEmployee = (body) => {
    console.log('creating');
    console.log('body: ', body);

    return true;
}

export const putEmployee = (id, body) => {
    console.log('editing: ', id);
    console.log('body: ', body);

    return true;
}

export const deleteEmployee = (id) => {
    console.log('deleting ', id);

    return true;
}

export const downloadEmployee = () => {
    console.log('downloading');

    return true;
}