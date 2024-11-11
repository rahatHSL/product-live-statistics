import { NextFunction, Request, Response } from 'express';
import { Controller } from './Controller';
import { LiveProductsAction } from '../action/LiveProductsAction';
import { getAllProductAction } from '../action/GetAllProductAction';

export class ProductController extends Controller {
  async liveProducts(
    req: Request<unknown, unknown, unknown, { productId: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const productId = req.query.productId as string;
      // bad practice. should be handled by middleware or validator
      if (!productId) {
        res.status(400).send('Product ID is required');
        return;
      }
      const product = await new LiveProductsAction(req.query).execute();
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async getAllProduct(
    req: Request<unknown, unknown, unknown, { productId: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const products = await new getAllProductAction().execute();

      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  register() {
    // I skip validation for simplicity
    this.router.get('/live', this.liveProducts.bind(this));
    this.router.get('/admin', this.getAllProduct.bind(this));

    return this.router;
  }
}
