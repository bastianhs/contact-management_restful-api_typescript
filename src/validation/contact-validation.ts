import { z, ZodType } from "zod";

export class ContactValidation {

  static readonly CREATE: ZodType = z.object({
    first_name: z.string().min(1).max(100).optional(),
    last_name: z.string().min(1).max(100),
    email: z.string().min(1).max(100).email().optional(),
    phone: z.string().min(1).max(20).optional()
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    first_name: z.string().min(1).max(100).optional(),
    last_name: z.string().min(1).max(100),
    email: z.string().min(1).max(100).email().optional(),
    phone: z.string().min(1).max(20).optional()
  });

  static readonly SEARCH: ZodType = z.object({
    name: z.string().min(1).optional(),
    email: z.string().min(1).optional(),
    phone: z.string().min(1).optional(),
    page: z.number().int().positive(),
    size: z.number().int().positive().max(100)
  });

}
