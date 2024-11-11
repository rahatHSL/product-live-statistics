# Product Live Statistics

This application provides real-time statistics on product views using WebSocket and Redis.

## Features

- **REST API Endpoints**:

  - `GET /product/live`: Returns live viewer count for a specific product (`productId` parameter required).
  - `GET /product/admin`: Provides all products and their views data on live product views.

- **WebSocket API**:
  - `ws://localhost:8080?productId=<product_name>`: Connects clients to view live statistics for a specific product.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/rahatHSL/product-live-statistics.git
   cd product-live-statistics
   ```

2. **Configure Environment Variables**:  
   Create or rename the `.env.example` file to `.env` file in the project root with the following:

   ```plaintext
   SERVER_PORT=3000
   WS_PORT=8080
   REDIS_USER=redis
   REDIS_PASS=redis_secret
   REDIS_HOST=redis
   REDIS_PORT=6379
   ```

3. **Build and Run with Docker**:

   ```bash
   docker compose up --build
   ```

4. **API Usage**:

   - **Get Live Product Statistics**:

     ```bash
     curl "http://localhost:3000/product/live?productId=Sesher%20Kabita"
     ```

   - **Admin Endpoint**:

     ```bash
     curl "http://localhost:3000/product/admin"
     ```

   - **WebSocket Endpoint**:
     Connect to `ws://localhost:8080?productId=<product_name>` to receive live updates for a specific product.

5. **Running Tests**:
   ```bash
   npm test
   ```
