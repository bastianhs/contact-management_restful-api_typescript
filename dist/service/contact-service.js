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
exports.ContactService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const prisma_1 = require("../generated/prisma");
const contact_model_1 = require("../model/contact-model");
const contact_validation_1 = require("../validation/contact-validation");
const validation_1 = require("../validation/validation");
class ContactService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(contact_validation_1.ContactValidation.CREATE, request);
            const record = Object.assign(Object.assign({}, createRequest), { username: user.username });
            const contact = yield database_1.prismaClient.contact.create({
                data: record
            });
            return (0, contact_model_1.toContactResponse)(contact);
        });
    }
    static checkContactMustExists(username, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield database_1.prismaClient.contact.findUnique({
                where: {
                    id: contactId,
                    username: username
                }
            });
            if (!contact) {
                throw new response_error_1.ResponseError(404, "Contact not found");
            }
            return contact;
        });
    }
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield this.checkContactMustExists(user.username, id);
            return (0, contact_model_1.toContactResponse)(contact);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(contact_validation_1.ContactValidation.UPDATE, request);
            yield this.checkContactMustExists(user.username, updateRequest.id);
            const contact = yield database_1.prismaClient.contact.update({
                where: {
                    id: updateRequest.id,
                    username: user.username
                },
                data: updateRequest
            });
            return (0, contact_model_1.toContactResponse)(contact);
        });
    }
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkContactMustExists(user.username, id);
            const contact = yield database_1.prismaClient.contact.delete({
                where: {
                    id: id,
                    username: user.username
                }
            });
            return (0, contact_model_1.toContactResponse)(contact);
        });
    }
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedRequest = validation_1.Validation.validate(contact_validation_1.ContactValidation.SEARCH, request);
            const andFilters = [];
            if (validatedRequest.name) {
                andFilters.push({
                    OR: [
                        {
                            first_name: {
                                contains: validatedRequest.name,
                                mode: prisma_1.Prisma.QueryMode.insensitive
                            }
                        },
                        {
                            last_name: {
                                contains: validatedRequest.name,
                                mode: prisma_1.Prisma.QueryMode.insensitive
                            }
                        },
                    ]
                });
            }
            if (validatedRequest.email) {
                andFilters.push({
                    email: {
                        contains: validatedRequest.email,
                        mode: prisma_1.Prisma.QueryMode.insensitive
                    }
                });
            }
            if (validatedRequest.phone) {
                andFilters.push({
                    phone: {
                        contains: validatedRequest.phone,
                        mode: prisma_1.Prisma.QueryMode.insensitive
                    }
                });
            }
            const contacts = yield database_1.prismaClient.contact.findMany({
                where: {
                    username: user.username,
                    AND: andFilters
                },
                take: validatedRequest.size,
                skip: (validatedRequest.page - 1) * validatedRequest.size
            });
            const countContacts = yield database_1.prismaClient.contact.count({
                where: {
                    username: user.username,
                    AND: andFilters
                }
            });
            return {
                data: contacts.map(contacts => (0, contact_model_1.toContactResponse)(contacts)),
                paging: {
                    current_page: validatedRequest.page,
                    page_size: validatedRequest.size,
                    total_results: countContacts,
                    total_pages: Math.ceil(countContacts / validatedRequest.size),
                }
            };
        });
    }
}
exports.ContactService = ContactService;
