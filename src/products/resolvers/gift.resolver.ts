import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  GetGiftArgs,
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
import { ListGiftResponse, Gift } from '../model/gift.model';
import { GiftService } from '../services/gift.service';
// import { GetGiftArgs } from './dto/args/get-gift-args.dto';
import { connectionFromArraySlice } from 'graphql-relay';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/relay-pagination/connection.args';

@Resolver(() => Gift)
export class GiftResolver {
  constructor(private readonly giftService: GiftService) {}

  @Mutation(() => Gift, { name: 'addGift' })
  async createGift(@Args('input') input: CreateProductInput) {
    return this.giftService.createGift(input);
  }

  @Mutation(() => Gift, { name: 'updateGift' })
  updateGift(
    @Args() id: GetGiftArgs,
    @Args('input') input: UpdateProductInput,
  ) {
    return this.giftService.updateGift(id, input);
  }

  @Mutation(() => String, { name: 'removeGift' })
  removeGift(@Args() id: GetGiftArgs) {
    return this.giftService.removeGift(id);
  }

  @Mutation(() => String, { name: 'removeFurnituries' })
  removeGifts(@Args() site: GetSiteArgs) {
    return this.giftService.removeGifts(site);
  }

  @Query(() => Gift, { name: 'gift' })
  async getGift(@Args() id: GetGiftArgs) {
    return this.giftService.getGift(id);
  }
  @Query(() => Gift, { name: 'giftBySlug' })
  async getGiftBySlug(@Args('slug') slug: string, @Args('site') site: string,) {
    return this.giftService.getGiftBySlug(slug, site);
  }

  @Query(() => [Gift], { name: 'gifts' })
  async getGifts(@Args() site: GetSiteArgs) {
    return this.giftService.getGifts(site);
  }
  @Query(() => [Gift], { name: 'allGifts' })
  async gifts() {
    return this.giftService.gifts();
  }
  // async findAllWithCursor(
  //   @Args('args') args: ConnectionArgs,
  //   @Args('site') site: string,
  // ): Promise<ListGiftResponse> {
  //   const { limit, offset } = getPagingParameters(args);
  //   const { products, count } =
  //     await this.giftService.findAllProductsByPagination(
  //       { limit, offset },
  //       site,
  //     );
  //   const page = connectionFromArraySlice(products, args, {
  //     arrayLength: count,
  //     sliceStart: offset || 0,
  //   });

  //   return { page, pageData: { count, limit, offset } };
  // }

  @Mutation(() => Gift, { name: 'updateImagesGift' })
  updateImagesGift(
    @Args() id: GetGiftArgs,
    @Args('input', { type: () => [UpdateImagesInput] })
    input: UpdateImagesInput[],
  ) {
    return this.giftService.updateImages(id, input);
  }

  @Mutation(() => Gift, { name: 'updateSpecsGift' })
  updateSpecsGift(
    @Args() id: GetGiftArgs,
    @Args('input', { type: () => [UpdateSpecsInput] })
    input: UpdateSpecsInput[],
  ) {
    return this.giftService.updateSpecs(id, input);
  }

  @Mutation(() => Gift, { name: 'updateTagsGift' })
  updateTagsGift(
    @Args() id: GetGiftArgs,
    @Args('input', { type: () => [UpdateTagsInput] })
    input: UpdateTagsInput[],
  ) {
    return this.giftService.updateTags(id, input);
  }

  @Mutation(() => Gift, { name: 'updateDetailsGift' })
  updateDetailsGift(
    @Args() id: GetGiftArgs,
    @Args('input', { type: () => UpdateDetailsInput})
    input: UpdateDetailsInput,
  ) {
    return this.giftService.updateDetails(id, input);
  }

  //TODO: articleType

  @Mutation(() => Gift)
  updateColorsGift(
    @Args() id: GetGiftArgs,
    @Args('input') input: UpdateColorsInput,
  ) {
    return this.giftService.updateColors(id, input);
  }

  @Mutation(() => Gift)
  updateSizesGift(
    @Args() id: GetGiftArgs,
    @Args('input') input: UpdateSizesInput,
  ) {
    return this.giftService.updateSizes(id, input);
  }
}
