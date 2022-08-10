import {Category} from '../models/category';


export class SubCategory {
  id?: number;
  name?: string;
  image?: string;
  category: Category;
  deleted: boolean;
  dataChangeCreatedTime: Date;
  dataChangeLastModifiedTime: Date;

  constructor(id: number, name: string, image: string, category: Category, deleted: boolean, dataChangeCreatedTime: Date, dataChangeLastModifiedTime: Date) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.category = category;
    this.deleted = deleted;
    this.dataChangeCreatedTime = dataChangeCreatedTime;
    this.dataChangeLastModifiedTime = dataChangeLastModifiedTime;
  }


}
