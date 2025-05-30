import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import { CreateContactRequest, SearchContactRequest, UpdateContactRequest } from "../model/contact-model";
import { ContactService } from "../service/contact-service";
import { ResponseError } from "../error/response-error";


export class ContactController {
  
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateContactRequest = req.body;
      const response = await ContactService.create(req.user!, request);
      res.status(200).json({
        data: response
      });
    } catch (e) {
      next(e);
    }
  }

  static checkContactIdMustBeANumber(contactId: number) {
    if (isNaN(contactId)) {
      throw new ResponseError(400, "Contact id must be a number");
    }
  }
  
  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const contactId = Number(req.params.contactId);
      ContactController.checkContactIdMustBeANumber(contactId);

      const response = await ContactService.get(req.user!, contactId);
      res.status(200).json({
        data: response
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateContactRequest = req.body;
      request.id = Number(req.params.contactId);
      const response = await ContactService.update(req.user!, request);
      res.status(200).json({
        data: response
      });
    } catch (e) {
      next(e);
    }
  }

  static async remove(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const contactId = Number(req.params.contactId);
      ContactController.checkContactIdMustBeANumber(contactId);
      await ContactService.remove(req.user!, contactId);
      res.status(200).json({
        data: "OK"
      });
    } catch (e) {
      next(e);
    }
  }

  static async search (req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: SearchContactRequest = {
        name: req.query.name as string,
        email: req.query.email as string,
        phone: req.query.phone as string,
        page: Number(req.query.page) || 1,
        size: Number(req.query.size) || 10,
      }
      const response = await ContactService.search(req.user!, request);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}
