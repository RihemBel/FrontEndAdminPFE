import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {HttpErrorResponse} from '@angular/common/http';
import {ItemService} from '../../../../shared/service/itemService';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-digital-itemList',
  templateUrl: './digital-itemList.component.html',
  styleUrls: ['./digital-itemList.component.scss']
})
export class DigitalItemListComponent implements OnInit{

  constructor(private itemService: ItemService) {
    // this.digital_list = digitalListDB.digital_list;
  }
  url: any;
  // tslint:disable-next-line:variable-name
  // public digital_list = [];
  items: LocalDataSource;

  // @ts-ignore
  public settings = {
    actions: {
      position: 'right'
    },
    delete: {
      confirmDelete: true,
    },
    columns: {
      image: {
        title: 'Image',
        type: 'html',
        valuePrepareFunction: (image: string) => `<img width="50px" src="${image}" />`,
      },
      name: {
        title: 'Name'
      },
      sku: {
        title: 'SKU'
      },
      price: {
        title: 'Price'
      },
      qttInStock: {
        title: 'Quantity',
      },
      product: {
        title: 'Product',
        valuePrepareFunction: (idx, prod) => {
          return `${prod.product.name}`;
        },
      },
    },
  };
  ngOnInit() {
    this.itemService.getAll().subscribe(data => {
      this.items = new LocalDataSource(data);
      console.log(data);
    });
  }
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.url = event.target.files[0];

    }
  }
  onDelete(item: any) {
    console.log(item.data);
    this.itemService.delete(item.data.id).subscribe(
      res => {
        console.log(res);
        item.confirm.resolve(item.source.data);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
        } else {
          console.log('Server-side error occured.');
        }
      });
  }
}
