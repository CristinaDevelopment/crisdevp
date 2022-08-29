import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateProductInput, UpdateProductsInput } from './product.input';

@InputType()
export class CreateClothingInput extends CreateProductInput {
}
@InputType()
export class UpdateClothingInput extends PartialType(CreateClothingInput) {
  @Field({ nullable: true })
  status: boolean;
}
@InputType()
export class UpdateClothingsInput extends PartialType(UpdateProductsInput) {
}
