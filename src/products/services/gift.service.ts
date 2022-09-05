import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { uuidv3, uuidv4 } from 'src/utils';
import { capitalizar, slug } from 'src/utils/function';
import {
  GetProductArgs,
  GetRouteArgs,
  GetSiteArgs,
} from '../dto/args/product-args.dto';
import {
  CreateProductInput,
  UpdateProductInput,
  UpdateSpecsInput,
  UpdateTagsInput,
  UpdateColorsInput,
  UpdateSizesInput,
  UpdateImagesInput,
  UpdateDetailsInput,
} from '../dto/input';
import { ListInput } from '../dto/list.dto';
import { Gift } from '../model/gift.model';
import { GiftRepository } from '../repositories/gift.repository';
import { GiftDocument } from '../schema';

@Injectable()
export class GiftService {
  constructor(private readonly giftRepository: GiftRepository) {}

  async createGift(input: CreateProductInput) {
    await this.validateSlug(input);
    const data = await this.giftRepository.createProduct(input);
    return this.toModel(data);
  }

  async updateGift(id: GetProductArgs, input: UpdateProductInput) {
    await this.validateProduct(id);
    const data = await this.giftRepository.findOneProductAndUpdate(id, input);
    return this.toModel(data);
  }

  // async updateGifts(site: GetSiteArgs, input: UpdateGiftsInput) {
  //   const data = await this.giftRepository.updateMany(site, input);
  //   return data;
  // }

  async removeGift(id: GetProductArgs) {
    await this.validateProduct(id);
    await this.giftRepository.removeProduct(id);
    return 'producto elmininado';
  }

  async removeGifts(site: GetSiteArgs) {
    await this.validateProducts(site);

    await this.giftRepository.removeProducts(site);
    return 'productos elmininados';
  }

  async getGift(id: GetProductArgs) {
    const giftDocument = await this.giftRepository.getProduct({
      ...id,
      status: true,
    });
    return this.toModel(giftDocument);
  }
  async getGiftBySlug(slug: string, site: string) {
    const giftDocument = await this.giftRepository.getProduct({
      'article.slug': slug,
      site: site,
      status: true,
    });
    return this.toModel(giftDocument);
  }

  async getGifts(site: GetSiteArgs) {
    return await this.giftRepository.getProductsSort({
      ...site,
      status: true,
    });
  }

  async gifts() {
    return await this.giftRepository.getProducts({});
  }

  findAllProducts(input: ListInput, site: string) {
    return this.giftRepository.findAll({ status: true, site: site }, input);
  }
  findAllProductsByPagination(input: ListInput, site: string) {
    return this.giftRepository.findAllPagination(
      { status: true, site: site },
      input,
    );
  }

  // async addSpecs(id: GetProductArgs, input: AddSpecsInput) {
  //   const data = await this.giftRepository.addProductSpecs(id, input);
  //   return this.toModel(data);
  // }

  async updateImages(id: GetProductArgs, input: UpdateImagesInput[]) {
    const document = await this.giftRepository.updateImageProduct(id, input);
    return document;
  }

  async updateTags(id: GetProductArgs, input: UpdateTagsInput[]) {
    const document = await this.giftRepository.updateTagsProduct(id, input);
    return document;
  }
  async updateSpecs(id: GetProductArgs, input: UpdateSpecsInput[]) {
    const document = await this.giftRepository.updateSpecsProduct(id, input);
    return document;
  }
  async updateDetails(id: GetProductArgs, input: UpdateDetailsInput) {
    const document = await this.giftRepository.updateDetailsProduct(id, input);
    return document;
  }

  //TODO: articleType

  // async addColors(id: GetProductArgs, input: AddColorsInput) {
  //   const document = await this.giftRepository.addProductColors(id, input);
  //   return document;
  // }
  async updateColors(id: GetProductArgs, input: UpdateColorsInput) {
    const document = await this.giftRepository.updateProductColors(
      {
        _id: id,
        ['articleType.colors.id']: input.id,
      },
      input,
    );
    return document;
  }

  // async addSizes(id: GetProductArgs, input: AddSizesInput) {
  //   const document = await this.giftRepository.addProductSizes(id, input);
  //   return document;
  // }
  async updateSizes(id: GetProductArgs, input: UpdateSizesInput) {
    const document = await this.giftRepository.updateProductSizes(
      {
        _id: id,
        ['articleType.sizes.id']: input.id,
      },
      input,
    );
    return document;
  }

  //TODO: articleType

  private async validateProduct(id: GetProductArgs) {
    const data = await this.giftRepository.getProducts({
      _id: id._id,
      status: true,
    });
    // console.log(data)
    if (data.length === 0) {
      throw new NotFoundException(`El producto no existe`);
    }
  }

  private async validateSlug(input: CreateProductInput | UpdateProductInput) {
    const data = await this.giftRepository.getProducts({
      'article.slug': slug(input.name),
      status: true,
      site: input.site,
    });
    // console.log(slug(input.name))
    if (data.length !== 0) {
      throw new NotFoundException(
        `Ya tienes un producto con ese nombre registrado, por favor elige otro. Gracias :D`,
      );
    }
  }
  // private async validateSlugUpdate(input: UpdateProductInput) {
  //   const data = await this.giftRepository.getProducts({
  //     'article.slug': slug(input.name),
  //     status: true,
  //     site: input.site,
  //   });
  //   const dat = data.filter((d) => d.article.slug !== slug(input.name));
  //   console.log(data);
  //   console.log(dat);
  //   if (dat.length !== 0) {
  //     throw new NotFoundException(
  //       `Ya tienes un producto con ese nombre registrado, por favor elige otro. Gracias :D`,
  //     );
  //   }
  // }

  private async validateProducts(site: GetSiteArgs) {
    const data = await this.giftRepository.getProducts(site);
    if (data.length === 0) {
      throw new NotFoundException(`No existen productos. Lindo dia :D`);
    }
  }

  private toModel(giftDocument: GiftDocument): Gift {
    return {
      _id: giftDocument._id.toHexString(),
      article: giftDocument.article,
      site: giftDocument.site,
    };
  }
}
