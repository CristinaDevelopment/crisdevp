import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateProductInput, UpdateProductsInput } from './product.input';

@InputType()
export class CreateFurnitureInput extends CreateProductInput {
}
@InputType()
export class UpdateFurnitureInput extends PartialType(CreateFurnitureInput) {
  @Field({ nullable: true })
  status: boolean;
}
@InputType()
export class UpdateFurnituresInput extends PartialType(UpdateProductsInput) {
}
