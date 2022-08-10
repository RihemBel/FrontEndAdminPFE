import {User} from '../../components/user/user';
import {ProductOrder} from './productOrder';

// tslint:disable-next-line:class-name
export class Order {
  id?: number;
  user?: User;
  totalAmount: number;
  productOrder: ProductOrder;
  created: Date;


  constructor(id: number, user: User, totalAmount: number, productOrder: ProductOrder) {
    this.id = id;
    this.user = user;
    this.totalAmount = totalAmount;
    this.productOrder = productOrder;
  }
}
