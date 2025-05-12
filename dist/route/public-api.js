"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controller/user-controller");
exports.publicRouter = (0, express_1.Router)();
exports.publicRouter.post("/api/users", user_controller_1.UserController.register);
exports.publicRouter.post("/api/users/login", user_controller_1.UserController.login);
