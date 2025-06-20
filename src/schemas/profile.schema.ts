import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  phone: string;

  @Prop()
  bio: string;

  @Prop()
  avatar: string;

  @Prop({ type: Object })
  address: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };

  @Prop({ type: Object })
  preferences: {
    notifications?: boolean;
    newsletter?: boolean;
    theme?: string;
    language?: string;
  };

  @Prop({ default: true })
  isPublic: boolean;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
