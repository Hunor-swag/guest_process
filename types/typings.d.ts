export type Language = {
  key: string;
  name: string;
};

export type Guest = {
  id: number;
  name: string;
  email: string;
  address: string;
  id_number: string;
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
  contact_name: string;
  contact_email: string;
  contact_phone: string;
};
