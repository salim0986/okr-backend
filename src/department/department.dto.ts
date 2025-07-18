// src/department/department.dto.ts

import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  organizationId: string;
}

export class UpdateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
