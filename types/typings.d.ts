export type Language = {
  key: string;
  name: string;
};

export type Guest = {
  id: number;
  name: string;
  email: string;
  address: Address;
};

export type Address = {
  country: string;
  postal_code: string;
  city: string;
  street: string;
  number: string;
};

export type User = {
  id: number;
  email: string;
  name: string;
  password: string;
  phone_number: string;
};

export type HotelSystemObject = {
  name: string;
  subdomain: string;
  db_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
};
