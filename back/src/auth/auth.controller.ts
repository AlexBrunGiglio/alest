import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BaseController } from "../base/base.controller";
import { GenericResponse } from "../base/generic-response";
import { LoginViewModel, RegisterRequest } from "./auth-request";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller('auth')
@ApiTags('auth')
export class AuthController extends BaseController {
    constructor(
        private authService: AuthService,
    ) {
        super();
    }

    @Post('login')
    @ApiOperation({ summary: 'Login user', operationId: 'login' })
    @ApiResponse({ status: 200, description: 'Login response', type: GenericResponse })
    @HttpCode(200)
    async login(@Body() loginViewModel: LoginViewModel): Promise<GenericResponse> {
        const response = await this.authService.login(loginViewModel);
        return response;
    }

    @Post('register')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'register', operationId: 'register' })
    @ApiResponse({ status: 200, description: 'Generic Response', type: GenericResponse })
    @HttpCode(200)
    @ApiBearerAuth()
    async register(@Body() request: RegisterRequest): Promise<GenericResponse> {
        return await this.authService.register(request);
    }
}
