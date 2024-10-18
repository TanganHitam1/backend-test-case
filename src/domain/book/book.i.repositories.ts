import { BookEntity } from "./book.entities";

export interface IBookRepository {
    getAllBooks(): Promise<BookEntity[]>;
    bookBorrowed(id: number): Promise<BookEntity>;
    getAllBooksHasStock(): Promise<BookEntity[]>;
    update(book: BookEntity): Promise<void>;
}