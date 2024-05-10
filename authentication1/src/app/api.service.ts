import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

import { Observable, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl_register = 'http://127.0.0.1:8000/api/auth/register';
  private apiUrl_login = 'http://127.0.0.1:8000/api/auth/login';
  private apiUrl_User = 'http://127.0.0.1:8000/api/auth/user';
  private apiUrl_Logout = 'http://127.0.0.1:8000/api/auth/logout';
  constructor( private http: HttpClient) { }
  res!:string

  register_user(user:User):Observable<User>{
    
    return this.http.post<User>(this.apiUrl_register,user)
  
  }

  login_user(user:User):Observable<any>{
    
    return this.http.post<any>(this.apiUrl_login, user)

  }

  getUser(): Observable<any> {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
      return this.http.get<any>(this.apiUrl_User, { headers });
    } else {
      return throwError('Unauthorized');
    }
  }

  logout_user():Observable<any>{
    return this.http.post<any>(this.apiUrl_Logout,null)
  }

}