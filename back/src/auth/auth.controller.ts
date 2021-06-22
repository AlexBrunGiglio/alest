import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BaseController } from "../base/base.controller";

@Controller('auth')
@ApiTags('auth')
export class AuthController extends BaseController {

}
