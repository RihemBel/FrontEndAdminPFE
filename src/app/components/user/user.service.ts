// import {Component, Injectable} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import {Observable} from 'rxjs';
// import {User} from './user';
// import {map} from 'rxjs/internal/operators';
//
// @Injectable()
// export class UserService {
//   constructor(protected http: HttpClient) {}
//
//   public getUsers(): Observable<User[]> {
//     return this.http.get('http://localhost:4200/users/list-user').pipe(
//       map(
//         // tslint:disable-next-line:ban-types
//         (jsonArray: Object[]) => jsonArray.map(jsonItem => {
//           return User.fromJson(jsonItem);
//         })
//       )
//     );
//   }
// }
//
//
// @Component({
//   selector: 'app-articles-list',
//   templateUrl: './articles-list.component.html',
//   styleUrls: ['./articles-list.component.scss']
// })
// export class ArticleListComponent {
//
//   public users: User[];
//
//   constructor(private data: DataService) {
//   }
//
//   ngOnInit() {
//     this.data.getUsers().subscribe(
//       articles => this.users = users
//     );
//   }
// }
