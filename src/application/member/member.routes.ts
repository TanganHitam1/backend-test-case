import { Router } from "express";
import { MemberController } from "./member.controller";
import IRouter from "../router.interface";

class memberRoutes implements IRouter{
    public router = Router();

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void{
        const memberController = new MemberController();

        this.router.get("/", memberController.showMembers);
    }
}

export default new memberRoutes().router;