import { Injectable } from "@nestjs/common";
import { AppTypes, Gender, PresenceStatut, RolesList } from "../../shared/shared-constant";
import { ReferentialService } from "./base/services/referential.service";
import { UserRoleDto } from "./modules/users-roles/user-role-dto";
import { UserRoleService } from "./modules/users-roles/user-roles.service";
import { UserDto } from "./modules/users/user-dto";
import { UsersService } from "./modules/users/users.service";

@Injectable()
export class DatabaseService {
    constructor(
        private userService: UsersService,
        private userRoleService: UserRoleService,
        private referentialService: ReferentialService,
    ) {

    }

    public async seedDB() {
        console.log('\x1b[34m', "[Nest] DBService => Seed database");
        await this.createDefaultTypes();
        await this.createDefaultRoles();
        await this.createDefaultUsers();
    }

    private async createDefaultUsers() {
        await this.createUser('admin', 'admin', 'admin@local.com', [RolesList.Admin]);
    }

    private async createDefaultRoles() {
        for (const cRole of Object.values(RolesList)) {
            const roleResponse = await this.userRoleService.findOne({ where: { role: cRole } });
            if (!roleResponse.userRole) {
                const newRole = new UserRoleDto();
                newRole.role = cRole;
                newRole.label = newRole.role;
                await this.userRoleService.createOrUpdate(newRole);
            }
        }
    }

    private async createDefaultTypes() {
        const typesWithValues: { typeCode: string, typeLabel: string, values: { label: string; order: number, code?: string }[] }[] =
            [
                {
                    typeCode: AppTypes.Gender,
                    typeLabel: 'Sexe',
                    values: [
                        { label: 'Homme', order: 1, code: Gender.Male },
                        { label: 'Femme', order: 2, code: Gender.Female },
                    ],
                },
                {
                    typeCode: AppTypes.PresenceStatut,
                    typeLabel: 'Status en ligne',
                    values: [
                        { label: 'En ligne', order: 1, code: PresenceStatut.Online },
                        { label: 'Hors ligne', order: 2, code: PresenceStatut.Offline },
                        { label: 'Absent', order: 3, code: PresenceStatut.Missing },
                        { label: 'Occupé', order: 4, code: PresenceStatut.Busy },
                    ],
                },
            ];
        for (const typeWithValues of typesWithValues) {
            await this.referentialService.createOrUpdateTypeWithValues(typeWithValues.typeCode, typeWithValues.typeLabel, typeWithValues.values, true);
        }
    }

    private async createUser(username: string, password: string, email: string, roles?: string[]) {
        try {
            const getUserResponse = await this.userService.findOne({ where: { username: username } });
            if (getUserResponse.success && !getUserResponse.user) {
                const adminUser = new UserDto();
                adminUser.username = username;
                adminUser.password = password;
                adminUser.mail = email;

                const userRoles: UserRoleDto[] = [];
                if (roles) {
                    roles.forEach(role => {
                        userRoles.push({ role: role, label: role, disabled: false });
                    });
                }
                adminUser.roles = userRoles;
                const createUserResponse = await this.userService.createOrUpdate(adminUser);
                if (createUserResponse.success)
                    console.log('\x1b[34m', `L'utilisateur ${username} a été créé !`);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
}