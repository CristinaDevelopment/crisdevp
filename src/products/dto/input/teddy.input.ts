import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateProductInput, UpdateProductsInput } from './product.input';

@InputType()
export class CreateTeddyInput extends CreateProductInput {
}
@InputType()
export class UpdateTeddyInput extends PartialType(CreateTeddyInput) {
  @Field({ nullable: true })
  status: boolean;
}
@InputType()
export class UpdateTeddysInput extends PartialType(UpdateProductsInput) {
}
