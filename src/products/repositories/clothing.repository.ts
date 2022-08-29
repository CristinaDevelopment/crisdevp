import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractR } from 'src/common/abstract/abstract.product.repository';
import { Clothing } from '../model/clothing.model';
import { ClothingDocument } from '../schema/clothing.schema';

@Injectable()
export class ClothingRepository extends AbstractR<ClothingDocument> {
  protected readonly logger = new Logger(ClothingRepository.name);
  constructor(
    @InjectModel(Clothing.name) clothingModel: Model<ClothingDocument>,
  ) {
    super(clothingModel);
  }
}
