import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateProductInput, UpdateProductsInput } from './product.input';

@InputType()
export class CreateJewelerInput extends CreateProductInput {
}
@InputType()
export class UpdateJewelerInput extends PartialType(CreateJewelerInput) {
  @Field({ nullable: true })
  status: boolean;
}
@InputType()
export class UpdateJewelersInput extends PartialType(UpdateProductsInput) {
}
