"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth-middleware");
const user_controller_1 = require("../controller/user-controller");
const contact_controller_1 = require("../controller/contact-controller");
const address_controller_1 = require("../controller/address-controller");
exports.apiRouter = (0, express_1.Router)();
exports.apiRouter.use(auth_middleware_1.authMiddleware);
// User API
exports.apiRouter.get("/api/users/current", user_controller_1.UserController.get);
exports.apiRouter.patch("/api/users/current", user_controller_1.UserController.update);
exports.apiRouter.delete("/api/users/current", user_controller_1.UserController.logout);
// Contact API
exports.apiRouter.post("/api/contacts", contact_controller_1.ContactController.create);
exports.apiRouter.get("/api/contacts/:contactId", contact_controller_1.ContactController.get);
exports.apiRouter.put("/api/contacts/:contactId", contact_controller_1.ContactController.update);
exports.apiRouter.delete("/api/contacts/:contactId", contact_controller_1.ContactController.remove);
exports.apiRouter.get("/api/contacts", contact_controller_1.ContactController.search);
// Address API
exports.apiRouter.post("/api/contacts/:contactId/addresses", address_controller_1.AddressController.create);
exports.apiRouter.get("/api/contacts/:contactId/addresses/:addressId", address_controller_1.AddressController.get);
exports.apiRouter.put("/api/contacts/:contactId/addresses/:addressId", address_controller_1.AddressController.update);
exports.apiRouter.delete("/api/contacts/:contactId/addresses/:addressId", address_controller_1.AddressController.remove);
exports.apiRouter.get("/api/contacts/:contactId/addresses", address_controller_1.AddressController.list);
