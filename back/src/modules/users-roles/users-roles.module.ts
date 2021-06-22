import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRole } from "./user-role.entity";
import { UsersRolesController } from "./user-roles.controller";
import { UserRoleService } from "./user-roles.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserRole
        ]),
    ],
    controllers: [
        UsersRolesController,
    ],
    providers: [
        UserRoleService,
    ],
    exports: [
        UserRoleService,
    ],
})

export class UserRoleModule { }