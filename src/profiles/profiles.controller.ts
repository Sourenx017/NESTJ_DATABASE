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
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto, UpdateProfileDto } from '../dto/profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('profiles')
@UseGuards(JwtAuthGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(@Request() req, @Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(req.user.sub, createProfileDto);
  }

  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get('me')
  getMyProfile(@Request() req) {
    return this.profilesService.findByUserId(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.profilesService.findByUserId(userId);
  }

  @Patch('me')
  updateMyProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.updateByUserId(req.user.sub, updateProfileDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(id, updateProfileDto);
  }

  @Delete('me')
  removeMyProfile(@Request() req) {
    return this.profilesService.removeByUserId(req.user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.remove(id);
  }
}
