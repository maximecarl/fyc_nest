import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from './roles.enum';

export const Roles = (...roles: RolesEnum[]) => SetMetadata('roles', roles);