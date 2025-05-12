"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const database_1 = require("../application/database");
const address_model_1 = require("../model/address-model");
const address_validation_1 = require("../validation/address-validation");
const validation_1 = require("../validation/validation");
const contact_service_1 = require("./contact-service");
const response_error_1 = require("../error/response-error");
class AddressService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedRequest = validation_1.Validation.validate(address_validation_1.AddressValidation.CREATE, request);
            yield contact_service_1.ContactService.checkContactMustExists(user.username, validatedRequest.contact_id);
            const address = yield database_1.prismaClient.address.create({
                data: validatedRequest
            });
            return (0, address_model_1.toAddressResponse)(address);
        });
    }
    static checkAddressMustExists(contact_id, address_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield database_1.prismaClient.address.findUnique({
                where: {
                    id: address_id,
                    contact_id: contact_id
                }
            });
            if (!address) {
                throw new response_error_1.ResponseError(404, "Address is not found");
            }
            return address;
        });
    }
    static get(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedRequest = validation_1.Validation.validate(address_validation_1.AddressValidation.GET, request);
            yield contact_service_1.ContactService.checkContactMustExists(user.username, validatedRequest.contact_id);
            const address = yield this.checkAddressMustExists(validatedRequest.contact_id, validatedRequest.address_id);
            return (0, address_model_1.toAddressResponse)(address);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedRequest = validation_1.Validation.validate(address_validation_1.AddressValidation.UPDATE, request);
            yield contact_service_1.ContactService.checkContactMustExists(user.username, validatedRequest.contact_id);
            yield this.checkAddressMustExists(validatedRequest.contact_id, validatedRequest.address_id);
            const address = yield database_1.prismaClient.address.update({
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
            });
            return (0, address_model_1.toAddressResponse)(address);
        });
    }
    static remove(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedRequest = validation_1.Validation.validate(address_validation_1.AddressValidation.REMOVE, request);
            yield contact_service_1.ContactService.checkContactMustExists(user.username, validatedRequest.contact_id);
            yield this.checkAddressMustExists(validatedRequest.contact_id, validatedRequest.address_id);
            const address = yield database_1.prismaClient.address.delete({
                where: {
                    id: validatedRequest.address_id,
                    contact_id: validatedRequest.contact_id
                }
            });
            return (0, address_model_1.toAddressResponse)(address);
        });
    }
    static list(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedRequest = validation_1.Validation.validate(address_validation_1.AddressValidation.LIST, request);
            yield contact_service_1.ContactService.checkContactMustExists(user.username, validatedRequest.contact_id);
            const addresses = yield database_1.prismaClient.address.findMany({
                where: {
                    contact_id: validatedRequest.contact_id
                }
            });
            return addresses.map(address => (0, address_model_1.toAddressResponse)(address));
        });
    }
}
exports.AddressService = AddressService;
