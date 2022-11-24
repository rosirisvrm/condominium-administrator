import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.findName(),
  address: faker.address.buildingNumber(),
  phone: faker.phone.number('+48 91 ### ## ##'),
  email: 'user@example.com',
  role: sample([
    'Propietario',
    'Junta de Condominio',
  ]),
}));

export default users;
