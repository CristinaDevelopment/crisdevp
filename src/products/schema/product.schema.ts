import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';
import { Article } from '../model/product.model';

@Schema({ timestamps: true, versionKey: false })
export class ProductDocument extends AbstractDocument {
  @Prop({ type: Article })
  article: Article;

  @Prop({ trim: true })
  site: string;

  @Prop({ default: true })
  status: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(ProductDocument);
