import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { RelayTypes } from 'src/common/relay-pagination/relay.types';
import { Product, SizesProduct, ColorProduct } from './product.model';

@ObjectType()
export class Furniture extends Product {
}
@ObjectType()
export class ListFurnitureResponse extends RelayTypes<Furniture>(Furniture) {}
