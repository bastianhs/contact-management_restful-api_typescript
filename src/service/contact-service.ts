import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { Contact, Prisma, User } from "../generated/prisma";
import { ContactResponse, CreateContactRequest, SearchContactRequest, toContactResponse, UpdateContactRequest } from "../model/contact-model";
import { Pageable } from "../model/page";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";


export class ContactService {

  static async create(user: User, request: CreateContactRequest): Promise<ContactResponse> {
    const createRequest = Validation.validate(ContactValidation.CREATE, request);

    const record = {
      ...createRequest,
      username: user.username
    }

    const contact = await prismaClient.contact.create({
      data: record
    });

    return toContactResponse(contact);
  }

  static async checkContactMustExists(username: string, contactId: number): Promise<Contact> {
    const contact = await prismaClient.contact.findUnique({
      where: {
        id: contactId,
        username: username
      }
    });

    if (!contact) {
      throw new ResponseError(404, "Contact not found");
    }

    return contact;
  }

  static async get(user: User, id: number): Promise<ContactResponse> {

    const contact = await this.checkContactMustExists(user.username, id);

    return toContactResponse(contact);
  }

  static async update(user: User, request: UpdateContactRequest): Promise<ContactResponse> {
    const updateRequest = Validation.validate(ContactValidation.UPDATE, request)
    await this.checkContactMustExists(user.username, updateRequest.id);

    const contact = await prismaClient.contact.update({
      where: {
        id: updateRequest.id,
        username: user.username
      },
      data: updateRequest
    });

    return toContactResponse(contact);
  }

  static async remove(user: User, id: number): Promise<ContactResponse> {
    await this.checkContactMustExists(user.username, id);

    const contact = await prismaClient.contact.delete({
      where: {
        id: id,
        username: user.username
      }
    });

    return toContactResponse(contact);
  }

  static async search(user: User, request: SearchContactRequest): Promise<Pageable<ContactResponse>> {
    const validatedRequest = Validation.validate(ContactValidation.SEARCH, request);

    const andFilters = [];
    if (validatedRequest.name) {
      andFilters.push({
        OR: [
          {
            first_name: {
              contains: validatedRequest.name,
              mode: Prisma.QueryMode.insensitive
            }
          },
          {
            last_name: {
              contains: validatedRequest.name,
              mode: Prisma.QueryMode.insensitive
            }
          },
        ]
      });
    }
    if (validatedRequest.email) {
      andFilters.push({
        email: {
          contains: validatedRequest.email,
          mode: Prisma.QueryMode.insensitive
        }
      });
    }
    if (validatedRequest.phone) {
      andFilters.push({
        phone: {
          contains: validatedRequest.phone,
          mode: Prisma.QueryMode.insensitive
        }
      });
    }

    const contacts = await prismaClient.contact.findMany({
      where: {
        username: user.username,
        AND: andFilters
      },
      take: validatedRequest.size,
      skip: (validatedRequest.page - 1) * validatedRequest.size
    });

    const countContacts = await prismaClient.contact.count({
      where: {
        username: user.username,
        AND: andFilters
      }
    });

    return {
      data: contacts.map(contacts => toContactResponse(contacts)),
      paging: {
        current_page: validatedRequest.page,
        page_size: validatedRequest.size,
        total_results: countContacts,
        total_pages: Math.ceil(countContacts / validatedRequest.size),
      }
    };
  }
}
