import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateProductInput, UpdateProductsInput } from './product.input';

@InputType()
export class CreateGiftInput extends CreateProductInput {
}
@InputType()
export class UpdateGiftInput extends PartialType(CreateGiftInput) {
  @Field({ nullable: true })
  status: boolean;
}
@InputType()
export class UpdateGiftsInput extends PartialType(UpdateProductsInput) {
}
