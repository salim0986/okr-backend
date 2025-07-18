import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateObjectiveDto {
  @IsString()
  @IsNotEmpty()
  objective: string;

  @IsUUID()
  @IsNotEmpty()
  teamId: string;
  @IsUUID()
  @IsNotEmpty()
  createdById: string;
  @IsUUID()
  @IsNotEmpty()
  departmentId: string;
}

export class UpdateObjectiveDto {
  @IsOptional()
  @IsString()
  objective?: string;

  @IsOptional()
  @IsUUID()
  teamId?: string;
}
