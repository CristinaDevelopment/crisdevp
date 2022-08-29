import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractR } from 'src/common/abstract/abstract.product.repository';
import { Gift } from '../model/gift.model';
import { GiftDocument } from '../schema/gift.schema';

@Injectable()
export class GiftRepository extends AbstractR<GiftDocument> {
  protected readonly logger = new Logger(GiftRepository.name);
  constructor(@InjectModel(Gift.name) giftModel: Model<GiftDocument>) {
    super(giftModel);
  }
}
