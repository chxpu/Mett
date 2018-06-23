import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {getReportResponseData} from "../../entity/getReportResponseData";
import {UserServiceProvider} from "../../providers/user-service/user.service";
import {PracticePage} from "../practice/practice";


@Component({
  selector: 'page-practice-report',
  templateUrl: 'practice-report.html',
})
export class PracticeReportPage {
  private FaceAttributesData: Array<getReportResponseData>;
  private isShowCard = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService: UserServiceProvider,
              private loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: '加载中...'
    });
    loading.present();
    // 从服务器获取数据
    this.userService.getReport()
      .subscribe(
        (data) => {
          this.FaceAttributesData = data.data;
          if (this.FaceAttributesData.length == 0) {
            this.isShowCard = true;
          }
          loading.dismiss();
        },
        (error1) => {
          console.log(error1);
        }
      )

  }

  ionViewDidLoad() {
  }

  /**
   * 练习
   */
  goPractice() {
    this.navCtrl.push(PracticePage);
  }

}
