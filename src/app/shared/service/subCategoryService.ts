import {HttpClient, HttpResponse} from '@angular/common/http';
import {Category} from '../models/category';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SubCategory} from '../models/subCategory';

type EntityResponseType = HttpResponse<SubCategory>;
@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  public resourceUrl = 'http://localhost:8089/api/subCategories';
  public ressourceUrl2 = 'http://localhost:8089/api/sub-categories';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:8089/api/sub-categories');
  }

  create(subCategory: any): Observable<EntityResponseType> {
    return this.http.post<SubCategory>(this.resourceUrl, subCategory, {observe: 'response'});
  }

  update(subCategory: any): Observable<EntityResponseType> {
    return this.http.put<SubCategory>(this.resourceUrl, subCategory, {observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.ressourceUrl2}/${id}`, { observe: 'response' });
  }
}
