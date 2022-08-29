import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { RelayTypes } from 'src/common/relay-pagination/relay.types';
import { Product, SizesProduct, ColorProduct } from './product.model';

@ObjectType()
export class Jeweler extends Product {
}
@ObjectType()
export class ListJewelerResponse extends RelayTypes<Jeweler>(Jeweler) {}
