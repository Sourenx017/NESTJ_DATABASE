import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from '../schemas/role.schema';
import { CreateRoleDto, UpdateRoleDto } from '../dto/role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const existingRole = await this.roleModel.findOne({ name: createRoleDto.name });
    if (existingRole) {
      throw new ConflictException('Role with this name already exists');
    }

    const createdRole = new this.roleModel(createRoleDto);
    return createdRole.save();
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.find({ isActive: true }).exec();
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleModel.findById(id).exec();
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async findByName(name: string): Promise<Role> {
    const role = await this.roleModel.findOne({ name }).exec();
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    if (updateRoleDto.name) {
      const existingRole = await this.roleModel.findOne({ 
        name: updateRoleDto.name, 
        _id: { $ne: id } 
      });
      if (existingRole) {
        throw new ConflictException('Role with this name already exists');
      }
    }

    const updatedRole = await this.roleModel
      .findByIdAndUpdate(id, updateRoleDto, { new: true })
      .exec();
    
    if (!updatedRole) {
      throw new NotFoundException('Role not found');
    }
    
    return updatedRole;
  }

  async remove(id: string): Promise<void> {
    const result = await this.roleModel.findByIdAndUpdate(
      id, 
      { isActive: false }, 
      { new: true }
    ).exec();
    
    if (!result) {
      throw new NotFoundException('Role not found');
    }
  }

  async hardDelete(id: string): Promise<void> {
    const result = await this.roleModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Role not found');
    }
  }
}
