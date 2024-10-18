import { MemberRepository } from '../../infrastructure/database/member.repositories';
import { BookRepository } from '../../infrastructure/database/book.repositories';
import { BorrowRepository } from '../../infrastructure/database/borrow.repositories';

export class BorrowService{

    private memberRepository = new MemberRepository;
    private bookRepository = new BookRepository;
    private borrowRepository = new BorrowRepository;

    async borrowBook(memberId: number, bookId: number): Promise<void> {
        const member = await this.memberRepository.getById(memberId);
        const book = await this.bookRepository.bookBorrowed(bookId);
        // console.log(member, book);
        if(!member || !book) throw new Error('Member or Book not found');
        if(!member.canBorrowBook()) throw new Error('Member cannot borrow book');
        if(!book.canBorrowed()) throw new Error('Book cannot stock is empty');

        const borrowInfo = await this.borrowRepository.borrowBook(bookId, memberId);
        // console.log(borrowInfo);
        member.borrowBook(borrowInfo);
        book.borrow();

        await this.memberRepository.update(member);
        await this.bookRepository.update(book);
    }

    async returnBook(memberId: number, bookId: number): Promise<void> {
        const member = await this.memberRepository.getById(memberId);
        const book = await this.bookRepository.bookBorrowed(bookId);

        if(!member || !book) {
            throw new Error('Member or Book not found');
        }

        member.returnBook(bookId);
        book.return();

        await this.memberRepository.update(member);
        await this.bookRepository.update(book);
        await this.borrowRepository.returnBook(bookId, memberId);
    }
}
