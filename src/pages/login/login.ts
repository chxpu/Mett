import { Component } from '@angular/core';
import {App, IonicPage, LoadingController, NavController, Platform, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage'
import {BackButtonService} from "../../providers/back-button/backButton.service";
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import {RegisterPage} from "../register/register";
import {UserServiceProvider} from "../../providers/user-service/user.service";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  public username: string = '';
  public password: string = '';
  private eyeShow: boolean;
  public isRemember: boolean;

  constructor(private app: App,
              private storage: Storage,
              private loadingCtrl: LoadingController,
              private backButtonService: BackButtonService,
              private platform: Platform,
              private screenOrientation: ScreenOrientation,
              private toastCtrl: ToastController,
              private userService: UserServiceProvider,
              private navCtrl: NavController,) {
    // 注册返回键服务
    this.platform.ready().then(() => {
      this.backButtonService.registerBackButtonAction(null);
    });
    // 获取本地存储的记住用户名密码
    this.storage.get('username').then((val) => {
      if(val != null) {
        this.username = val;
      }
    });
    this.storage.get('password').then((val) => {
      if(val != null) {
        this.password = val;
      }
    });
    this.eyeShow = false;
    this.storage.get('isRemember').then((val) =>
      this.isRemember = val
    );

    // 测试数据
    this.username = 'admin';
    this.password = '123456';
  }

  ionViewDidLoad() {
    // 禁止屏幕旋转
    this.screenOrientation.lock('portrait');
  }

  /**
   * 点击登录
   */
  login() {
    // 登录动画
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: '登录中...'
    });
    if(this.isRemember) {
      // 记住账号密码 写入本地
      this.storage.set('username',this.username);
      this.storage.set('password',this.password);
      this.storage.set('isRemember', true);
    }
    else {
      // 清空本地账户存储
      this.storage.remove('username');
      this.storage.remove('password');
      this.storage.set('isRemember', false);
    }
    // 判断数据合法性
    if(this.username.length == 0) {
      this.showToast('请输入账号!', 2000, 'top','');
    }
    else if(this.password.length == 0) {
      this.showToast('请输入密码!', 2000, 'top','');
    }
    else {
      loading.present();
      // 登录请求
      this.userService.Login(this.username, this.password)
        .subscribe(data => {
            loading.dismiss();
            if (data.code === 3) {
                // 用户不存在
                this.showToast(data.msg, 2500,'top','');
            }
            else if (data.code === 4) {
              // 密码错误
              this.showToast(data.msg, 2500,'top','');
            }
            else if (data.code === 2) {
              // 登录成功，更新userToken
              this.userService.setUser(data.data);
              this.showToast(data.msg, 2000,'top','');
              this.app.getRootNav().setRoot(HomePage);
            }
            else {
              this.showToast('登录失败请重试！', 2000,'top','');
            }
          },
          error1 => {
            loading.dismiss();
            this.showToast(error1.msg, 2000,'top','');
          }
        );
    }
  }

  /**
   * 点击注册
   */
  goRegister() {
    this.navCtrl.push(RegisterPage);
  }

  /**
   * 点击试用
   */
  goHome() {
    this.userService.setUser(null);
    this.navCtrl.push(HomePage);
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
