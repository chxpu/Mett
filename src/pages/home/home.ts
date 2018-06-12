import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {PracticePage} from "../practice/practice";
import {IntroductionPage} from "../introduction/introduction";
import {PersonalPage} from "../personal/personal";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  /**
   * 注册
   */
  goRegister() {
    this.navCtrl.push(RegisterPage);
  }

  /**
   * 练习
   */
  goPractice() {
    this.navCtrl.push(PracticePage);
  }

  /**
   * 表情介绍页面
   */
  goIntroduction() {
    this.navCtrl.push(IntroductionPage);
  }

  /**
   * 个人中心
   */
  goPersoner() {
    this.navCtrl.push(PersonalPage);
  }

}
