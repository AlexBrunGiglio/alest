import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserDto } from './user-dto';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;
    @CreateDateColumn({ name: 'creationDate', nullable: false, type: 'datetime' })
    creationDate: Date;
    @UpdateDateColumn({ name: 'modifDate', nullable: false, type: 'datetime' })
    modifDate: Date;
    @Column('varchar', { name: 'username', length: 30, unique: true })
    username: string;
    @Column('varchar', { name: 'firstName', length: 250, nullable: true })
    firstname: string;
    @Column('varchar', { name: 'lastName', length: 250, nullable: true })
    lastname: string;
    @Column('varchar', { name: 'password', length: 70, nullable: true })
    password: string;
    @Column('varchar', { name: 'mail', length: 255, nullable: true, unique: true })
    mail?: string;
    @Column('varchar', { name: 'phone', length: 50, nullable: true })
    phone?: string;
    @Column('text', { name: 'presentation', nullable: true })
    presentation?: string;

    public toDto(): UserDto {
        return {
            id: this.id,
            creationDate: this.creationDate,
            modifDate: this.modifDate,
            firstname: this.firstname,
            lastname: this.lastname,
            username: this.username,
            mail: this.mail,
            password: this.password,
            phone: this.phone,
            presentation: this.presentation,
        }
    }

    public fromDto(dto: UserDto) {
        this.id = dto.id;
        this.firstname = dto.firstname;
        this.lastname = dto.lastname;
        this.username = dto.username;
        this.mail = dto.mail;
        this.password = dto.password;
        this.phone = dto.phone;
        this.presentation = dto.presentation;

        if (!this.id)
            this.id = undefined;
    }
}
