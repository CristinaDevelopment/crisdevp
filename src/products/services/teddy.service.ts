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
import { Teddy } from '../model/teddy.model';
import { TeddyRepository } from '../repositories/teddy.repository';
import { TeddyDocument } from '../schema';

@Injectable()
export class TeddyService {
  constructor(private readonly teddyRepository: TeddyRepository) {}

  async createTeddy(input: CreateProductInput) {
    await this.validateSlug(input);
    const data = await this.teddyRepository.createProduct(input);
    return this.toModel(data);
  }

  async updateTeddy(id: GetProductArgs, input: UpdateProductInput) {
    await this.validateProduct(id);
    const data = await this.teddyRepository.findOneProductAndUpdate(id, input);
    return this.toModel(data);
  }

  // async updateTeddys(site: GetSiteArgs, input: UpdateTeddysInput) {
  //   const data = await this.teddyRepository.updateMany(site, input);
  //   return data;
  // }

  async removeTeddy(id: GetProductArgs) {
    await this.validateProduct(id);
    await this.teddyRepository.removeProduct(id);
    return 'producto elmininado';
  }

  async removeTeddys(site: GetSiteArgs) {
    await this.validateProducts(site);

    await this.teddyRepository.removeProducts(site);
    return 'productos elmininados';
  }

  async getTeddy(id: GetProductArgs) {
    const teddyDocument = await this.teddyRepository.getProduct({
      ...id,
      status: true,
    });
    return this.toModel(teddyDocument);
  }
  async getTeddyBySlug(slug: string) {
    const teddyDocument = await this.teddyRepository.getProduct({
      'article.slug': slug,
      status: true,
    });
    return this.toModel(teddyDocument);
  }

  async getTeddys(site: GetSiteArgs) {
    return await this.teddyRepository.getProductsSort({
      ...site,
      status: true,
    });
  }

  findAllProducts(input: ListInput, site: string) {
    return this.teddyRepository.findAll({ status: true, site: site }, input);
  }
  findAllProductsByPagination(input: ListInput, site: string) {
    return this.teddyRepository.findAllPagination(
      { status: true, site: site },
      input,
    );
  }

  // async addSpecs(id: GetProductArgs, input: AddSpecsInput) {
  //   const data = await this.teddyRepository.addProductSpecs(id, input);
  //   return this.toModel(data);
  // }

  async updateImages(id: GetProductArgs, input: UpdateImagesInput[]) {
    const document = await this.teddyRepository.updateImageProduct(id, input);
    return document;
  }

  async updateTags(id: GetProductArgs, input: UpdateTagsInput[]) {
    const document = await this.teddyRepository.updateTagsProduct(id, input);
    return document;
  }
  async updateSpecs(id: GetProductArgs, input: UpdateSpecsInput[]) {
    const document = await this.teddyRepository.updateSpecsProduct(id, input);
    return document;
  }
  async updateDetails(id: GetProductArgs, input: UpdateDetailsInput) {
    const document = await this.teddyRepository.updateDetailsProduct(id, input);
    return document;
  }

  //TODO: articleType

  // async addColors(id: GetProductArgs, input: AddColorsInput) {
  //   const document = await this.teddyRepository.addProductColors(id, input);
  //   return document;
  // }
  async updateColors(id: GetProductArgs, input: UpdateColorsInput) {
    const document = await this.teddyRepository.updateProductColors(
      {
        _id: id,
        ['articleType.colors.id']: input.id,
      },
      input,
    );
    return document;
  }

  // async addSizes(id: GetProductArgs, input: AddSizesInput) {
  //   const document = await this.teddyRepository.addProductSizes(id, input);
  //   return document;
  // }
  async updateSizes(id: GetProductArgs, input: UpdateSizesInput) {
    const document = await this.teddyRepository.updateProductSizes(
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
    const data = await this.teddyRepository.getProducts({
      _id: id._id,
      status: true,
    });
    // console.log(data)
    if (data.length === 0) {
      throw new NotFoundException(`El producto no existe`);
    }
  }

  private async validateSlug(input: CreateProductInput | UpdateProductInput) {
    const data = await this.teddyRepository.getProducts({
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
  //   const data = await this.teddyRepository.getProducts({
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
    const data = await this.teddyRepository.getProducts(site);
    if (data.length === 0) {
      throw new NotFoundException(`No existen productos. Lindo dia :D`);
    }
  }

  private toModel(teddyDocument: TeddyDocument): Teddy {
    return {
      _id: teddyDocument._id.toHexString(),
      article: teddyDocument.article,
      site: teddyDocument.site,
    };
  }
}
