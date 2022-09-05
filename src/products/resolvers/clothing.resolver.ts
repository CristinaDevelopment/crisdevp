import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  GetClothingArgs,
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
import { ListClothingResponse, Clothing } from '../model/clothing.model';
import { ClothingService } from '../services/clothing.service';
// import { GetClothingArgs } from './dto/args/get-clothing-args.dto';
import { connectionFromArraySlice } from 'graphql-relay';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/relay-pagination/connection.args';

@Resolver(() => Clothing)
export class ClothingResolver {
  constructor(private readonly clothingService: ClothingService) {}

  @Mutation(() => Clothing, { name: 'addClothing' })
  async createClothing(@Args('input') input: CreateProductInput) {
    return this.clothingService.createClothing(input);
  }

  @Mutation(() => Clothing, { name: 'updateClothing' })
  updateClothing(
    @Args() id: GetClothingArgs,
    @Args('input') input: UpdateProductInput,
  ) {
    return this.clothingService.updateClothing(id, input);
  }

  @Mutation(() => String, { name: 'removeClothing' })
  removeClothing(@Args() id: GetClothingArgs) {
    return this.clothingService.removeClothing(id);
  }

  @Mutation(() => String, { name: 'removeFurnituries' })
  removeClothings(@Args() site: GetSiteArgs) {
    return this.clothingService.removeClothings(site);
  }

  @Query(() => Clothing, { name: 'clothing' })
  async getClothing(@Args() id: GetClothingArgs) {
    return this.clothingService.getClothing(id);
  }

  @Query(() => Clothing, { name: 'clothingBySlug' })
  async getClothingBySlug(
    @Args('slug') slug: string,
    @Args('site') site: string,
  ) {
    return this.clothingService.getClothingBySlug(slug, site);
  }

  @Query(() => [Clothing], { name: 'clothings' })
  async getClothings(@Args() site: GetSiteArgs) {
    return this.clothingService.getClothings(site);
  }
  @Query(() => [Clothing], { name: 'allClothings' })
  async clothings() {
    return this.clothingService.clothings();
  }

  // async findAllWithCursor(
  //   @Args('args') args: ConnectionArgs,
  //   @Args('site') site: string,
  // ): Promise<ListClothingResponse> {
  //   const { limit, offset } = getPagingParameters(args);
  //   const { products, count } =
  //     await this.clothingService.findAllProductsByPagination(
  //       { limit, offset },
  //       site,
  //     );
  //   const page = connectionFromArraySlice(products, args, {
  //     arrayLength: count,
  //     sliceStart: offset || 0,
  //   });

  //   return { page, pageData: { count, limit, offset } };
  // }

  @Mutation(() => Clothing, { name: 'updateImagesClothing' })
  updateImagesClothing(
    @Args() id: GetClothingArgs,
    @Args('input', { type: () => [UpdateImagesInput] })
    input: UpdateImagesInput[],
  ) {
    return this.clothingService.updateImages(id, input);
  }

  @Mutation(() => Clothing, { name: 'updateSpecsClothing' })
  updateSpecsClothing(
    @Args() id: GetClothingArgs,
    @Args('input', { type: () => [UpdateSpecsInput] })
    input: UpdateSpecsInput[],
  ) {
    return this.clothingService.updateSpecs(id, input);
  }

  @Mutation(() => Clothing, { name: 'updateTagsClothing' })
  updateTagsClothing(
    @Args() id: GetClothingArgs,
    @Args('input', { type: () => [UpdateTagsInput] })
    input: UpdateTagsInput[],
  ) {
    return this.clothingService.updateTags(id, input);
  }

  @Mutation(() => Clothing, { name: 'updateDetailsClothing' })
  updateDetailsClothing(
    @Args() id: GetClothingArgs,
    @Args('input', { type: () => UpdateDetailsInput })
    input: UpdateDetailsInput,
  ) {
    return this.clothingService.updateDetails(id, input);
  }

  //TODO: articleType

  @Mutation(() => Clothing)
  updateColorsClothing(
    @Args() id: GetClothingArgs,
    @Args('input') input: UpdateColorsInput,
  ) {
    return this.clothingService.updateColors(id, input);
  }

  @Mutation(() => Clothing)
  updateSizesClothing(
    @Args() id: GetClothingArgs,
    @Args('input') input: UpdateSizesInput,
  ) {
    return this.clothingService.updateSizes(id, input);
  }
}
