import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class OrderItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  totalPrice: number;
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop([OrderItem])
  items: OrderItem[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: 'pending' })
  status: string; // 'pending', 'processing', 'shipped', 'delivered', 'cancelled'

  @Prop({ required: true })
  shippingAddress: string;

  @Prop()
  trackingNumber?: string;

  @Prop({ default: 'credit_card' })
  paymentMethod: string;

  @Prop({ default: 'pending' })
  paymentStatus: string; // 'pending', 'paid', 'failed', 'refunded'

  @Prop()
  notes?: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
