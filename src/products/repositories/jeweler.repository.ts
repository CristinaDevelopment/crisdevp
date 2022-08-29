import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractR } from 'src/common/abstract/abstract.product.repository';
import { Jeweler } from '../model/jeweler.model';
import { JewelerDocument } from '../schema/jeweler.schema';

@Injectable()
export class JewelerRepository extends AbstractR<JewelerDocument> {
  protected readonly logger = new Logger(JewelerRepository.name);
  constructor(@InjectModel(Jeweler.name) jewelerModel: Model<JewelerDocument>) {
    super(jewelerModel);
  }
}
