import { BorrowEntity } from "./borrow.entities";

export interface IBorrowRepository {
    getAllBorrows(): Promise<BorrowEntity[]>;
    borrowBook(bookId: number, memberId: number): Promise<BorrowEntity>;
    returnBook(bookId: number, memberId: number): Promise<void>;
}
