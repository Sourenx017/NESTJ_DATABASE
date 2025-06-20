import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Profile, ProfileDocument } from '../schemas/profile.schema';
import { CreateProfileDto, UpdateProfileDto } from '../dto/profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async create(userId: string, createProfileDto: CreateProfileDto): Promise<Profile> {
    const existingProfile = await this.profileModel.findOne({ userId: new Types.ObjectId(userId) });
    if (existingProfile) {
      throw new ConflictException('Profile already exists for this user');
    }

    const createdProfile = new this.profileModel({
      ...createProfileDto,
      userId: new Types.ObjectId(userId),
    });
    return createdProfile.save();
  }

  async findAll(): Promise<Profile[]> {
    return this.profileModel.find({ isPublic: true })
      .populate('userId', 'email username')
      .exec();
  }

  async findOne(id: string): Promise<Profile> {
    const profile = await this.profileModel.findById(id)
      .populate('userId', 'email username')
      .exec();
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  async findByUserId(userId: string): Promise<Profile> {
    const profile = await this.profileModel.findOne({ userId: new Types.ObjectId(userId) })
      .populate('userId', 'email username')
      .exec();
    if (!profile) {
      throw new NotFoundException('Profile not found for this user');
    }
    return profile;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    const updatedProfile = await this.profileModel
      .findByIdAndUpdate(id, updateProfileDto, { new: true })
      .populate('userId', 'email username')
      .exec();
    
    if (!updatedProfile) {
      throw new NotFoundException('Profile not found');
    }
    
    return updatedProfile;
  }

  async updateByUserId(userId: string, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    const updatedProfile = await this.profileModel
      .findOneAndUpdate(
        { userId: new Types.ObjectId(userId) },
        updateProfileDto,
        { new: true }
      )
      .populate('userId', 'email username')
      .exec();
    
    if (!updatedProfile) {
      throw new NotFoundException('Profile not found for this user');
    }
    
    return updatedProfile;
  }

  async remove(id: string): Promise<void> {
    const result = await this.profileModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Profile not found');
    }
  }

  async removeByUserId(userId: string): Promise<void> {
    const result = await this.profileModel
      .findOneAndDelete({ userId: new Types.ObjectId(userId) })
      .exec();
    if (!result) {
      throw new NotFoundException('Profile not found for this user');
    }
  }
}
