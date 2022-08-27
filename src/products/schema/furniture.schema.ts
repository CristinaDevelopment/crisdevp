import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ProductDocument } from './product.schema';

@Schema({ timestamps: true, versionKey: false })
export class FurnitureDocument extends ProductDocument {

}

export const FurnitureSchema = SchemaFactory.createForClass(FurnitureDocument);
