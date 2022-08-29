import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  GetFurnitureArgs,
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
} from '../dto/input/product.input';
import { ListInput } from '../dto/list.dto';
import { ListFurnitureResponse, Furniture } from '../model/furniture.model';
import { FurnitureService } from '../services/furniture.service';
// import { GetFurnitureArgs } from './dto/args/get-furniture-args.dto';
import { connectionFromArraySlice } from 'graphql-relay';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/relay-pagination/connection.args';

@Resolver(() => Furniture)
export class FurnitureResolver {
  constructor(private readonly furnitureService: FurnitureService) {}

  @Mutation(() => Furniture, { name: 'addFurniture' })
  async createFurniture(@Args('input') input: CreateProductInput) {
    return this.furnitureService.createFurniture(input);
  }

  @Mutation(() => Furniture, { name: 'updateFurniture' })
  updateFurniture(
    @Args() id: GetFurnitureArgs,
    @Args('input') input: UpdateProductInput,
  ) {
    return this.furnitureService.updateFurniture(id, input);
  }

  @Mutation(() => String, { name: 'removeFurniture' })
  removeFurniture(@Args() id: GetFurnitureArgs) {
    return this.furnitureService.removeFurniture(id);
  }

  @Mutation(() => String, { name: 'removeFurnituries' })
  removeFurnitures(@Args() site: GetSiteArgs) {
    return this.furnitureService.removeFurnitures(site);
  }

  @Query(() => Furniture, { name: 'furniture' })
  async getFurniture(@Args() id: GetFurnitureArgs) {
    return this.furnitureService.getFurniture(id);
  }
  @Query(() => Furniture, { name: 'furnitureBySlug' })
  async getFurnitureBySlug(@Args('slug') slug: string) {
    return this.furnitureService.getFurnitureBySlug(slug);
  }

  @Query(() => [Furniture], { name: 'furnitures' })
  async getFurnitures(@Args() site: GetSiteArgs) {
    return this.furnitureService.getFurnitures(site);
  }

  // async findAllWithCursor(
  //   @Args('args') args: ConnectionArgs,
  //   @Args('site') site: string,
  // ): Promise<ListFurnitureResponse> {
  //   const { limit, offset } = getPagingParameters(args);
  //   const { products, count } =
  //     await this.furnitureService.findAllProductsByPagination(
  //       { limit, offset },
  //       site,
  //     );
  //   const page = connectionFromArraySlice(products, args, {
  //     arrayLength: count,
  //     sliceStart: offset || 0,
  //   });

  //   return { page, pageData: { count, limit, offset } };
  // }

  @Mutation(() => Furniture, { name: 'updateImagesFurniture' })
  updateImagesFurniture(
    @Args() id: GetFurnitureArgs,
    @Args('input', { type: () => [UpdateImagesInput] })
    input: UpdateImagesInput[],
  ) {
    return this.furnitureService.updateImages(id, input);
  }

  @Mutation(() => Furniture, { name: 'updateSpecsFurniture' })
  updateSpecsFurniture(
    @Args() id: GetFurnitureArgs,
    @Args('input', { type: () => [UpdateSpecsInput] })
    input: UpdateSpecsInput[],
  ) {
    return this.furnitureService.updateSpecs(id, input);
  }

  @Mutation(() => Furniture, { name: 'updateTagsFurniture' })
  updateTagsFurniture(
    @Args() id: GetFurnitureArgs,
    @Args('input', { type: () => [UpdateTagsInput] })
    input: UpdateTagsInput[],
  ) {
    return this.furnitureService.updateTags(id, input);
  }

  @Mutation(() => Furniture, { name: 'updateDetailsFurniture' })
  updateDetailsFurniture(
    @Args() id: GetFurnitureArgs,
    @Args('input', { type: () => UpdateDetailsInput})
    input: UpdateDetailsInput,
  ) {
    return this.furnitureService.updateDetails(id, input);
  }

  //TODO: articleType

  @Mutation(() => Furniture)
  updateColorsFurniture(
    @Args() id: GetFurnitureArgs,
    @Args('input') input: UpdateColorsInput,
  ) {
    return this.furnitureService.updateColors(id, input);
  }

  @Mutation(() => Furniture)
  updateSizesFurniture(
    @Args() id: GetFurnitureArgs,
    @Args('input') input: UpdateSizesInput,
  ) {
    return this.furnitureService.updateSizes(id, input);
  }
}
