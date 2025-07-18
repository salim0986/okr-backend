import {
  IsUUID,
  IsNumber,
  IsString,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class CreateProgressUpdateDto {
  @IsUUID()
  keyResultId: string;
  @IsUUID()
  updatedById: string;

  @IsUUID()
  userId: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  progress: number;

  @IsOptional()
  @IsString()
  note?: string;
}

export class UpdateProgressUpdateDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  progress?: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
