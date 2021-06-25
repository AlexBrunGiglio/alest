import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../base/base.controller';
import { Roles } from '../../base/services/roles.decorator';
import { GetUserResponse, GetUsersResponse, UserDto } from './user-dto';
import { UsersService } from './users.service';
import { RolesList } from '../../../../shared/shared-constant'
import { AppErrorWithMessage } from '../../base/app-error';
import { GenericResponse } from '../../base/generic-response';
import { RolesGuard } from '../../auth/guards/roles.guard';
@ApiTags('users')
@Controller('users')
export class UsersController extends BaseController {
    constructor(
        private readonly usersService: UsersService,
    ) {
        super();
    }
    @UseGuards(RolesGuard)
    @Roles(RolesList.Admin)
    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all users', operationId: 'getAllUsers' })
    @ApiResponse({ status: 200, description: 'Get all users', type: GetUsersResponse })
    @HttpCode(200)
    async getAll(): Promise<GetUsersResponse> {
        return await this.usersService.findAll();
    }

    @UseGuards(RolesGuard)
    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user', operationId: 'getUser' })
    @ApiResponse({ status: 200, description: 'Get user', type: GetUserResponse })
    @HttpCode(200)
    async get(@Param('id') id: string): Promise<GetUserResponse> {
        return await this.usersService.findOne({ where: { id: id } });
    }

    @UseGuards(RolesGuard)
    @Roles(RolesList.Admin)
    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create or update user', operationId: 'createOrUpdateUser' })
    @ApiResponse({ status: 200, description: 'Create or update user', type: GetUserResponse })
    @HttpCode(200)
    async createOrUpdate(@Body() candidateResumeDto: UserDto): Promise<GetUserResponse> {
        if (!candidateResumeDto)
            throw new AppErrorWithMessage('Invalid Request');
        return await this.usersService.createOrUpdate(candidateResumeDto);
    }

    @UseGuards(RolesGuard)
    @Roles(RolesList.Admin)
    @Delete()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete users', operationId: 'deleteUsers' })
    @ApiResponse({ status: 200, description: 'Delete users from ID', type: GenericResponse })
    @HttpCode(200)
    async deleteUsers(@Query('userIds') userIds: string): Promise<GenericResponse> {
        return await this.usersService.delete(userIds.split(','));
    }
}