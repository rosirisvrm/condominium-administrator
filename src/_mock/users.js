import { faker } from '@faker-js/faker/locale/es_MX';
import { sample } from 'lodash';

function mockUsers(length = 24) {
    const list = [...Array(length)].map((_, index) => {
        const name = faker.name.findName() 
        return ({      
            id: faker.datatype.uuid(),
            name,
            identification: faker.random.numeric(7),
            address: `Edificio ${
                faker.random.numeric(1, { bannedDigits: ['0','5','6','7','8','9'] })
            }`,
            phone: faker.phone.number(`+58 ${
                sample(['412', '416', '426', '414', '424'])
            } ### ####`),
            email: faker.internet.email(name, '', 'gmail.com'),
            role: { label: 'Propietario', value: 0 },
            avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
        })
    })

    const list2 = [...Array(3)].map((_, index) => {
        const name = faker.name.findName() 
        return({
            id: faker.datatype.uuid(),
            name,
            identification: faker.random.numeric(7),
            address: `Edificio ${
                faker.random.numeric(1, { bannedDigits: ['0','5','6','7','8','9'] })
            }`,
            phone: faker.phone.number(`+58 ${
                sample(['412', '416', '426', '414', '424'])
            } ### ####`),
            email: faker.internet.email(name, '', 'gmail.com'),
            role: { label: 'Junta de Condominio', value: 1 },
            avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
        })
    })

    list2.forEach(item => list.push(item))

    const name = faker.name.findName() 
    const list3 = {
        id: faker.datatype.uuid(),
        name,
        identification: faker.random.numeric(7),
        address: `Edificio ${
            faker.random.numeric(1, { bannedDigits: ['0','5','6','7','8','9'] })
        }`,
        phone: faker.phone.number(`+58 ${
            sample(['412', '416', '426', '414', '424'])
        } ### ####`),
        email: faker.internet.email(name, '', 'gmail.com'),
        role: { label: 'Administrador', value: 2 },
        avatarUrl: `/static/mock-images/avatars/avatar_${1}.jpg`,
    }

    list.push(list3)

    return list;
}

function mockUser(id) {
    const password = faker.internet.password()
    const name = faker.name.findName()
    return ({
        id,
        name,
        identification: faker.random.numeric(7),
        address: `Edificio ${
            faker.random.numeric(1, { bannedDigits: ['0','5','6','7','8','9'] })
        }`,
        phone: faker.phone.number(`+58 ${
            sample(['412', '416', '426', '414', '424'])
        } ### ####`),
        email: faker.internet.email(name, '', 'gmail.com'),
        role: sample([
            { label: 'Propietario', value: 0 },
            { label: 'Junta de Condominio', value: 1 },
            { label: 'Administrador', value: 2 },
        ]),
        avatarUrl: `/static/mock-images/avatars/avatar_${1}.jpg`,
        password,
        passwordConfirm: password,
    });
}

export { mockUsers, mockUser };