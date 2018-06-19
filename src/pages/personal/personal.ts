import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PracticeReportPage} from "../practice-report/practice-report";
import {UserServiceProvider} from "../../providers/user-service/user.service";
import {User} from "../../entity/user";


@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {
  private NowUser: User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService: UserServiceProvider,) {
  }

  ionViewDidLoad() {
    this.NowUser = this.userService.getUser();
  }

  /**
   * 练习报告页面
   */
  practiceReport() {
    this.navCtrl.push(PracticeReportPage);
  }

}
