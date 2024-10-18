
export class BorrowEntity{
    constructor(
        public id: number,
        public bookId: number,
        public memberId: number,
        public borrowDate: Date,
        public returnDate: Date | null,
        public isReturned: boolean,
    ){}

    returnBook(): void {
        this.isReturned = true;
    }

    static create(bookId: number, memberId: number): BorrowEntity {
        return new BorrowEntity(
            0,
            bookId,
            memberId,
            new Date(),
            new Date(),
            false,
        );
    }
}
