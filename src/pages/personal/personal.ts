import { Component } from '@angular/core';
import {AlertController, App, NavController, NavParams} from 'ionic-angular';
import {PracticeReportPage} from "../practice-report/practice-report";
import {UserServiceProvider} from "../../providers/user-service/user.service";
import {User} from "../../entity/user";
import {AboutPage} from "../about/about";
import {SharePage} from "../share/share";
import {FeedbackPage} from "../feedback/feedback";
import {PracticeAllTablePage} from "../practice-all-table/practice-all-table";
import {LoginPage} from "../login/login";
import {SimilarPage} from "../similar/similar";


@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {
  private NowUser: User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService: UserServiceProvider,
              private app: App,
              private alerCtrl: AlertController) {
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

  goSimilar() {
    this.navCtrl.push(SimilarPage);
  }

  goFeedback() {
    this.navCtrl.push(FeedbackPage);
  }

  goShare() {
    this.navCtrl.push(SharePage);
  }

  logout() {
    let confirm = this.alerCtrl.create({
      title: '提示',
      message: '是否退出登录?',
      buttons: [{
        text: '确定',
        handler: () => {
          this.userService.setUser(null);
          this.app.getRootNav().setRoot(LoginPage);
        }
      }, {
        text: '取消',
        handler: () => {
          return;
        }
      }
      ]
    });
    confirm.present();
  }

  goAbout() {
    this.navCtrl.push(AboutPage);
  }

}
