import { createClient, RedisClientType } from 'redis';

const url = `redis://:${process.env.REDIS_PASS}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
const redis: RedisClientType = createClient({ url });

redis.on('error', (err) => console.error('Redis Client Error', err));

export default redis;
