import { MemberEntity } from "./member.entities";

export interface IMemberRepository {
    getAllMembers(): Promise<MemberEntity[]>;
    getById(id: number): Promise<MemberEntity>;
    update(member: MemberEntity): Promise<void>;
}
