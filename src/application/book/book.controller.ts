import { Request, Response } from "express";
import { BookService } from "./book.service";

const bookService = new BookService();

export class BookController{
    async showBooks(req: Request, res: Response): Promise<void> {
        try {
            console.log('Loading book service');
            const books = await bookService.showBooks();
            console.log(books);
            res.send(books);
        } catch (error: any) {
            console.log('failed show books')
            res.status(400).json({ message: error.message });
        }
    }
}