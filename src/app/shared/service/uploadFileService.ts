import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'})
export class UploadFileService {
  constructor(private http: HttpClient) { }
  pushFileToStorage(file: any): Observable<any> {
    const data: FormData = new FormData();
    data.append('files', file);
    const item = {
      name: file.name,
    };
    data.append('image', JSON.stringify(item));

    return this.http.post<any>('http://localhost:8089/api/images', data, {observe: 'response'});
    // const newRequest = new HttpRequest('POST', 'http://localhost:8089/api/images', data, {
    //   reportProgress: true,
    //   responseType: 'text'
    // });
    // return this.https.request(newRequest);
  }}
