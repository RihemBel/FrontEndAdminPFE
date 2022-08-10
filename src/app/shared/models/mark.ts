export class Mark {
  id?: number;
  name?: string;
  image?: string;
  deleted: boolean;
  dataChangeCreatedTime: Date;
  dataChangeLastModifiedTime: Date;

  constructor(id: number, name: string, image: string, deleted: boolean, dataChangeCreatedTime: Date, dataChangeLastModifiedTime: Date) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.deleted = deleted;
    this.dataChangeCreatedTime = dataChangeCreatedTime;
    this.dataChangeLastModifiedTime = dataChangeLastModifiedTime;
  }
}
