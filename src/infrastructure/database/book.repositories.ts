import { prisma } from "../prismaClient";
import { BookEntity } from "../../domain/book/book.entities";
import { IBookRepository } from "../../domain/book/book.i.repositories";

export class BookRepository implements IBookRepository{
    async getAllBooks(): Promise<BookEntity[]> {
        const books = await prisma.book.findMany();
        return books.map((book: { id: number; title: string; author: string; stock: number; code:string}) => new  BookEntity(book.id,  book.code, book.title, book.author, book.stock));
    }

    async bookBorrowed(id: number): Promise<BookEntity> {
        const book = await prisma.book.findUnique({ where: { id } });
        if (!book) {
            throw new Error(`Book with id ${id} not found`);
        }
        return new BookEntity(book.id,  book.code, book.title, book.author, book.stock);
    }

    async getAllBooksHasStock(): Promise<BookEntity[]> {
        console.log('Book Repository');
        const books = await prisma.book.findMany({ where: { stock: { gt: 0 } } });
        return books.map((book: { id: number; title: string; author: string; stock: number; code:string}) => new  BookEntity(book.id,  book.code, book.title, book.author, book.stock));
    }

    async update(book: BookEntity): Promise<void> {
        await prisma.book.update({
            where: { id: book.id },
            data: {
                stock: book.stock,
            }
        });
    }
}