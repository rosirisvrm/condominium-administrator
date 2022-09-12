import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.findName(),
  address: faker.address.buildingNumber(),
  subject: faker.lorem.sentence(3),
  level: sample(['Alta', 'Media', 'Baja']),
  status: sample([
    'Pendiente',
    'Aprobada',
    'Rechazada',
  ]),
})); 

export default users;
