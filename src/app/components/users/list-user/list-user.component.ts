import { Component, OnInit } from '@angular/core';
import { userListDB } from 'src/app/shared/tables/list-users';
import {LocalDataSource} from 'ng2-smart-table';
import {UserService} from '../../../shared/service/userService';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  public user_list = []

  constructor(private userService: UserService) {
    this.user_list = userListDB.list_user;
  }
  users: LocalDataSource;

  public settings = {
      delete: {
        confirmDelete: true,
      },
    columns: {
      image: {
        title: 'Image',
        type: 'html',
        valuePrepareFunction: (image: string) => `<img width="50px" src="${image}" />`,
      },
      firstname: {
        title: 'First Name',
      },
      lastname: {
        title: 'Last Name'
      },
      email: {
        title: 'Email'
      },
      phone: {
        title: 'Phone'
      },
      adresse: {
        title: 'Address'
      },
    },
  };

  ngOnInit() {
    this.userService.getAll().subscribe(data => {
      this.users = new LocalDataSource(data);
      console.log(data);
    });
  }
  onDelete(user: any){
    console.log(user.data);
    this.userService.delete(user.data.id).subscribe(
      res => {
        console.log(res);
        user.confirm.resolve(user.source.data);
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

