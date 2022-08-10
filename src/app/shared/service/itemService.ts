import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../models/item';

type EntityResponseType = HttpResponse<Item>;
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  public resourceUrl = 'http://localhost:8089/api/items';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:8089/api/items');
  }

  create(item: any): Observable<EntityResponseType> {
    return this.http.post<Item>(this.resourceUrl, item, {observe: 'response'});
  }

  update(item: any): Observable<EntityResponseType> {
    return this.http.put<Item>(this.resourceUrl, item, {observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
