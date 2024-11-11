import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import redis from '../src/provider/redisClient';
import supertest from 'supertest';
import App from '../src/provider/WebServer';

describe('Product Api', () => {
  beforeAll(async () => {
    await redis.connect();
  });

  it('should return live products', async () => {
    const result = await supertest(App).get(`/product/live?productId=1234111`);
    console.log(result.body);

    expect(result.status).toBe(200);
    expect(result.body.count).not.toBeUndefined();
  });

  it('should thew error for live products without productId', async () => {
    const result = await supertest(App).get(`/product/live`);
    console.log(result.body);

    expect(result.status).toBe(400);
    expect(result.body.count).toBeFalsy();
  });

  it('should return all products with views for admin', async () => {
    const result = await supertest(App).get(`/product/admin`);
    console.log(result.body);

    expect(result.status).toBe(200);
    expect(result.body).toBeTruthy();
  });

  afterAll(async () => {
    await redis.disconnect();
  });
});
