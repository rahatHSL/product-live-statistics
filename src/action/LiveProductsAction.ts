import redis from '../provider/redisClient';
import { RedisCache } from '../service/RedisCache';

export class LiveProductsAction {
  cache: RedisCache;
  constructor(private params: { productId: string }) {
    this.cache = new RedisCache(redis);
  }
  async execute() {
    const count = await this.cache.getViewerCount(this.params.productId);
    return { productId: this.params.productId, count };
  }
}
