import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user.entity";
import { UserRoleDto } from "./user-role-dto";

@Entity({ name: 'roles' })
export class UserRole {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;
    @Column('varchar', { name: 'role', length: 30, unique: true })
    role: string;
    @Column('varchar', { name: 'label', length: 150, nullable: true })
    label?: string;
    @ManyToMany(() => User, (user) => user.roles)
    @JoinTable({ name: 'user_roles' })
    users?: User[];

    public toDto(): UserRoleDto {
        return {
            id: this.id,
            role: this.role,
            label: this.label,
        };
    }

    public fromDto(dto: UserRoleDto) {
        this.role = dto.role;
        this.id = dto.id;
        this.label = dto.label;

        if (!this.id)
            this.id = undefined;
    }
}
