import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ProductDocument } from './product.schema';

@Schema({ timestamps: true, versionKey: false })
export class JewelerDocument extends ProductDocument {

}

export const JewelerSchema = SchemaFactory.createForClass(JewelerDocument);
