import redis from '../provider/redisClient';
import { RedisCache } from '../service/RedisCache';

export class getAllProductAction {
  cache: RedisCache;
  constructor() {
    this.cache = new RedisCache(redis);
  }
  async execute() {
    return this.getAllViewerCount();
  }

  async getAllViewerCount(): Promise<any> {
    const productList = await this.cache.getProductList();
    const productListWithCount = await Promise.all(
      productList.map(async (product: string) => {
        const count = await this.cache.getDailyViewCount(product);
        return { product, views: count ?? 0 };
      }),
    );
    return productListWithCount;
  }
}
