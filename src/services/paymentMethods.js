import { faker } from '@faker-js/faker';

export const getPaymentMethod = () => ({ 
        id: 0,
        label: 'Transferencia Banco Mercantil', 
        value: 0,
        type: { label: 'Transferencia', value: 0 },
        bank: {
            value: "0105",
            label: "BANCO MERCANTIL C.A."
        },
        identificationType: { label: 'V', value: 0 },
        identification: faker.random.numeric(8),
        bankAcount: faker.random.numeric(20),
        phone: faker.phone.number('+58 412 ### ####'),
});

export const postPaymentMethod = (body) => {
    console.log('body: ', body);

    return true;
}

export const putPaymentMethod = (id, body) => {
    console.log('editing: ', id);
    console.log('body: ', body);

    return true;
}