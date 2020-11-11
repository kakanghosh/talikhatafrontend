import { v4 as uuid } from 'uuid';
import { Dealer } from '../../core/models/Models';

const dealers: Dealer[] = [
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'West Virginia',
      city: 'Parkersburg',
      street: '2849 Fulton Street',
    },
    avatarUrl: '/static/images/avatars/avatar_3.png',
    createdAt: 1555016400000,
    email: 'ekaterina.tankova@devias.io',
    name: 'Polar Ice-cream',
    phone: '304-428-3097',
  },
];

export default dealers;
