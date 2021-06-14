import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApplicationBaseModelService } from "../base/base-model.service";
import { GetUserResponse, GetUsersResponse, UserDto } from "./user-dto";
import { User } from "./user.entity";

@Injectable()
export class UsersService extends ApplicationBaseModelService<User, UserDto, GetUserResponse, GetUsersResponse> {
    constructor(
        @InjectRepository(User)
        public readonly repository: Repository<User>,
    ) {
        super();
        this.modelOptions = {
            getManyResponse: GetUsersResponse,
            getOneResponse: GetUserResponse,
            getManyResponseField: 'users',
            getOneResponseField: 'user',
            repository: this.repository,
            entity: User
        };
    }
}