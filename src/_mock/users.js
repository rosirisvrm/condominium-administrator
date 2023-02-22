import { faker } from '@faker-js/faker/locale/es_MX';

function mockUsers(length = 24) {
    const list = [...Array(length)].map((_, index) => {
        const name = faker.name.findName() 
        return ({      
            id: faker.datatype.uuid(),
            name,
            identification: faker.random.numeric(8),
            address: faker.address.secondaryAddress(),
            phone: faker.phone.number('+58 412 ### ####'),
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
            identification: faker.random.numeric(8),
            address: faker.address.secondaryAddress(),
            phone: faker.phone.number('+58 412 ### ####'),
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
        identification: faker.random.numeric(8),
        address: faker.address.secondaryAddress(),
        phone: faker.phone.number('+58 412 ### ####'),
        email: faker.internet.email(name, '', 'gmail.com'),
        role: { label: 'Administrador', value: 2 },
        avatarUrl: `/static/mock-images/avatars/avatar_${1}.jpg`,
    }

    list.push(list3)

    return list;
}

export { mockUsers };