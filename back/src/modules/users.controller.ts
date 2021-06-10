import { Controller, Get, HttpCode, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesList } from '../../../shared/shared-constant';
import { BaseController } from '../base/base.controller';
import { Roles } from '../base/services/roles.decorator';
import { GetUsersResponse } from './user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController extends BaseController {
    constructor(
        private readonly usersService: UsersService,
    ) {
        super();
    }
    @UseGuards()
    @Roles(RolesList.Admin)
    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all users', operationId: 'getAllUsers' })
    @ApiResponse({ status: 200, description: 'Get all users', type: GetUsersResponse })
    @HttpCode(200)
    async getAll(): Promise<GetUsersResponse> {
        return await this.usersService.findAll();
    }
}