import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Clothing, Furniture, Gift, Jeweler, Teddy } from './model';
import {
  ClothingRepository,
  FurnitureRepository,
  GiftRepository,
  JewelerRepository,
  TeddyRepository,
} from './repositories';
import {
  ClothingResolver,
  FurnitureResolver,
  GiftResolver,
  JewelerResolver,
  TeddyResolver,
} from './resolvers';
import {
  ClothingSchema,
  FurnitureSchema,
  GiftSchema,
  JewelerSchema,
  TeddySchema,
} from './schema';
import {
  ClothingService,
  FurnitureService,
  GiftService,
  JewelerService,
  TeddyService,
} from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Clothing.name, schema: ClothingSchema },
      { name: Gift.name, schema: GiftSchema },
      { name: Furniture.name, schema: FurnitureSchema },
      { name: Jeweler.name, schema: JewelerSchema },
      { name: Teddy.name, schema: TeddySchema },
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
    JewelerRepository,
    JewelerService,
    JewelerResolver,
    TeddyRepository,
    TeddyService,
    TeddyResolver,
  ],
})
export class ProductsModule {}
