import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Clothing, Furniture, Gift } from './model';
import {
  ClothingRepository,
  FurnitureRepository,
  GiftRepository,
} from './repositories';
import { ClothingResolver, FurnitureResolver, GiftResolver } from './resolvers';
import { ClothingSchema, FurnitureSchema, GiftSchema } from './schema';
import { ClothingService, FurnitureService, GiftService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Clothing.name, schema: ClothingSchema },
      { name: Gift.name, schema: GiftSchema },
      { name: Furniture.name, schema: FurnitureSchema },
    ]),
  ],
  providers: [
    ClothingRepository,
    ClothingService,
    ClothingResolver,
    GiftRepository,
    GiftService,
    GiftResolver,
    FurnitureRepository,
    FurnitureService,
    FurnitureResolver,
  ],
})
export class ProductsModule {}
