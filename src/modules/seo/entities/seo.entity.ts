import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Seo extends Document {
  @Prop()
  id: string;

  @Prop()
  url: string;

  @Prop({ default: '' })
  company: string;

  @Prop({ default: '60f1c181f1f14715c6ee549b' })
  projectId: string;

  @Prop({ default: '' })
  domain: string;

  @Prop()
  key: string;

  @Prop()
  value: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  changedAt: Date;
}

export const SeoSchema = SchemaFactory.createForClass(Seo);
