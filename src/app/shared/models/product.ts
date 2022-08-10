import {Category} from './category';
import {SubCategory} from './subCategory';
import {Mark} from './mark';

export class Product {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  hasVariant: boolean;
  image?: string;
  qttInStock: number;
  mark: Mark;
  category: Category;
  subCategory: SubCategory;
  deleted: boolean;
  dataChangeCreatedTime: Date;
  dataChangeLastModifiedTime: Date;

  constructor(id: number, name: string, description: string, price: number, hasVariant: boolean, image: string, qttInStock: number, mark: Mark, category: Category, subCategory: SubCategory, deleted: boolean, dataChangeCreatedTime: Date, dataChangeLastModifiedTime: Date) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.hasVariant = hasVariant;
    this.image = image;
    this.qttInStock = qttInStock;
    this.mark = mark;
    this.category = category;
    this.subCategory = subCategory;
    this.deleted = deleted;
    this.dataChangeCreatedTime = dataChangeCreatedTime;
    this.dataChangeLastModifiedTime = dataChangeLastModifiedTime;
  }
}
