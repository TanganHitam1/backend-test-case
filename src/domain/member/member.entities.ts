import { BorrowEntity } from "../borrow/borrow.entities";

export class MemberEntity {
    constructor(
        public id: number,
        public code: string,
        public name: string,
        public isPenalized: boolean,
        public penalty: number,
        public borrowedBooks: BorrowEntity[],
    ) {}

    canBorrowBook(): boolean {
        return !this.isPenalized && this.borrowedBooks.length < 2;
    }

    borrowBook(borrowInfo: BorrowEntity): void {
        this.borrowedBooks.push(borrowInfo);
    }

    returnBook(bookId: number): void {
        const index = this.borrowedBooks.findIndex(borrowed => borrowed.bookId === bookId);
        if(index === -1) throw new Error('Book not borrowed');
        this.borrowedBooks.splice(index, 1);
    }
}