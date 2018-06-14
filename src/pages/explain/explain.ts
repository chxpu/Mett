import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PracticePage} from "../practice/practice";


@Component({
  selector: 'page-explain',
  templateUrl: 'explain.html',
})
export class ExplainPage {
  private imgSrc: string;
  private emotionType: string;
  private leftTitle: string;
  private rightTitle: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.emotionType = this.navParams.get('emotionType');
    this.imgSrc = './assets/imgs/'+ this.emotionType +'.jpg';
    this.initialTitle(this.emotionType);
  }

  ionViewDidLoad() {

  }

  /**
   * 练习
   */
  goPractice() {
    this.navCtrl.pop();
    this.navCtrl.push(PracticePage);
  }

  /**
   * 返回
   */
  goBack(){
    this.navCtrl.pop();
  }

  /**
   * 根据上一个页面传入的参数，设置标题
   * @param {string} emotionType
   */
  initialTitle(emotionType: string) {
    switch (emotionType){
      case 'qm':
        this.leftTitle = '轻蔑';
        this.rightTitle = 'Contempt';
        break;
      case 'fn':
        this.leftTitle = '愤怒';
        this.rightTitle = 'Anger';
        break;
      case 'yw':
        this.leftTitle = '厌恶';
        this.rightTitle = 'Disgust';
        break;
      case 'hp':
        this.leftTitle = '害怕';
        this.rightTitle = 'Fear';
        break;
      case 'gx':
        this.leftTitle = '高兴';
        this.rightTitle = 'Happiness';
        break;
      case 'jy':
        this.leftTitle = '惊讶';
        this.rightTitle = 'Surprise';
        break;
      case 'bs':
        this.leftTitle = '悲伤';
        this.rightTitle = 'Sadness';
        break;
      case 'zl':
        this.leftTitle = '中立';
        this.rightTitle = 'Neutral';
        break;
    }
  }

}
