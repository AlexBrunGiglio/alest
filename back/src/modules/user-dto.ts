import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { GenericResponse } from "../base/generic-response";
import { BaseSearchResponse } from "../base/search-response";

export class UserDto {
    @ApiPropertyOptional()
    id?: string;
    @ApiProperty()
    username: string;
    @ApiPropertyOptional()
    lastname: string;
    @ApiPropertyOptional()
    firstname: string;
    @ApiPropertyOptional()
    password?: string;
    @ApiPropertyOptional()
    mail?: string;
    @ApiPropertyOptional()
    phone?: string;
    @ApiPropertyOptional()
    presentation?: string;
    @ApiPropertyOptional({ type: String, format: 'date-time' })
    public creationDate?: Date;
    @ApiPropertyOptional({ type: String, format: 'date-time' })
    public modifDate?: Date;
}

export class GetUserResponse extends GenericResponse {
    @ApiProperty({ type: () => UserDto })
    user: UserDto;
}

export class GetUsersResponse extends BaseSearchResponse {
    @ApiProperty({ type: () => UserDto, isArray: true })
    users: UserDto[] = [];
}