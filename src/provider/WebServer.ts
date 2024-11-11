import { Request, Response, NextFunction } from 'express';
import Express from 'express';
import { ProductController } from '../controller/ProductController';
const App = Express();
App.use(Express.json());
App.use(Express.urlencoded({ extended: true }));

App.use('/product', new ProductController().register());

App.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

export default App;
