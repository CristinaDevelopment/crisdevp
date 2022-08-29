import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ProductDocument } from './product.schema';

@Schema({ timestamps: true, versionKey: false })
export class GiftDocument extends ProductDocument {

}

export const GiftSchema = SchemaFactory.createForClass(GiftDocument);
