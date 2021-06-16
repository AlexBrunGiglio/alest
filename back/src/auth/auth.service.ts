import { Injectable } from "@nestjs/common";
import { AppErrorWithMessage } from "../base/app-error";
import { UsersService } from "../modules/users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
    ) {

    }

    async validateUser(username: string, pass: string): Promise<any> {
        const userResponse = await this.userService.findOne({ where: { username: username } });
        if (!userResponse.success)
            throw new AppErrorWithMessage('Unable to find this user');
        else {
            if (userResponse.user?.password === pass) {
                const { password, ...result } = userResponse.user;
                return result
            }
            return null;
        }
    }
}