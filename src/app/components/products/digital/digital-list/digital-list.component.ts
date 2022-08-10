import { Component, OnInit } from '@angular/core';
import { digitalListDB } from 'src/app/shared/tables/digital-list';
import {LocalDataSource} from 'ng2-smart-table';
import {ProductService} from '../../../../shared/service/ProductService';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-digital-list',
  templateUrl: './digital-list.component.html',
  styleUrls: ['./digital-list.component.scss']
})
export class DigitalListComponent implements OnInit {

  constructor(private productService: ProductService) {
    this.digital_list = digitalListDB.digital_list;
  }
  url: any;
  // tslint:disable-next-line:variable-name
  public digital_list = [];
  products: LocalDataSource;

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
      id: {
        title: 'ProductId'
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
      mark: {
        title: 'Mark',
        valuePrepareFunction: (idx, mark) => {
          return `${mark.mark.name}`;
        },
      },
        // category: {
        //   title: 'Category',
        //   valuePrepareFunction: (idx, cat) => {
        //     return `${cat.category.name}`;
        //   },
        // },
          subCategory: {
            title: 'SubCategory',
            valuePrepareFunction: (idx, sub) => {
              return `${sub.subCategory.name}`;
            },
          },
          },
        };
        ngOnInit() {
          this.productService.getAll().subscribe(data => {
            this.products = new LocalDataSource(data.content);
            console.log(data);
          });
        }
        readUrl(event: any) {
          if (event.target.files && event.target.files[0]) {
            this.url = event.target.files[0];

          }
        }
        onDelete(prod: any) {
          console.log(prod.data);
          this.productService.delete(prod.data.id).subscribe(
            res => {
              console.log(res);
              prod.confirm.resolve(prod.source.data);
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

