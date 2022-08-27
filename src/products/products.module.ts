import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Furniture } from './model';
import { FurnitureRepository } from './repositories';
import { FurnitureResolver } from './resolvers';
import { FurnitureSchema } from './schema';
import { FurnitureService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      // { name: Wear.name, schema: WearSchema },
      // { name: Gift.name, schema: GiftSchema },
      { name: Furniture.name, schema: FurnitureSchema },
    ]),
  ],
  providers: [
    // WearRepository,
    // WearService,
    // WearResolver,
    // GiftRepository,
    // GiftService,
    // GiftResolver,
    FurnitureRepository,
    FurnitureService,
    FurnitureResolver,
  ],
})
export class ProductsModule {}
