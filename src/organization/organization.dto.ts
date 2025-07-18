// create-organization.dto.ts
import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateOrganizationDto {
  @IsString()
  name: string;
}

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {}
