import { BookRepository } from "../../infrastructure/database/book.repositories";
import { BookEntity } from "../../domain/book/book.entities";

export class BookService {
    private bookRepository = new BookRepository;

    async showBooks(): Promise<BookEntity[]> {
        return this.bookRepository.getAllBooksHasStock();
    }
}