import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { RelayTypes } from 'src/common/relay-pagination/relay.types';
import { Product, SizesProduct, ColorProduct } from './product.model';

@ObjectType()
export class Teddy extends Product {
}
@ObjectType()
export class ListTeddyResponse extends RelayTypes<Teddy>(Teddy) {}
