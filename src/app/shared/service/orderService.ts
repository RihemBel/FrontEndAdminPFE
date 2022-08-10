import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../models/order';

type EntityResponseType = HttpResponse<Order>;
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
     return this.http.get('http://localhost:8089/api/orders');
  }
}
