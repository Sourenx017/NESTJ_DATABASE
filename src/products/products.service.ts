import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find({ isActive: true }).exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findByCategory(category: string): Promise<Product[]> {
    return this.productModel.find({ category, isActive: true }).exec();
  }

  async search(query: string): Promise<Product[]> {
    return this.productModel.find({
      $and: [
        { isActive: true },
        {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
            { brand: { $regex: query, $options: 'i' } },
          ]
        }
      ]
    }).exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      { ...updateProductDto, updatedAt: new Date() },
      { new: true }
    ).exec();

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async remove(id: string): Promise<void> {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      { isActive: false, updatedAt: new Date() },
      { new: true }
    );

    if (!product) {
      throw new NotFoundException('Product not found');
    }
  }
}
