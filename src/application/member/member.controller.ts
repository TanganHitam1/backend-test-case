import { Request, Response } from "express";
import { MemberService } from "./member.service";

const memberService = new MemberService();

export class MemberController {
    async showMembers(req: Request, res: Response): Promise<void> {
        try {
            console.log('Loading member service in controller');
            const members = await memberService.showMembers();
            res.status(200).json(members);
        } catch (error: any) {
            console.log('failed show members')
            res.status(400).json({ message: error.message });
        }
    }
}