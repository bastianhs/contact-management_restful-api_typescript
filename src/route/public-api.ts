import { Router } from "express";
import { UserController } from "../controller/user-controller";


export const publicRouter = Router();
publicRouter.post("/api/users", UserController.register)
publicRouter.post("/api/users/login", UserController.login)
