import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractR } from 'src/common/abstract/abstract.product.repository';
import { Teddy } from '../model/teddy.model';
import { TeddyDocument } from '../schema/teddy.schema';

@Injectable()
export class TeddyRepository extends AbstractR<TeddyDocument> {
  protected readonly logger = new Logger(TeddyRepository.name);
  constructor(@InjectModel(Teddy.name) teddyModel: Model<TeddyDocument>) {
    super(teddyModel);
  }
}
