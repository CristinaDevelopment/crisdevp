import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractR } from 'src/common/abstract/abstract.product.repository';
import { Furniture } from '../model/furniture.model';
import { FurnitureDocument } from '../schema/furniture.schema';

@Injectable()
export class FurnitureRepository extends AbstractR<FurnitureDocument> {
  protected readonly logger = new Logger(FurnitureRepository.name);
  constructor(
    @InjectModel(Furniture.name) furnitureModel: Model<FurnitureDocument>,
  ) {
    super(furnitureModel);
  }
}
