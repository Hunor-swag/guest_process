import { Address, Guest } from "../types/typings";

export function parseAddress(address: Address) {
  const addressParts = [
    address.number,
    address.street,
    address.city,
    address.postal_code,
    address.country,
  ];
  const filteredAddressParts = addressParts.filter(
    (part) => part.trim() !== ""
  );
  const addressString = filteredAddressParts.join(", ");
  return addressString;
}
