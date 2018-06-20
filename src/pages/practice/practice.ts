import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';


@Component({
  selector: 'page-practice',
  templateUrl: 'practice.html',
  providers: []
})
export class PracticePage {
  private show: boolean;  // true显示表情识别，false显示相似度

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.show = true;
  }

  ionViewDidLoad() {
  }



}
