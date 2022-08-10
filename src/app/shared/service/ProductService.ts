import {HttpClient, HttpResponse} from '@angular/common/http';
import {Product} from '../models/product';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

type EntityResponseType = HttpResponse<Product>;
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public resourceUrl = 'http://localhost:8089/api/products';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:8089/api/products');
  }

  create(product: any): Observable<EntityResponseType> {
    return this.http.post<Product>(this.resourceUrl, product, {observe: 'response'});
  }

  update(product: any): Observable<EntityResponseType> {
    return this.http.put<Product>(this.resourceUrl, product, {observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
