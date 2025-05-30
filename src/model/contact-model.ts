import { Contact } from "../generated/prisma";


export type ContactResponse = {
  id: number;
  first_name?: string | null;
  last_name: string;
  email?: string | null;
  phone?: string | null;
}

export type CreateContactRequest = {
  first_name?: string;
  last_name: string;
  email?: string;
  phone?: string;
}

export type UpdateContactRequest = {
  id: number
  first_name?: string;
  last_name: string;
  email?: string;
  phone?: string;
}

export type SearchContactRequest = {
  name?: string
  email?: string
  phone?: string
  page: number
  size: number
}

export function toContactResponse(contact: Contact): ContactResponse {
  return {
    id: contact.id,
    first_name: contact.first_name,
    last_name: contact.last_name,
    email: contact.email,
    phone: contact.phone
  }
}
