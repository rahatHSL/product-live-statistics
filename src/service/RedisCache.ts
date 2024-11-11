import redisClient from '../provider/redisClient';
import { RedisClientType } from 'redis';

export class RedisCache {
  private redisClient: RedisClientType;
  constructor(private redis: RedisClientType) {
    this.redisClient = this.redis;
  }

  // live product viewers count cache
  async getViewerCount(productId: string): Promise<number> {
    const count = await this.redisClient.get(this.viewerCountKey(productId));
    return count ? parseInt(count) : 0;
  }

  async incrementViewerCount(productId: string): Promise<void> {
    await this.redisClient.incr(this.viewerCountKey(productId));
  }

  async decrementViewerCount(productId: string): Promise<void> {
    await this.redisClient.decr(this.viewerCountKey(productId));
  }

  private viewerCountKey(productId: string): string {
    return `product:${productId}:viewers`;
  }

  // daily view count cache
  async getDailyViewCount(productId: string): Promise<number> {
    const count = await this.redisClient.get(this.dailyViewCountKey(productId));
    return count ? parseInt(count) : 0;
  }

  async incrementDailyViewCount(productId: string): Promise<void> {
    await this.redisClient.incr(this.dailyViewCountKey(productId));
  }

  async resetDailyViewCount(productId: string): Promise<void> {
    await this.redisClient.set(this.dailyViewCountKey(productId), 0);
  }

  private dailyViewCountKey(productId: string): string {
    return `product:${productId}:dailyViews`;
  }

  // product list cache
  async setProductList(productList: string): Promise<void> {
    await this.redisClient.sAdd(this.productListKey(), productList);
  }

  async getProductList(): Promise<string[]> {
    return this.redisClient.sMembers(this.productListKey());
  }

  async resetProductList(): Promise<void> {
    await this.redisClient.del(this.productListKey());
  }

  private productListKey(): string {
    return 'product:List';
  }
}
