import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient) {
  }

  Register(username:string, password:string, email:string, tel:string) {
    const registUrl = 'http://113.55.114.13:8080/login/register';
    const registerOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    let registerBody = {
      "username": username,
      "password": password,
      "email": email,
      "tel": tel
    };
    return this.http.post<any>(registUrl, registerBody, registerOptions)
  }

  Login(username: string, password: string) {
    const loginUrl = 'http://113.55.114.13:8080/login/login';
    const loginOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    let loginBody = {
      "username": username,
      "password": password
    };
    return this.http.post<any>(loginUrl, loginBody, loginOptions)
  }


}
