import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ProductDocument } from './product.schema';

@Schema({ timestamps: true, versionKey: false })
export class TeddyDocument extends ProductDocument {

}

export const TeddySchema = SchemaFactory.createForClass(TeddyDocument);
