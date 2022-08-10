import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { orderDB } from "../../../shared/tables/order-list";
import {LocalDataSource} from 'ng2-smart-table';
import {OrderService} from '../../../shared/service/orderService';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  constructor(private orderService : OrderService) {
    this.order = orderDB.list_order;
  }
  public order = [];
  public temp = [];

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  orders: LocalDataSource;


  // @ts-ignore
  public settings = {
    columns: {
      // image: {
      //   title: 'Image',
      //   type: 'html',
      //   valuePrepareFunction: (image: string) => `<img width="50px" src="${image}" />`,
      // },
      id: {
        title: 'Order Id'
      },
      totalAmount: {
        title: 'totalAmount'
      },
      created: {
        title: 'created'
      },
      UserName: {
        title: 'User',
        valuePrepareFunction: (idx, user) => {
          console.log(user.user.firstname);
          return `${user.user.firstname + ' ' + user.user.lastname}`;
        },
      },
      UserPhone: {
        title: 'User Phone',
        valuePrepareFunction: (idx, user) => {
          return `${user.user.phone}`;
        },
      },
      ProductId: {
        title: 'Products',
        valuePrepareFunction: (idx, po) => {
      let quantity = '';
      for (let i=0; i<po.productOrder.length; i++) {
          quantity = quantity + po.productOrder[i].nbProd + ' x ' + po.productOrder[i].productOrderPk.productId + ' ; ' ;
      }
      return `${quantity}`;
        },
      },
    },
  };

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.order = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  ngOnInit() {
    this.orderService.getAll().subscribe(data => {
      this.orders = new LocalDataSource(data);
      console.log(data);
    });
  }

}
