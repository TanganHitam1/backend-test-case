import { MemberEntity } from "../../domain/member/member.entities";
import { MemberRepository } from "../../infrastructure/database/member.repositories";

export class MemberService {
    private memberRepository = new MemberRepository;

    async showMembers(): Promise<MemberEntity[]> {
        console.log('Loading member Entity');
        return this.memberRepository.getAllMembers();
    }
}