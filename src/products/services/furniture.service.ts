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
import { Furniture } from '../model/furniture.model';
import { FurnitureRepository } from '../repositories/furniture.repository';
import { FurnitureDocument } from '../schema';

@Injectable()
export class FurnitureService {
  constructor(private readonly furnitureRepository: FurnitureRepository) {}

  async createFurniture(input: CreateProductInput) {
    await this.validateSlug(input);
    const data = await this.furnitureRepository.createProduct(input);
    return this.toModel(data);
  }

  async updateFurniture(id: GetProductArgs, input: UpdateProductInput) {
    await this.validateProduct(id);
    const data = await this.furnitureRepository.findOneProductAndUpdate(
      id,
      input,
    );
    return this.toModel(data);
  }

  // async updateFurnitures(site: GetSiteArgs, input: UpdateFurnituresInput) {
  //   const data = await this.furnitureRepository.updateMany(site, input);
  //   return data;
  // }

  async removeFurniture(id: GetProductArgs) {
    await this.validateProduct(id);
    await this.furnitureRepository.removeProduct(id);
    return 'producto elmininado';
  }

  async removeFurnitures(site: GetSiteArgs) {
    await this.validateProducts(site);

    await this.furnitureRepository.removeProducts(site);
    return 'productos elmininados';
  }

  async getFurniture(id: GetProductArgs) {
    const furnitureDocument = await this.furnitureRepository.getProduct({
      ...id,
      status: true,
    });
    return this.toModel(furnitureDocument);
  }

  async getFurnitures(site: GetSiteArgs) {
    return await this.furnitureRepository.getProductsSort({
      ...site,
      status: true,
    });
  }

  findAllProducts(input: ListInput, site: string) {
    return this.furnitureRepository.findAll(
      { status: true, site: site },
      input,
    );
  }
  findAllProductsByPagination(input: ListInput, site: string) {
    return this.furnitureRepository.findAllPagination(
      { status: true, site: site },
      input,
    );
  }

  // async addSpecs(id: GetProductArgs, input: AddSpecsInput) {
  //   const data = await this.furnitureRepository.addProductSpecs(id, input);
  //   return this.toModel(data);
  // }

  async updateImages(id: GetProductArgs, input: UpdateImagesInput[]) {
    const document = await this.furnitureRepository.updateImageProduct(
      id,
      input,
    );
    return document;
  }

  async updateTags(id: GetProductArgs, input: UpdateTagsInput[]) {
    const document = await this.furnitureRepository.updateTagsProduct(
      id,
      input,
    );
    return document;
  }
  async updateSpecs(id: GetProductArgs, input: UpdateSpecsInput[]) {
    const document = await this.furnitureRepository.updateSpecsProduct(
      id,
      input,
    );
    return document;
  }
  async updateDetails(id: GetProductArgs, input: UpdateDetailsInput) {
    const document = await this.furnitureRepository.updateDetailsProduct(
      id,
      input,
    );
    return document;
  }

  //TODO: articleType

  // async addColors(id: GetProductArgs, input: AddColorsInput) {
  //   const document = await this.furnitureRepository.addProductColors(id, input);
  //   return document;
  // }
  async updateColors(id: GetProductArgs, input: UpdateColorsInput) {
    const document = await this.furnitureRepository.updateProductColors(
      {
        _id: id,
        ['articleType.colors.id']: input.id,
      },
      input,
    );
    return document;
  }

  // async addSizes(id: GetProductArgs, input: AddSizesInput) {
  //   const document = await this.furnitureRepository.addProductSizes(id, input);
  //   return document;
  // }
  async updateSizes(id: GetProductArgs, input: UpdateSizesInput) {
    const document = await this.furnitureRepository.updateProductSizes(
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
    const data = await this.furnitureRepository.getProducts({
      _id: id._id,
      status: true,
    });
    // console.log(data)
    if (data.length === 0) {
      throw new NotFoundException(`El producto no existe`);
    }
  }

  private async validateSlug(input: CreateProductInput | UpdateProductInput) {
    const data = await this.furnitureRepository.getProducts({
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
  //   const data = await this.furnitureRepository.getProducts({
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
    const data = await this.furnitureRepository.getProducts(site);
    if (data.length === 0) {
      throw new NotFoundException(`No existen productos. Lindo dia :D`);
    }
  }

  private toModel(furnitureDocument: FurnitureDocument): Furniture {
    return {
      _id: furnitureDocument._id.toHexString(),
      article: furnitureDocument.article,
      site: furnitureDocument.site,
    };
  }
}
