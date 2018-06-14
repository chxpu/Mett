import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExplainPage } from "../explain/explain";


@Component({
  selector: 'page-introduction',
  templateUrl: 'introduction.html',
})
export class IntroductionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  goExplain(emotionType: string) {
    this.navCtrl.push(ExplainPage, { emotionType });
  }

}
