export class BookEntity{
    constructor(
        public id: number,
        public code: string,
        public title: string,
        public author: string,
        public stock: number,
    ){}

    canBorrowed(): boolean {
        return this.stock > 0;
    }

    borrow(): void {
        this.stock--;
    }

    return(): void {
        this.stock++;
    }
}