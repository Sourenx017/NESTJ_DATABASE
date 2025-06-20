import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto, OrderStatus } from '../dto/order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(req.user.sub, createOrderDto);
  }

  @Get()
  findAll(@Query('status') status?: OrderStatus) {
    if (status) {
      return this.ordersService.getOrdersByStatus(status);
    }
    return this.ordersService.findAll();
  }

  @Get('my-orders')
  getMyOrders(@Request() req) {
    return this.ordersService.findByUserId(req.user.sub);
  }

  @Get('my-stats')
  getMyOrderStats(@Request() req) {
    return this.ordersService.getUserOrderStats(req.user.sub);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.ordersService.findByUserId(userId);
  }

  @Get('user/:userId/stats')
  getUserOrderStats(@Param('userId') userId: string) {
    return this.ordersService.getUserOrderStats(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: OrderStatus) {
    return this.ordersService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
