import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtSecretKey } from "../environment/constant";
import { UsersModule } from "../modules/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./guards/jwt.strategy";
import { LocalStrategy } from "./guards/local.strategy";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: JwtSecretKey,
            signOptions: {
                expiresIn: '3650d',
            },
        }),
        UsersModule
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
        JwtStrategy,
        LocalStrategy
    ],
    exports: [
        JwtModule,
        PassportModule,
        AuthService
    ]
})

export class AuthModule { }