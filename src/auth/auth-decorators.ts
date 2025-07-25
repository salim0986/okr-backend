// src/auth/auth-decorators.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/user/user.entity';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
