import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Mark} from '../models/mark';

type EntityResponseType = HttpResponse<Mark>;
@Injectable({
  providedIn: 'root'
})
export class MarkService {
  public resourceUrl = 'http://localhost:8089/api/marks';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:8089/api/marks');
  }

  create(mark: any): Observable<EntityResponseType> {
    return this.http.post<Mark>(this.resourceUrl, mark, {observe: 'response'});
  }

  update(mark: any): Observable<EntityResponseType> {
    return this.http.put<Mark>(this.resourceUrl, mark, {observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
