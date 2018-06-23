import { Component } from '@angular/core';
import {App, NavController, NavParams, ToastController} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user.service";
import {LoginPage} from "../login/login";


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private username:string;
  private password:string;
  private confirmPassword:string;
  private email:string;
  private tel:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService: UserServiceProvider,
              private app: App,
              private toastCtrl: ToastController,) {
      this.username = '';
      this.password = '';
      this.confirmPassword = '';
      this.email = '';
      this.tel = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  /**
   * 注册
   */
  Register() {
    // 检验数据合法性
    if ( !this.checkAll() ) {
      return
    }
    this.userService.Register(this.username, this.password, this.email,this.tel)
      .subscribe(data =>{
          if (data.code === 0) {
            this.showToast('用户名已存在，请重试！', 2000,'top','');
          }
          else if (data.code === 2) {
            this.showToast('注册成功，请登录！', 2000,'top','');
            this.app.getRootNav().setRoot(LoginPage);
          }
        },
        error1 => {
          this.showToast('注册失败,请重试！', 2000,'top','');
        }
      )
  }

  checkName() {
    let usernamePattern = /^[a-zA-Z0-9_-]{4,16}$/;
    if (this.username === '')
      return '请输入用户名';
    else if( !usernamePattern.test(this.username) ) {
      return '用户名4至16位（字母、数字、符合）';
    }
    else if (this.username[0] >= '0' && this.username[0] <= '9')
      return '用户名不能以数字开头';
    else
      return '用户名';
  }
  checkPassword() {
    if (this.password === '')
      return '请输入密码';
    else if (this.password.length < 6)
      return '密码不能小于6位';
    else
      return '密码';
  }
  checkConfirmPassword() {
    if (this.confirmPassword === '')
      return '请确认密码';
    else if (this.confirmPassword != this.password)
      return '两次输入密码不一致';
    else
      return '确认密码';
  }
  checkEmail() {
    let emailPattern = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if ( !emailPattern.test(this.email) )
      return '请输入正确的电子邮箱格式';
    else
      return '电子邮箱';
  }
  checkTel() {
    let telPattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    if ( !telPattern.test(this.tel) )
      return '请输入正确的电话号码';
    else
      return '电话号码';
  }

  /**
   * 检查所有输入是否合格
   * @returns {boolean}
   */
  checkAll() {
    if (this.checkName()==='用户名' &&
      this.checkPassword()==='密码' &&
      this.checkConfirmPassword()==='确认密码' &&
      this.checkEmail()==='电子邮箱' &&
      this.checkTel()==='电话号码' ) {
      return true;
    }
    else {
      this.showToast('输入参数格式错误，请重试！',2000,'top','')
      return false
    }
  }


  /**
   * 封装showToast
   * @param {string} messageParam,
   * @param {number} durationParam
   * @param {string} positionParam
   */
  showToast(messageParam:string, durationParam:number, positionParam:string, cssClassParam:string) {
    let toast = this.toastCtrl.create({
      message: messageParam,
      duration: durationParam,
      position:positionParam,
      cssClass: cssClassParam
    });
    toast.present();
  }


}

