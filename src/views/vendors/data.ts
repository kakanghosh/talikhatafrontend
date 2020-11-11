import { v4 as uuid } from 'uuid';
import { Vendor } from '../../core/models/Models';

const vendorList: Vendor[] = [
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
    name: 'Tin bhai store',
    phone: '304-428-3097',
    dealer: {
      id: uuid(),
      name: 'ABC',
    },
  },
];

export default vendorList;
