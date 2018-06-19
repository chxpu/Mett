import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PracticeReportPage} from "../practice-report/practice-report";


@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalPage');
  }

  /**
   * 练习报告页面
   */
  practiceReport() {
    this.navCtrl.push(PracticeReportPage);
  }

}
