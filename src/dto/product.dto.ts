import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  material?: string;

  @IsString()
  @IsOptional()
  size?: string;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  material?: string;

  @IsString()
  @IsOptional()
  size?: string;

  @IsNumber()
  @IsOptional()
  rating?: number;

  @IsNumber()
  @IsOptional()
  reviewCount?: number;
}
