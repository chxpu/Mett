import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from "../../entity/user";
import {FaceAttributes} from "../../entity/FaceAttributes";


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
    return this.http.post<any>(registUrl, registerBody, registerOptions);
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
    console.log('setUser：ID = ' + nowUser.id);
    this.NowUser = nowUser;
  }

  /**
   * 获取当前用户信息
   */
  getUser() {
    console.log('getUser： ID = ' + this.NowUser.id);
    return this.NowUser
  }


  /**
   * 提交记录
   */
  addReport(faceAttributes: FaceAttributes) {
    let type: string = 'anger';
    let score: number = faceAttributes.emotion.anger;
    const addReportUrl = 'http://113.55.114.13:8080/report/addReport';
    const addReportOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    if (score < faceAttributes.emotion.contempt) {
      type = 'contempt'; score = faceAttributes.emotion.contempt;
    }
    if (score < faceAttributes.emotion.disgust) {
      type = 'disgust'; score = faceAttributes.emotion.disgust;
    }
    if (score < faceAttributes.emotion.fear) {
      type = 'fear'; score = faceAttributes.emotion.fear;
    }
    if (score < faceAttributes.emotion.happiness) {
      type = 'happiness'; score = faceAttributes.emotion.happiness;
    }
    if (score < faceAttributes.emotion.neutral) {
      type = 'neutral'; score = faceAttributes.emotion.neutral;
    }
    if (score < faceAttributes.emotion.sadness) {
      type = 'sadness'; score = faceAttributes.emotion.sadness;
    }
    if (score < faceAttributes.emotion.sadness) {
      type = 'sadness'; score = faceAttributes.emotion.sadness;
    }

    let addReportBody = {
      "type" : type,
      "age" : faceAttributes.age,
      "gender" : faceAttributes.gender,
      "user" : {"id" : this.NowUser.id},
      "score" : score,
      "angry" : faceAttributes.emotion.anger,
      "contempt" : faceAttributes.emotion.contempt,
      "disgust" : faceAttributes.emotion.disgust,
      "fear" : faceAttributes.emotion.fear,
      "happiness" : faceAttributes.emotion.happiness,
      "sadness" : faceAttributes.emotion.sadness,
      "surprise" : faceAttributes.emotion.surprise,
      "neutral" : faceAttributes.emotion.neutral
    };

    return this.http.post<any>(addReportUrl, addReportBody, addReportOptions);
  }


  /**
   * 获取当前用户的测试记录
   */
  getReport() {
    console.log('this.NowUser' + this.NowUser.id);
    const getReportUrl = 'http://113.55.114.13:8080/report/getReport/' + this.NowUser.id;
    const getReportOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };

    return this.http.get<any>(getReportUrl, getReportOptions);
  }


}
