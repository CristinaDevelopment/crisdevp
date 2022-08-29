import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ProductDocument } from './product.schema';

@Schema({ timestamps: true, versionKey: false })
export class ClothingDocument extends ProductDocument {

}

export const ClothingSchema = SchemaFactory.createForClass(ClothingDocument);
