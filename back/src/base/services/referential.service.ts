import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { GetAppTypesResponse } from "../../modules/app-values/app-type-dto";
import { AppType } from "../../modules/app-values/app-type.entity";
import { AppValue } from "../../modules/app-values/app-value.entity";
import { ApplicationBaseService } from "../base-service";

@Injectable()
export class ReferentialService extends ApplicationBaseService {
    constructor(
        @InjectRepository(AppValue)
        private readonly appValuesRepository: Repository<AppValue>,
        @InjectRepository(AppType)
        private readonly appTypesRepository: Repository<AppType>,
    ) {
        super();
    }

    async getAllAppTypes(conditions?: FindManyOptions<AppType>): Promise<GetAppTypesResponse> {
        const response = new GetAppTypesResponse();
        try {
            const appTypes = await this.appTypesRepository.find(conditions);
            if (appTypes) {
                response.appTypes = appTypes.map(x => x.toDto());
            }
            response.success = true;
        }
        catch (err) {
            response.handleError(err);
        }
        return response;
    }
}