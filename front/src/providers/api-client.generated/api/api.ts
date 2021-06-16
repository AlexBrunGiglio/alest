export * from './default.service';
import { DefaultService } from './default.service';
export * from './referential.service';
import { ReferentialService } from './referential.service';
export * from './users.service';
import { UsersService } from './users.service';
export const APIS = [DefaultService, ReferentialService, UsersService];
