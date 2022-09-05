import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  GetJewelerArgs,
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
import { ListJewelerResponse, Jeweler } from '../model/jeweler.model';
import { JewelerService } from '../services/jeweler.service';
// import { GetJewelerArgs } from './dto/args/get-jeweler-args.dto';
import { connectionFromArraySlice } from 'graphql-relay';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/relay-pagination/connection.args';

@Resolver(() => Jeweler)
export class JewelerResolver {
  constructor(private readonly jewelerService: JewelerService) {}

  @Mutation(() => Jeweler, { name: 'addJeweler' })
  async createJeweler(@Args('input') input: CreateProductInput) {
    return this.jewelerService.createJeweler(input);
  }

  @Mutation(() => Jeweler, { name: 'updateJeweler' })
  updateJeweler(
    @Args() id: GetJewelerArgs,
    @Args('input') input: UpdateProductInput,
  ) {
    return this.jewelerService.updateJeweler(id, input);
  }

  @Mutation(() => String, { name: 'removeJeweler' })
  removeJeweler(@Args() id: GetJewelerArgs) {
    return this.jewelerService.removeJeweler(id);
  }

  @Mutation(() => String, { name: 'removeFurnituries' })
  removeJewelers(@Args() site: GetSiteArgs) {
    return this.jewelerService.removeJewelers(site);
  }

  @Query(() => Jeweler, { name: 'jeweler' })
  async getJeweler(@Args() id: GetJewelerArgs) {
    return this.jewelerService.getJeweler(id);
  }
  @Query(() => Jeweler, { name: 'jewelerBySlug' })
  async getJewelerBySlug(@Args('slug') slug: string, @Args('site') site: string,) {
    return this.jewelerService.getJewelerBySlug(slug, site);
  }

  @Query(() => [Jeweler], { name: 'jewelers' })
  async getJewelers(@Args() site: GetSiteArgs) {
    return this.jewelerService.getJewelers(site);
  }

  @Query(() => [Jeweler], { name: 'allJewelers' })
  async jewelers() {
    return this.jewelerService.jewelers();
  }
  // async findAllWithCursor(
  //   @Args('args') args: ConnectionArgs,
  //   @Args('site') site: string,
  // ): Promise<ListJewelerResponse> {
  //   const { limit, offset } = getPagingParameters(args);
  //   const { products, count } =
  //     await this.jewelerService.findAllProductsByPagination(
  //       { limit, offset },
  //       site,
  //     );
  //   const page = connectionFromArraySlice(products, args, {
  //     arrayLength: count,
  //     sliceStart: offset || 0,
  //   });

  //   return { page, pageData: { count, limit, offset } };
  // }

  @Mutation(() => Jeweler, { name: 'updateImagesJeweler' })
  updateImagesJeweler(
    @Args() id: GetJewelerArgs,
    @Args('input', { type: () => [UpdateImagesInput] })
    input: UpdateImagesInput[],
  ) {
    return this.jewelerService.updateImages(id, input);
  }

  @Mutation(() => Jeweler, { name: 'updateSpecsJeweler' })
  updateSpecsJeweler(
    @Args() id: GetJewelerArgs,
    @Args('input', { type: () => [UpdateSpecsInput] })
    input: UpdateSpecsInput[],
  ) {
    return this.jewelerService.updateSpecs(id, input);
  }

  @Mutation(() => Jeweler, { name: 'updateTagsJeweler' })
  updateTagsJeweler(
    @Args() id: GetJewelerArgs,
    @Args('input', { type: () => [UpdateTagsInput] })
    input: UpdateTagsInput[],
  ) {
    return this.jewelerService.updateTags(id, input);
  }

  @Mutation(() => Jeweler, { name: 'updateDetailsJeweler' })
  updateDetailsJeweler(
    @Args() id: GetJewelerArgs,
    @Args('input', { type: () => UpdateDetailsInput})
    input: UpdateDetailsInput,
  ) {
    return this.jewelerService.updateDetails(id, input);
  }

  //TODO: articleType

  @Mutation(() => Jeweler)
  updateColorsJeweler(
    @Args() id: GetJewelerArgs,
    @Args('input') input: UpdateColorsInput,
  ) {
    return this.jewelerService.updateColors(id, input);
  }

  @Mutation(() => Jeweler)
  updateSizesJeweler(
    @Args() id: GetJewelerArgs,
    @Args('input') input: UpdateSizesInput,
  ) {
    return this.jewelerService.updateSizes(id, input);
  }
}
