import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApplicationBaseModelService } from "../../base/base-model.service";
import { MainHelpers } from "../../base/main-helper";
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

    async createOrUpdate(user: UserDto): Promise<GetUserResponse> {
        const response = new GetUserResponse();
        try {
            let userEntity = await this.repository.findOne({ id: user.id });
            if (!userEntity) {
                userEntity = new User();
            }
            if (user.password)
                userEntity.password = await MainHelpers.hashPassword(user.password);

            userEntity = await this.repository.save(userEntity);
            const getUserResponse = await this.findOne({ where: { id: userEntity.id } });
            if (getUserResponse.success && getUserResponse.user)
                response.user = getUserResponse.user;
        } catch (err) {
            response.handleError(err);
        }
        return response;
    }
}