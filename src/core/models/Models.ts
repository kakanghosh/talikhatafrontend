export type Address = {
  country: string;
  state: string;
  city: string;
  street: string;
};

export interface Dealership {
  id: number;
  address: string;
  createdAt: number;
  emailAddress: string;
  name: string;
  phoneNumber: string;
  vendors?: PartialVendor[];
}

export interface PartialDealer {
  id: number;
  name: string;
}

export interface Vendor {
  id: number;
  address: string;
  avatarUrl: string;
  createdAt: number;
  emailAddress: string;
  name: string;
  phoneNumber: string;
  dealerShip: PartialDealer;
}

export interface PartialVendor {
  id: number;
  name: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
