import { prisma } from "../prismaClient";
import { BorrowEntity } from "../../domain/borrow/borrow.entities";
import { IBorrowRepository } from "../../domain/borrow/borrow.i.repositories";

export class BorrowRepository implements IBorrowRepository {
  async getAllBorrows(): Promise<BorrowEntity[]> {
    const borrows = await prisma.borrowed.findMany();
    if (!borrows) {
        return [];
    }
    return borrows.map((borrow) =>
        new BorrowEntity(
            borrow.id,
            borrow.bookId,
            borrow.memberId,
            borrow.borrowDate,
            borrow.returnDate,
            borrow.returned
        )
    );
  }
  async borrowBook(bookId: number, memberId: number): Promise<BorrowEntity> {
    const book = await prisma.book.findUnique({ where: { id: bookId } });
    const member = await prisma.member.findUnique({ where: { id: memberId } });
    if (!book || !member) {
      throw new Error("Book or Member not found");
    }
    if (book.stock <= 0) {
      throw new Error("Book out of stock");
    }
    const borrow = await prisma.borrowed.create({
      data: {
        book: { connect: { id: bookId } },
        member: { connect: { id: memberId } },
        borrowDate: new Date(),
      },
    });
    await prisma.book.update({
      where: { id: bookId },
      data: {
        stock: book.stock - 1,
      },
    });
    return new BorrowEntity(
      borrow.id,
      bookId,
      memberId,
      borrow.borrowDate,
      null,
      borrow.returned
    );
  }
  async returnBook(bookId: number, memberId: number): Promise<void> {
    const borrow = await prisma.borrowed.findFirst({
      where: { bookId, memberId, returned: false },
    });
    if (!borrow) {
      throw new Error("Borrow not found");
    }
    console.log(borrow);
    const borrowEntity = new BorrowEntity(
      borrow.id,
      borrow.bookId,
      borrow.memberId,
      borrow.borrowDate,
      borrow.returnDate,
      borrow.returned
    );
    await prisma.borrowed.update({
      where: { id: borrow.id },
      data: {
        returnDate: new Date(),
        returned: true,
      },
    });
    console.log(borrow);
    if (
      Date.now() >
      borrowEntity.borrowDate.getTime() + 1000 * 60 * 60 * 24 * 7
    ) {
      await prisma.member.update({
        where: { id: borrow.memberId },
        data: {
          isPenalized: true,
          penalty: 3,
        },
      });
    }
  }
}
