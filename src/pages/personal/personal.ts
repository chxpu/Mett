import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PracticeReportPage} from "../practice-report/practice-report";
import {UserServiceProvider} from "../../providers/user-service/user.service";
import {User} from "../../entity/user";
import {AboutPage} from "../about/about";


@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {
  private NowUser: User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService: UserServiceProvider,) {
    this.NowUser = this.userService.getUser();
  }

  ionViewDidLoad() {
  }

  /**
   * 练习报告页面
   */
  goPracticeReport() {
    this.navCtrl.push(PracticeReportPage);
  }

  /**
   * 打开关于我们页面
   */
  goAbout() {
    this.navCtrl.push(AboutPage);
  }

}
