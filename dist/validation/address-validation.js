"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressValidation = void 0;
const zod_1 = require("zod");
class AddressValidation {
}
exports.AddressValidation = AddressValidation;
AddressValidation.CREATE = zod_1.z.object({
    contact_id: zod_1.z.number().int().positive(),
    street: zod_1.z.string().min(1).max(255).optional(),
    city: zod_1.z.string().min(1).max(100).optional(),
    province: zod_1.z.string().min(1).max(100).optional(),
    country: zod_1.z.string().min(1).max(100),
    postal_code: zod_1.z.string().min(1).max(100)
});
AddressValidation.GET = zod_1.z.object({
    contact_id: zod_1.z.number().int().positive(),
    address_id: zod_1.z.number().int().positive()
});
AddressValidation.UPDATE = zod_1.z.object({
    address_id: zod_1.z.number().int().positive(),
    contact_id: zod_1.z.number().int().positive(),
    street: zod_1.z.string().min(1).max(255).optional(),
    city: zod_1.z.string().min(1).max(100).optional(),
    province: zod_1.z.string().min(1).max(100).optional(),
    country: zod_1.z.string().min(1).max(100),
    postal_code: zod_1.z.string().min(1).max(100)
});
AddressValidation.REMOVE = zod_1.z.object({
    contact_id: zod_1.z.number().int().positive(),
    address_id: zod_1.z.number().int().positive()
});
AddressValidation.LIST = zod_1.z.object({
    contact_id: zod_1.z.number().int().positive()
});
