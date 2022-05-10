import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Company extends Document {
  @Prop()
  id: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ default: '' })
  owner: string;

  @Prop()
  users: string[];

  @Prop({ default: '' })
  email: string;

  @Prop({ default: '' })
  phone: string;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}
export const CompaniesSchema = SchemaFactory.createForClass(Company);
