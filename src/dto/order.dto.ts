import { IsString, IsNotEmpty, IsArray, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { Types } from 'mongoose';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsNumber()
  totalPrice: number;
}

export class CreateOrderDto {
  @IsArray()
  items: OrderItemDto[];

  @IsNumber()
  totalAmount: number;

  @IsString()
  @IsOptional()
  shippingAddress?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;
}

export class UpdateOrderDto {
  @IsArray()
  @IsOptional()
  items?: OrderItemDto[];

  @IsNumber()
  @IsOptional()
  totalAmount?: number;

  @IsString()
  @IsOptional()
  shippingAddress?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;
}
