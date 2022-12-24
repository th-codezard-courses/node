import categories from './categories.js';
import products from './products.js';
import orders from './orders.js';

export function serve(app) {
  app.use('/categories', categories);
  app.use('/products', products);
  app.use('/orders', orders);
}
