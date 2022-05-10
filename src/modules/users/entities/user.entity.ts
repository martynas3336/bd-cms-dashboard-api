import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserStatusEnum } from '../../../enums/userStatus.enum';

@Schema()
export class User extends Document {
  @Prop()
  id: string;

  @Prop({
    type: String,
    enum: UserStatusEnum,
    default: UserStatusEnum.inactive,
  })
  status: string;

  @Prop()
  email: string;

  @Prop()
  secretWordHash: string;

  @Prop()
  temporaryToken: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  lastLoginAt: Date;

  @Prop({ default: 'admin' })
  role: string;

  @Prop({ default: 'Unknown' })
  name: string;

  @Prop({ default: '' })
  company: string;

  @Prop({
    default:
      'https://www.pngitem.com/pimgs/m/294-2947257_interface-icons-user-avatar-profile-user-avatar-png.png',
  })
  avatar: string;

  @Prop({ default: '', description: '' })
  companyName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
