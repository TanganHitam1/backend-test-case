import { Request, Response } from "express";
import { BorrowService } from "./borrow.service";

const borrowService = new BorrowService();

export class BorrowController {

    async borrowBook(req: Request, res: Response): Promise<void> {
        try {
            // console.log(req.params);
            const { memberId, bookId } = req.params;
            // console.log(memberId, bookId);
            await borrowService.borrowBook(Number(memberId), Number(bookId));
            res.status(200).json({ message: 'Book borrowed successfully' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async returnBook(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.params);
            const { memberId, bookId } = req.params;
            console.log(memberId, bookId);
            await borrowService.returnBook(Number(memberId), Number(bookId));
            res.status(200).json({ message: 'Book returned successfully' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
