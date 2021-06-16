import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BaseController } from "../base.controller";
import { ReferentialService } from "../services/referential.service";

@Controller('referential')
@ApiTags('referential')
export class ReferentialController extends BaseController {
    constructor(
        private referentialService: ReferentialService,
    ) {
        super();
    }
}