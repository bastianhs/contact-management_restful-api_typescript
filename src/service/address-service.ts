import { prismaClient } from "../application/database";
import { Address, User } from "../generated/prisma";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, ListAddressRequest, RemoveAddressRequest, toAddressResponse, UpdateAddressRequest } from "../model/address-model";
import { AddressValidation } from "../validation/address-validation";
import { Validation } from "../validation/validation";
import { ContactService } from "./contact-service";
import { ResponseError } from "../error/response-error";


export class AddressService {

  static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
    const validatedRequest = Validation.validate(AddressValidation.CREATE, request);

    await ContactService.checkContactMustExists(user.username, validatedRequest.contact_id);

    const address = await prismaClient.address.create({
      data: validatedRequest
    })

    return toAddressResponse(address);
  }

  static async checkAddressMustExists(contact_id: number, address_id: number): Promise<Address> {
    const address = await prismaClient.address.findUnique({
      where: {
        id: address_id,
        contact_id: contact_id
      }
    });

    if (!address) {
      throw new ResponseError(404, "Address is not found");
    }

    return address;
  }

  static async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
    const validatedRequest = Validation.validate(AddressValidation.GET, request);
    await ContactService.checkContactMustExists(user.username, validatedRequest.contact_id);
    const address = await this.checkAddressMustExists(validatedRequest.contact_id, validatedRequest.address_id);
    return toAddressResponse(address);
  }

  static async update(user: User, request: UpdateAddressRequest): Promise<AddressResponse> {
    const validatedRequest = Validation.validate(AddressValidation.UPDATE, request);
    await ContactService.checkContactMustExists(user.username, validatedRequest.contact_id);
    await this.checkAddressMustExists(validatedRequest.contact_id, validatedRequest.address_id);
    const address = await prismaClient.address.update({
      where: {
        id: validatedRequest.address_id,
        contact_id: validatedRequest.contact_id
      },
      data: {
        street: validatedRequest.street,
        city: validatedRequest.city,
        province: validatedRequest.province,
        country: validatedRequest.country,
        postal_code: validatedRequest.postal_code
      }
    })

    return toAddressResponse(address);
  }

  static async remove(user: User, request: RemoveAddressRequest): Promise<AddressResponse> {
    const validatedRequest = Validation.validate(AddressValidation.REMOVE, request);
    await ContactService.checkContactMustExists(user.username, validatedRequest.contact_id);
    await this.checkAddressMustExists(validatedRequest.contact_id, validatedRequest.address_id);

    const address = await prismaClient.address.delete({
      where: {
        id: validatedRequest.address_id,
        contact_id: validatedRequest.contact_id
      }
    });

    return toAddressResponse(address);
  }

  static async list(user: User, request: ListAddressRequest): Promise<AddressResponse[]> {
    const validatedRequest = Validation.validate(AddressValidation.LIST, request);
    await ContactService.checkContactMustExists(user.username, validatedRequest.contact_id);
    
    const addresses = await prismaClient.address.findMany({
      where: {
        contact_id: validatedRequest.contact_id
      }
    });
    
    return addresses.map(address => toAddressResponse(address));
  }

}
