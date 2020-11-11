export type Address = {
  country: string;
  state: string;
  city: string;
  street: string;
};

export interface Dealer {
  id: string;
  address: Address;
  avatarUrl: string;
  createdAt: number;
  email: string;
  name: string;
  phone: string;
  vendors?: PartialVendor[];
}

export interface PartialDealer {
  id: string;
  name: string;
}

export interface Vendor {
  id: string;
  address: Address;
  avatarUrl: string;
  createdAt: number;
  email: string;
  name: string;
  phone: string;
  dealer: PartialDealer;
}

export interface PartialVendor {
  id: string;
  name: string;
}
