import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  GetTeddyArgs,
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
import { ListTeddyResponse, Teddy } from '../model/teddy.model';
import { TeddyService } from '../services/teddy.service';
// import { GetTeddyArgs } from './dto/args/get-teddy-args.dto';
import { connectionFromArraySlice } from 'graphql-relay';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/relay-pagination/connection.args';

@Resolver(() => Teddy)
export class TeddyResolver {
  constructor(private readonly teddyService: TeddyService) {}

  @Mutation(() => Teddy, { name: 'addTeddy' })
  async createTeddy(@Args('input') input: CreateProductInput) {
    return this.teddyService.createTeddy(input);
  }

  @Mutation(() => Teddy, { name: 'updateTeddy' })
  updateTeddy(
    @Args() id: GetTeddyArgs,
    @Args('input') input: UpdateProductInput,
  ) {
    return this.teddyService.updateTeddy(id, input);
  }

  @Mutation(() => String, { name: 'removeTeddy' })
  removeTeddy(@Args() id: GetTeddyArgs) {
    return this.teddyService.removeTeddy(id);
  }

  @Mutation(() => String, { name: 'removeFurnituries' })
  removeTeddys(@Args() site: GetSiteArgs) {
    return this.teddyService.removeTeddys(site);
  }

  @Query(() => Teddy, { name: 'teddy' })
  async getTeddy(@Args() id: GetTeddyArgs) {
    return this.teddyService.getTeddy(id);
  }
  @Query(() => Teddy, { name: 'teddyBySlug' })
  async getTeddyBySlug(@Args('slug') slug: string, @Args('site') site: string,) {
    return this.teddyService.getTeddyBySlug(slug, site);
  }

  @Query(() => [Teddy], { name: 'teddys' })
  async getTeddys(@Args() site: GetSiteArgs) {
    return this.teddyService.getTeddys(site);
  }

  @Query(() => [Teddy], { name: 'allTeddys' })
  async teddys() {
    return this.teddyService.teddys();
  }

  // async findAllWithCursor(
  //   @Args('args') args: ConnectionArgs,
  //   @Args('site') site: string,
  // ): Promise<ListTeddyResponse> {
  //   const { limit, offset } = getPagingParameters(args);
  //   const { products, count } =
  //     await this.teddyService.findAllProductsByPagination(
  //       { limit, offset },
  //       site,
  //     );
  //   const page = connectionFromArraySlice(products, args, {
  //     arrayLength: count,
  //     sliceStart: offset || 0,
  //   });

  //   return { page, pageData: { count, limit, offset } };
  // }

  @Mutation(() => Teddy, { name: 'updateImagesTeddy' })
  updateImagesTeddy(
    @Args() id: GetTeddyArgs,
    @Args('input', { type: () => [UpdateImagesInput] })
    input: UpdateImagesInput[],
  ) {
    return this.teddyService.updateImages(id, input);
  }

  @Mutation(() => Teddy, { name: 'updateSpecsTeddy' })
  updateSpecsTeddy(
    @Args() id: GetTeddyArgs,
    @Args('input', { type: () => [UpdateSpecsInput] })
    input: UpdateSpecsInput[],
  ) {
    return this.teddyService.updateSpecs(id, input);
  }

  @Mutation(() => Teddy, { name: 'updateTagsTeddy' })
  updateTagsTeddy(
    @Args() id: GetTeddyArgs,
    @Args('input', { type: () => [UpdateTagsInput] })
    input: UpdateTagsInput[],
  ) {
    return this.teddyService.updateTags(id, input);
  }

  @Mutation(() => Teddy, { name: 'updateDetailsTeddy' })
  updateDetailsTeddy(
    @Args() id: GetTeddyArgs,
    @Args('input', { type: () => UpdateDetailsInput})
    input: UpdateDetailsInput,
  ) {
    return this.teddyService.updateDetails(id, input);
  }

  //TODO: articleType

  @Mutation(() => Teddy)
  updateColorsTeddy(
    @Args() id: GetTeddyArgs,
    @Args('input') input: UpdateColorsInput,
  ) {
    return this.teddyService.updateColors(id, input);
  }

  @Mutation(() => Teddy)
  updateSizesTeddy(
    @Args() id: GetTeddyArgs,
    @Args('input') input: UpdateSizesInput,
  ) {
    return this.teddyService.updateSizes(id, input);
  }
}
