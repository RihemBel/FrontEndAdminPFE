import {User} from '../../components/user/user';
import {Product} from './product';
import {Order} from './order';

export class ProductOrder {
  nbProd?: number;
  price?: User;
  order: Order;
  product: Product;

  constructor(nbProd: number, price: User, order: Order, product: Product) {
    this.nbProd = nbProd;
    this.price = price;
    this.order = order;
    this.product = product;
  }
}
