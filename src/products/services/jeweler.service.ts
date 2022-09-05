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
import { Jeweler } from '../model/jeweler.model';
import { JewelerRepository } from '../repositories/jeweler.repository';
import { JewelerDocument } from '../schema';

@Injectable()
export class JewelerService {
  constructor(private readonly jewelerRepository: JewelerRepository) {}

  async createJeweler(input: CreateProductInput) {
    await this.validateSlug(input);
    const data = await this.jewelerRepository.createProduct(input);
    return this.toModel(data);
  }

  async updateJeweler(id: GetProductArgs, input: UpdateProductInput) {
    await this.validateProduct(id);
    const data = await this.jewelerRepository.findOneProductAndUpdate(id, input);
    return this.toModel(data);
  }

  // async updateJewelers(site: GetSiteArgs, input: UpdateJewelersInput) {
  //   const data = await this.jewelerRepository.updateMany(site, input);
  //   return data;
  // }

  async removeJeweler(id: GetProductArgs) {
    await this.validateProduct(id);
    await this.jewelerRepository.removeProduct(id);
    return 'producto elmininado';
  }

  async removeJewelers(site: GetSiteArgs) {
    await this.validateProducts(site);

    await this.jewelerRepository.removeProducts(site);
    return 'productos elmininados';
  }

  async getJeweler(id: GetProductArgs) {
    const jewelerDocument = await this.jewelerRepository.getProduct({
      ...id,
      status: true,
    });
    return this.toModel(jewelerDocument);
  }
  async getJewelerBySlug(slug: string, site: string) {
    const jewelerDocument = await this.jewelerRepository.getProduct({
      'article.slug': slug,
      site: site,
      status: true,
    });
    return this.toModel(jewelerDocument);
  }

  async getJewelers(site: GetSiteArgs) {
    return await this.jewelerRepository.getProductsSort({
      ...site,
      status: true,
    });
  }

  async jewelers() {
    return await this.jewelerRepository.getProducts({});
  }

  findAllProducts(input: ListInput, site: string) {
    return this.jewelerRepository.findAll({ status: true, site: site }, input);
  }
  findAllProductsByPagination(input: ListInput, site: string) {
    return this.jewelerRepository.findAllPagination(
      { status: true, site: site },
      input,
    );
  }

  // async addSpecs(id: GetProductArgs, input: AddSpecsInput) {
  //   const data = await this.jewelerRepository.addProductSpecs(id, input);
  //   return this.toModel(data);
  // }

  async updateImages(id: GetProductArgs, input: UpdateImagesInput[]) {
    const document = await this.jewelerRepository.updateImageProduct(id, input);
    return document;
  }

  async updateTags(id: GetProductArgs, input: UpdateTagsInput[]) {
    const document = await this.jewelerRepository.updateTagsProduct(id, input);
    return document;
  }
  async updateSpecs(id: GetProductArgs, input: UpdateSpecsInput[]) {
    const document = await this.jewelerRepository.updateSpecsProduct(id, input);
    return document;
  }
  async updateDetails(id: GetProductArgs, input: UpdateDetailsInput) {
    const document = await this.jewelerRepository.updateDetailsProduct(id, input);
    return document;
  }

  //TODO: articleType

  // async addColors(id: GetProductArgs, input: AddColorsInput) {
  //   const document = await this.jewelerRepository.addProductColors(id, input);
  //   return document;
  // }
  async updateColors(id: GetProductArgs, input: UpdateColorsInput) {
    const document = await this.jewelerRepository.updateProductColors(
      {
        _id: id,
        ['articleType.colors.id']: input.id,
      },
      input,
    );
    return document;
  }

  // async addSizes(id: GetProductArgs, input: AddSizesInput) {
  //   const document = await this.jewelerRepository.addProductSizes(id, input);
  //   return document;
  // }
  async updateSizes(id: GetProductArgs, input: UpdateSizesInput) {
    const document = await this.jewelerRepository.updateProductSizes(
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
    const data = await this.jewelerRepository.getProducts({
      _id: id._id,
      status: true,
    });
    // console.log(data)
    if (data.length === 0) {
      throw new NotFoundException(`El producto no existe`);
    }
  }

  private async validateSlug(input: CreateProductInput | UpdateProductInput) {
    const data = await this.jewelerRepository.getProducts({
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
  //   const data = await this.jewelerRepository.getProducts({
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
    const data = await this.jewelerRepository.getProducts(site);
    if (data.length === 0) {
      throw new NotFoundException(`No existen productos. Lindo dia :D`);
    }
  }

  private toModel(jewelerDocument: JewelerDocument): Jeweler {
    return {
      _id: jewelerDocument._id.toHexString(),
      article: jewelerDocument.article,
      site: jewelerDocument.site,
    };
  }
}
