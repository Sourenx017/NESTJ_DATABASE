import { IsString, IsOptional, IsBoolean, IsDateString, IsObject } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsObject()
  @IsOptional()
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };

  @IsObject()
  @IsOptional()
  preferences?: {
    notifications?: boolean;
    newsletter?: boolean;
    theme?: string;
    language?: string;
  };

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsObject()
  @IsOptional()
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };

  @IsObject()
  @IsOptional()
  preferences?: {
    notifications?: boolean;
    newsletter?: boolean;
    theme?: string;
    language?: string;
  };

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}
