require('dotenv').config();
import { WebSocketServer } from 'ws';
import redisClient from './provider/redisClient';
import App from './provider/WebServer';
import { RedisCache } from './service/RedisCache';
import redis from './provider/redisClient';

// best practices is to use socket server as a separate service. for simplicity, i will use the same server
const wss = new WebSocketServer({ port: +process.env.WS_PORT! });
const cache = new RedisCache(redis);

// to increment current viewer count
async function incrementViewerCount(productId: string): Promise<void> {
  await cache.incrementViewerCount(productId);
  await cache.incrementDailyViewCount(productId);

  //set product list.
  //In real life scenario, this data will be fetched from DB.
  await cache.setProductList(productId);
}

// to decrement current viewer count
async function decrementViewerCount(productId: string): Promise<void> {
  await cache.decrementViewerCount(productId);
}

wss.on('connection', (ws, req) => {
  const url = new URL(req.url ?? '', `http://${req.headers.host}`);
  const productId = url.searchParams.get('productId');
  const params = url.searchParams.entries();
  for (const [key, value] of params) {
    console.log(`${key}: ${value}`);
  }

  if (!productId) {
    ws.close(1008, 'Product ID required');
    return;
  }

  // Increment both current viewers and daily view count on connection
  incrementViewerCount(productId)
    .then(async () => {
      const viewerCount = await cache.getViewerCount(productId);
      ws.send(JSON.stringify({ productId, viewerCount }));
    })
    .catch((err) => console.error(err));

  ws.on('close', () => {
    decrementViewerCount(productId).catch((err) => console.error(err));
  });

  ws.on('message', async (message) => {
    if (message.toString() === 'getViewerCount') {
      const viewerCount = await cache.getViewerCount(productId);
      ws.send(JSON.stringify({ productId, viewerCount }));
    }
  });
});

App.listen(process.env.SERVER_PORT, async () => {
  console.log('WebSocket server is running on ws://localhost:8080');
  await redisClient.connect();
  console.log('Redis client connected');
  console.log(`Server started on port ${process.env.SERVER_PORT}`);
});
