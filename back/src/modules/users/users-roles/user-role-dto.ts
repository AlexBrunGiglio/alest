import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { GenericResponse } from "../../../base/generic-response";
import { BaseSearchResponse } from "../../../base/search-response";

export class UserRoleDto {
    @ApiPropertyOptional()
    id?: string;
    @ApiProperty()
    role: string;
    @ApiPropertyOptional()
    label?: string;
}

export class GetUserRoleResponse extends GenericResponse {
    @ApiProperty({ type: () => UserRoleDto })
    userRole: UserRoleDto;
}

export class GetUserRolesResponse extends BaseSearchResponse {
    @ApiProperty({ type: () => UserRoleDto, isArray: true })
    userRoles: UserRoleDto[] = [];
}