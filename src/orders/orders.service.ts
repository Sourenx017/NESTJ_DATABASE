import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';
import { CreateOrderDto, UpdateOrderDto, OrderStatus } from '../dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel({
      ...createOrderDto,
      userId: new Types.ObjectId(userId),
      status: createOrderDto.status || OrderStatus.PENDING,
    });
    return createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find()
      .populate('userId', 'email username')
      .populate('items.productId', 'name price')
      .exec();
  }

  async findByUserId(userId: string): Promise<Order[]> {
    return this.orderModel.find({ userId: new Types.ObjectId(userId) })
      .populate('items.productId', 'name price')
      .exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id)
      .populate('userId', 'email username')
      .populate('items.productId', 'name price')
      .exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .populate('userId', 'email username')
      .populate('items.productId', 'name price')
      .exec();
    
    if (!updatedOrder) {
      throw new NotFoundException('Order not found');
    }
    
    return updatedOrder;
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .populate('userId', 'email username')
      .populate('items.productId', 'name price')
      .exec();
    
    if (!updatedOrder) {
      throw new NotFoundException('Order not found');
    }
    
    return updatedOrder;
  }

  async remove(id: string): Promise<void> {
    const result = await this.orderModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Order not found');
    }
  }

  async getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
    return this.orderModel.find({ status })
      .populate('userId', 'email username')
      .populate('items.productId', 'name price')
      .exec();
  }

  async getUserOrderStats(userId: string): Promise<any> {
    const orders = await this.orderModel.find({ userId: new Types.ObjectId(userId) });
    
    const stats = {
      totalOrders: orders.length,
      totalAmount: orders.reduce((sum, order) => sum + order.totalAmount, 0),
      statusBreakdown: orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {}),
    };

    return stats;
  }
}
