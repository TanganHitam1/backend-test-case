import { Router } from "express";
import { BookController } from "./book.controller";
import IRouter from "../router.interface";


class bookRoutes implements IRouter{
    public router = Router();

    constructor(){
        this.router = Router();
        this.routes();
    }

    public routes(): void{
        console.log('Get Controller')
        const bookController = new BookController();

        this.router.get("/", bookController.showBooks);
    }
}

export default new bookRoutes().router;