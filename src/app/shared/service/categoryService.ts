import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Category} from '../models/category';


type EntityResponseType = HttpResponse<Category>;
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public resourceUrl = 'http://localhost:8089/api/categories';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:8089/api/categories');
  }

  create(category: any): Observable<EntityResponseType> {
    return this.http.post<Category>(this.resourceUrl, category, {observe: 'response'});
  }

  update(category: any): Observable<EntityResponseType> {
    return this.http.put<Category>(this.resourceUrl, category, {observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
