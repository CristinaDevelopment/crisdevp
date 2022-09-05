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
import { Clothing } from '../model/clothing.model';
import { ClothingRepository } from '../repositories/clothing.repository';
import { ClothingDocument } from '../schema';

@Injectable()
export class ClothingService {
  constructor(private readonly clothingRepository: ClothingRepository) {}

  async createClothing(input: CreateProductInput) {
    await this.validateSlug(input);
    const data = await this.clothingRepository.createProduct(input);
    return this.toModel(data);
  }

  async updateClothing(id: GetProductArgs, input: UpdateProductInput) {
    await this.validateProduct(id);
    const data = await this.clothingRepository.findOneProductAndUpdate(
      id,
      input,
    );
    return this.toModel(data);
  }

  // async updateClothings(site: GetSiteArgs, input: UpdateClothingsInput) {
  //   const data = await this.clothingRepository.updateMany(site, input);
  //   return data;
  // }

  async removeClothing(id: GetProductArgs) {
    await this.validateProduct(id);
    await this.clothingRepository.removeProduct(id);
    return 'producto elmininado';
  }

  async removeClothings(site: GetSiteArgs) {
    await this.validateProducts(site);

    await this.clothingRepository.removeProducts(site);
    return 'productos elmininados';
  }

  async getClothing(id: GetProductArgs) {
    const clothingDocument = await this.clothingRepository.getProduct({
      ...id,
      status: true,
    });
    return this.toModel(clothingDocument);
  }
  async getClothingBySlug(slug: string, site: string) {
    const clothingDocument = await this.clothingRepository.getProduct({
      'article.slug': slug,
      site: site,
      status: true,
    });
    return this.toModel(clothingDocument);
  }

  async getClothings(site: GetSiteArgs) {
    return await this.clothingRepository.getProductsSort({
      ...site,
      status: true,
    });
  }
  async clothings() {
    return await this.clothingRepository.getProducts({});
  }

  findAllProducts(input: ListInput, site: string) {
    return this.clothingRepository.findAll({ status: true, site: site }, input);
  }
  findAllProductsByPagination(input: ListInput, site: string) {
    return this.clothingRepository.findAllPagination(
      { status: true, site: site },
      input,
    );
  }

  // async addSpecs(id: GetProductArgs, input: AddSpecsInput) {
  //   const data = await this.clothingRepository.addProductSpecs(id, input);
  //   return this.toModel(data);
  // }

  async updateImages(id: GetProductArgs, input: UpdateImagesInput[]) {
    const document = await this.clothingRepository.updateImageProduct(
      id,
      input,
    );
    return document;
  }

  async updateTags(id: GetProductArgs, input: UpdateTagsInput[]) {
    const document = await this.clothingRepository.updateTagsProduct(id, input);
    return document;
  }
  async updateSpecs(id: GetProductArgs, input: UpdateSpecsInput[]) {
    const document = await this.clothingRepository.updateSpecsProduct(
      id,
      input,
    );
    return document;
  }
  async updateDetails(id: GetProductArgs, input: UpdateDetailsInput) {
    const document = await this.clothingRepository.updateDetailsProduct(
      id,
      input,
    );
    return document;
  }

  //TODO: articleType

  // async addColors(id: GetProductArgs, input: AddColorsInput) {
  //   const document = await this.clothingRepository.addProductColors(id, input);
  //   return document;
  // }
  async updateColors(id: GetProductArgs, input: UpdateColorsInput) {
    const document = await this.clothingRepository.updateProductColors(
      {
        _id: id,
        ['articleType.colors.id']: input.id,
      },
      input,
    );
    return document;
  }

  // async addSizes(id: GetProductArgs, input: AddSizesInput) {
  //   const document = await this.clothingRepository.addProductSizes(id, input);
  //   return document;
  // }
  async updateSizes(id: GetProductArgs, input: UpdateSizesInput) {
    const document = await this.clothingRepository.updateProductSizes(
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
    const data = await this.clothingRepository.getProducts({
      _id: id._id,
      status: true,
    });
    // console.log(data)
    if (data.length === 0) {
      throw new NotFoundException(`El producto no existe`);
    }
  }

  private async validateSlug(input: CreateProductInput | UpdateProductInput) {
    const data = await this.clothingRepository.getProducts({
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
  //   const data = await this.clothingRepository.getProducts({
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
    const data = await this.clothingRepository.getProducts(site);
    if (data.length === 0) {
      throw new NotFoundException(`No existen productos. Lindo dia :D`);
    }
  }

  private toModel(clothingDocument: ClothingDocument): Clothing {
    return {
      _id: clothingDocument._id.toHexString(),
      article: clothingDocument.article,
      site: clothingDocument.site,
    };
  }
}
