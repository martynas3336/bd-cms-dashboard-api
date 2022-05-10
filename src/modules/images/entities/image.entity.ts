import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Image extends Document {
  @Prop()
  id: string;

  @Prop({ default: 'active' })
  status: string;

  @Prop({})
  url: string;

  @Prop({})
  fileName: string;

  @Prop({})
  awsFileName: string;

  @Prop({ default: '' })
  bucket: string;

  @Prop({})
  mimetype: string;

  @Prop({ default: '' })
  size: string;

  @Prop({ required: true })
  projectId: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}
export const ImageSchema = SchemaFactory.createForClass(Image);
