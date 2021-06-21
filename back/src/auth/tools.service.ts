import { Injectable, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../../shared/jwt-payload'
import { ApplicationBaseService } from '../base/base-service';
import { UserDto } from '../modules/users/user-dto';

export type JwtDecodeError = 'TokenExpiredError' | 'JsonWebTokenError' | 'NoTokenError' | 'NoRequestData';
export interface DecodeTokenResponse {
    payload?: JwtPayload; error?: JwtDecodeError;
}
@Injectable({ scope: Scope.REQUEST })
export class AuthToolsService extends ApplicationBaseService {
    public static createUserToken(jwtService: JwtService, user: UserDto) {
        if (!user)
            return null;
        let roles: string[] = [];
        if (user.roles)
            roles = user.roles.map(x => x.role);
        const payload: JwtPayload = {
            id: user.id,
            username: user.username,
            roles: roles,
            mail: user.mail,
            firstname: user.firstname,
            lastname: user.lastname,
        };
        return jwtService.sign(payload, { expiresIn: '5h' });
    }
}