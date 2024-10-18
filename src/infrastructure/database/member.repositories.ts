import { prisma } from "../prismaClient";
import { MemberEntity } from "../../domain/member/member.entities";
import { IMemberRepository } from "../../domain/member/member.i.repositories";
import { BorrowRepository } from './borrow.repositories';

export class MemberRepository implements IMemberRepository{
    async getAllMembers(): Promise<MemberEntity[]> {
        try {
            const member = await prisma.member.findMany();
            console.log("Successfully loaded member entity");
            const borrowRepository = new BorrowRepository();
            console.log("Successfully loaded borrow entity");
            const borrowedBooks = await borrowRepository.getAllBorrows();
            console.log("Successfully loaded borrowed books");
            console.log(member.map((member: { id: number; code: string; name: string; isPenalized: boolean; penalty: number; }) => new MemberEntity(member.id, member.code, member.name,member.isPenalized,member.penalty, borrowedBooks)));
            return member.map((member: { id: number; code: string; name: string; isPenalized: boolean; penalty: number; }) => new MemberEntity(member.id, member.code, member.name,member.isPenalized,member.penalty, borrowedBooks.filter(borrow => borrow.memberId === member.id)));
        } catch (error: any) {
            console.log(error);
            throw new Error(`Failed to fetch members: ${error.message}`);
        }
    }
    async getById(id: number): Promise<MemberEntity> {
        const member = await prisma.member.findUnique({ where: { id } });
        if (!member) {
            throw new Error(`Member with id ${id} not found`);
        }
        const borrowRepository = new BorrowRepository();
        let borrowedBooks = await borrowRepository.getAllBorrows();
        borrowedBooks = borrowedBooks.filter(borrow => borrow.memberId === member.id);
        return new MemberEntity(member.id, member.code, member.name,member.isPenalized,member.penalty, borrowedBooks);
    }
    async update(member: MemberEntity): Promise<void> {
        await prisma.member.update({
            where: { id: member.id },
            data: {
                borrowed: {
                    connect: member.borrowedBooks.map(borrow => ({ id: borrow.id }))
                },
                isPenalized: member.isPenalized,
                penalty: member.penalty,
            },
        });
    }
}
