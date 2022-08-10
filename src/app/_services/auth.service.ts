import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Validators} from '@angular/forms';
import {map} from 'rxjs/internal/operators';

const AUTH_API = 'http://localhost:8089/api/authenticate/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })

};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods' : 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept, Accept-Language, Content-Language, x-client-key, x-client-token, x-client-secret, Authorization'}) };

  constructor(private http: HttpClient) { }

 login(credentials: { username: string; password: string, rememberMe: boolean; }): Observable<any> {

    console.log(credentials);
    const body = JSON.stringify(credentials);
    return this.http
     .post<any>('http://localhost:8089/api/authenticate', credentials    ,    this._options
 )
     .pipe(
       map(userData => {
        console.log(userData);
        const tokenStr = userData.accessToken;
        sessionStorage.setItem('token', tokenStr);
        return userData;
       }),
 );
    return this.http.post(AUTH_API , {
      username: credentials.username,
      password: credentials.password,
      rememberMe : credentials.rememberMe
    }, httpOptions);
  }

  // tslint:disable-next-line:max-line-length
  register(model): Observable<any> {
    return this.http.post('http://localhost:8089/api/registerUser', model);
  }


}
