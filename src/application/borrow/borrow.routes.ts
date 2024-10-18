import { Router, Request, Response } from 'express';
import { BorrowController } from './borrow.controller';
import IRouter from '../router.interface';

class borrowRoutes implements IRouter{
    public router = Router();

    constructor(){
        this.router = Router()
        this.routes();
    }

    public routes(): void{
        const borrowController = new BorrowController();
        this.router.post('/borrowBook/:memberId/:bookId', borrowController.borrowBook);
        this.router.post('/returnBook/:memberId/:bookId', borrowController.returnBook);
        this.router.route('/').get((req: Request, res: Response) => {
            res.send('Borrow Book');
        });
    }
}

export default new borrowRoutes().router;
