import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { RelayTypes } from 'src/common/relay-pagination/relay.types';
import { Product, SizesProduct, ColorProduct } from './product.model';

@ObjectType()
export class Clothing extends Product {
}
@ObjectType()
export class ListClothingResponse extends RelayTypes<Clothing>(Clothing) {}
