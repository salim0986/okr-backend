// src/team/team.dto.ts

import { IsNotEmpty, IsUUID, IsString, IsOptional } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  departmentId: string;
  @IsNotEmpty()
  @IsUUID()
  organizationId: string;
}

export class UpdateTeamDto {
  @IsOptional()
  @IsString()
  name?: string;
}
