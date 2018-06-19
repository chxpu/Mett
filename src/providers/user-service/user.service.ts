import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from "../../entity/user";


@Injectable()
export class UserServiceProvider {
  private NowUser: User;

  constructor(public http: HttpClient) {
  }

  /**
   * 注册服务
   * @param {string} username
   * @param {string} password
   * @param {string} email
   * @param {string} tel
   * @returns {Observable<any>}
   * @constructor
   */
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

  /**
   * 登录服务
   * @param {string} username
   * @param {string} password
   * @returns {Observable<any>}
   * @constructor
   */
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


  /**
   * 设置当前用户信息
   */
  setUser(nowUser: User) {
    console.log('setUser'+nowUser);
    this.NowUser = nowUser;
  }

  /**
   * 获取当前用户信息
   */
  getUser() {
    console.log('getUser'+this.NowUser);
    return this.NowUser
  }


}
