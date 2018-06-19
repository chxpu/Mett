import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PracticeReportPage} from "../practice-report/practice-report";
import {UserServiceProvider} from "../../providers/user-service/user.service";
import {User} from "../../entity/user";
import {AboutPage} from "../about/about";
import {SharePage} from "../share/share";
import {FeedbackPage} from "../feedback/feedback";
import {PracticeAllTablePage} from "../practice-all-table/practice-all-table";


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
   * 分别跳转到各个页面
   */
  goPracticeReport() {
    this.navCtrl.push(PracticeReportPage);
  }

  goPracticeAllTable() {
    this.navCtrl.push(PracticeAllTablePage);
  }

  goFeedback() {
    this.navCtrl.push(FeedbackPage);
  }

  goShare() {
    this.navCtrl.push(SharePage);
  }

  goAbout() {
    this.navCtrl.push(AboutPage);
  }

}
