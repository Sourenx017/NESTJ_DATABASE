import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ default: 0 })
  stock: number;

  @Prop([String])
  images: string[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  model?: string;

  @Prop()
  color?: string;

  @Prop()
  material?: string;

  @Prop()
  size?: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  reviewCount: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
