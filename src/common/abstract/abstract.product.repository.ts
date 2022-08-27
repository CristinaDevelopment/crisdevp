import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import {
  CreateProductInput,
  UpdateProductInput,
  UpdateSpecsInput,
  UpdateColorsInput,
  UpdateSizesInput,
} from 'src/products/dto';
import { slug } from 'src/utils/function';
import { AbstractDocument } from './abstract.schema';
import { capitalizar } from '../../utils/function';
import { uuidv3 } from 'src/utils';
import { ListInput } from 'src/products/dto/list.dto';
import {
  UpdateTagsInput,
  UpdateImagesInput,
  UpdateDetailsInput,
} from '../../products/dto/input/product.input';

export abstract class AbstractR<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async createProduct(document: CreateProductInput): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
      article: {
        name: capitalizar(document.name),
        slug: slug(document.name),
        mark: document.mark,
        inStock: document.inStock,
        price: document.price,
        discountPrice: document.discountPrice,
        description: document.description,
        featured: {
          name: capitalizar(document.featured),
          href: slug(document.featured),
        },
        route: document.route,
        seo: {
          name: capitalizar(document.name),
          href: slug(document.name),
          description: document.description,
          image: {
            src: 'https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg',
            alt: 'image description',
          },
        },
      },
      status: true,
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOneProductAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    document: UpdateProductInput,
  ) {
    const updateDocument = await this.model.findOneAndUpdate(
      filterQuery,
      {
        $set: {
          'article.name': capitalizar(document.name),
          'article.slug': slug(document.name),
          'article.mark': document.mark,
          'article.inStock': document.inStock,
          'article.price': document.price,
          'article.discountPrice': document.discountPrice,
          'article.description': document.description,
          'article.featured': {
            name: capitalizar(document.featured),
            href: slug(document.featured),
          },
          'article.route': document.route,
          'article.seo.name': capitalizar(document.name),
          'article.seo.href': slug(document.name),
          'article.seo.description': document.description,
        },
      },
      {
        lean: true,
        new: true,
      },
    );
    if (!updateDocument) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found :(');
    }
    return updateDocument;
  }

  // async updateMany(
  //   filterQuery: FilterQuery<TDocument>,
  //   update: UpdateQuery<TDocument>,
  // ) {
  //   const document = await this.model.updateMany(
  //     { site: filterQuery.site },
  //     { $set: update },
  //   );
  //   return document;
  // }

  async getProduct(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found :(');
    }

    return document;
  }

  async getProducts(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true }).exec();
  }

  async getProductsSort(filterQuery: FilterQuery<TDocument>) {
    return this.model
      .find(filterQuery, {}, { lean: true })
      .sort({ updatedAt: -1 })
      .exec();
  }

  // async filterProducts(filterQuery: FilterQuery<TDocument>) {
  //   return this.model.aggregate([
  //     {
  //       $project: {
  //         article: {
  //           $filter: {
  //             input: 'article',
  //             as: 'title',
  //             cond: { 'article.title': filterQuery },
  //           },
  //         },
  //       },
  //     },
  //   ]);
  // }

  async removeProduct(filterQuery: FilterQuery<TDocument>) {
    return this.model.deleteOne(filterQuery);
  }
  async removeProducts(filterQuery: FilterQuery<TDocument>) {
    return this.model.deleteMany(filterQuery);
  }

  async updateImageProduct(
    filterQuery: FilterQuery<TDocument>,
    document: UpdateImagesInput[],
  ) {
    const data = await this.model.findOneAndUpdate(
      filterQuery,
      {
        $set: {
          'article.image': document.map((data) => ({
            uid: uuidv3(),
            src: data.src,
            alt: data.alt,
          })),
          'article.seo.image.src': document[0].src,
          'article.seo.image.alt': document[0].alt,
        },
      },
      {
        lean: true,
        new: true,
      },
    );
    if (!data) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found :(');
    }
    return data;
  }

  async updateTagsProduct(
    filterQuery: FilterQuery<TDocument>,
    document: UpdateTagsInput[],
  ) {
    const data = await this.model.findOneAndUpdate(
      filterQuery,
      {
        $set: {
          'article.tags': document.map((data) => ({
            uid: uuidv3(),
            text: data.text,
          })),
        },
      },
      {
        lean: true,
        new: true,
      },
    );
    if (!data) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found :(');
    }
    return data;
  }

  async updateSpecsProduct(
    filterQuery: FilterQuery<TDocument>,
    document: UpdateTagsInput[],
  ) {
    const data = await this.model.findOneAndUpdate(
      filterQuery,
      {
        $set: {
          'article.specs': document.map((data) => ({
            uid: uuidv3(),
            text: data.text,
          })),
        },
      },
      {
        lean: true,
        new: true,
      },
    );
    if (!data) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found :(');
    }
    return data;
  }

  async updateDetailsProduct(
    filterQuery: FilterQuery<TDocument>,
    document: UpdateDetailsInput,
  ) {
    const data = await this.model.findOneAndUpdate(
      filterQuery,
      {
        $set: {
          'article.details': {
            material: document.material,
            color: document.color,
            finishing: document.finishing,
            logo: document.logo,
            accessories: document.accessories,
            dimensions: document.dimensions,
          },
        },
      },
      {
        lean: true,
        new: true,
      },
    );
    if (!data) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found :(');
    }
    return data;
  }

  //TODO:---DEFAULT PROPERTY---TODO:
  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });
    if (!document) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }
  async updateMany(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model.updateMany(
      { site: filterQuery.site },
      { $set: update },
    );
    return document;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async findAll(filterQuery: FilterQuery<TDocument>, input: ListInput) {
    const { limit, offset } = input;
    return this.model
      .find(filterQuery, {}, { lean: true })
      .sort({ updatedAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async findAllPagination(filterQuery: FilterQuery<TDocument>, input: any) {
    const { limit, offset } = input;
    const count = await this.model
      .find(filterQuery, {}, { lean: true })
      .count();
    const products = await this.model
      .find(filterQuery, {}, { lean: true })
      .sort({ updatedAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();
    return { products, count };
  }

  async deleteOne(filterQuery: FilterQuery<TDocument>) {
    return this.model.deleteMany(filterQuery);
  }
  async deleteMany(filterQuery: FilterQuery<TDocument>) {
    return this.model.deleteMany(filterQuery);
  }

  //TODO:---COLORS---TODO:
  // async addProductColors(
  //   filterQuery: FilterQuery<TDocument>,
  //   document: AddColorsInput,
  // ) {
  //   const data = await this.model.findOneAndUpdate(
  //     filterQuery,
  //     {
  //       $addToSet: {
  //         'articleType.colors': {
  //           id: uuidv3(),
  //           name: document.name,
  //           class: document.class,
  //           selectedClass: document.selectedClass,
  //         },
  //       },
  //     },
  //     {
  //       lean: true,
  //       new: true,
  //     },
  //   );
  //   if (!data) {
  //     this.logger.warn(`Document not found with filterQuery:`, filterQuery);
  //     throw new NotFoundException('Document not found :(');
  //   }
  //   return data;
  // }

  async updateProductColors(
    filterQuery: FilterQuery<TDocument>,
    document: UpdateColorsInput,
  ) {
    const data = await this.model.findOneAndUpdate(
      filterQuery,
      {
        $set: {
          'articleType.colors.$.name': document.name,
          'articleType.colors.$.class': document.class,
          'articleType.colors.$.selectedClass': document.selectedClass,
        },
      },
      {
        lean: true,
        new: true,
      },
    );
    if (!data) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found :(');
    }
    return data;
  }

  //TODO:---SIZES---TODO:
  // async addProductSizes(
  //   filterQuery: FilterQuery<TDocument>,
  //   document: AddSizesInput,
  // ) {
  //   const data = await this.model.findOneAndUpdate(
  //     filterQuery,
  //     {
  //       $addToSet: {
  //         'articleType.sizes': {
  //           id: uuidv3(),
  //           name: document.name,
  //           inStock: document.inStock,
  //         },
  //       },
  //     },
  //     {
  //       lean: true,
  //       new: true,
  //     },
  //   );
  //   if (!data) {
  //     this.logger.warn(`Document not found with filterQuery:`, filterQuery);
  //     throw new NotFoundException('Document not found :(');
  //   }
  //   return data;
  // }

  async updateProductSizes(
    filterQuery: FilterQuery<TDocument>,
    document: UpdateSizesInput,
  ) {
    const data = await this.model.findOneAndUpdate(
      filterQuery,
      {
        $set: {
          'articleType.sizes.$.name': document.name,
          'articleType.sizes.$.inStock': document.inStock,
        },
      },
      {
        lean: true,
        new: true,
      },
    );
    if (!data) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found :(');
    }
    return data;
  }

  //TODO:---NEW PROPERTY---TODO:
}
