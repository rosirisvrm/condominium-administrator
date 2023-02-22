import { faker } from '@faker-js/faker';
import { faker as fakerES } from '@faker-js/faker/locale/es_MX';
import { sample } from 'lodash';
import { getPaymentMethodOptions } from '../services/customSettings';
import { BANKS } from '../constants';

function mockProviders(length = 24) {
    return [...Array(length)].map(() => {
        const companyName = faker.lorem.word()
        return ({
            id: fakerES.datatype.uuid(),
            companyName,
            product: sample(['luces', 'bolsas', 'pintura','cerraduras', 'papel', 'productos de limpieza']),
            address: `${fakerES.address.streetName()} ${fakerES.address.streetAddress(true)}`,
            phone: faker.phone.number(`+58 ${
                sample(['412', '416', '426', '414', '424'])
            } ### ####`),
            email: fakerES.internet.email(companyName, '', 'gmail.com'),
            file: fakerES.system.filePath(),
            paymentMethod: sample(getPaymentMethodOptions)
        })
    }); 
}

function mockProvider(id) {
    const companyName = faker.lorem.word()
    return ({
        id,
        companyName,
        companyDescription: faker.lorem.paragraph(),
        product: 'Productos de limpieza',
        productDescription: 'Son sustancias que se utilizan para eliminar la suciedad, incluidos el polvo, las manchas, los malos olores y el desorden en las superficies.​ ',
        address: `${fakerES.address.streetName()} ${fakerES.address.streetAddress(true)}`,
        phone: faker.phone.number(`+58 ${
            sample(['412', '416', '426', '414', '424'])
        } ### ####`),
        email: fakerES.internet.email(companyName, '', 'gmail.com'),
        file: fakerES.system.filePath(),
        paymentMethod: { 
            paymentMethodType: { label: 'Transferencia', value: 0 },
            bank: sample(BANKS),
            identificationType: { label: 'V', value: 0 },
            paymentMethodIdentification: fakerES.random.numeric(7),
            bankAcount: fakerES.random.numeric(20),
            paymentMethodPhone: faker.phone.number(`+58 ${
                sample(['412', '416', '426', '414', '424'])
            } ### ####`),
        },
    })
}

export { mockProviders, mockProvider };