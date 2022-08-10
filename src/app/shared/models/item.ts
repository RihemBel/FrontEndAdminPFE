import {Product} from './product';

export class Item {
  id?: number;
  name?: string;
  sku: string;
  description?: string;
  price?: number;
  image?: string;
  qttInStock: number;
  product: Product;
  deleted: boolean;
  dataChangeCreatedTime: Date;
  dataChangeLastModifiedTime: Date;

  constructor(id: number, name: string, description: string, price: number, image: string, qttInStock: number, product: Product, deleted: boolean, dataChangeCreatedTime: Date, dataChangeLastModifiedTime: Date, sku: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.qttInStock = qttInStock;
    this.product = product;
    this.deleted = deleted;
    this.dataChangeCreatedTime = dataChangeCreatedTime;
    this.dataChangeLastModifiedTime = dataChangeLastModifiedTime;
    this.sku = sku;

  }
}
