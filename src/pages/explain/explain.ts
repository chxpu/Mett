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
  private contentText: string;

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
        this.contentText = '当一个人高高在上，对其他人的举止行为不赞同时，就会出现蔑视的表情，' +
          '是一种社会性较强的表情。通常会产生蔑视的心理状态，形成一些趾高气昂的外在行为。' +
          '蔑视表情最大的特点是一边嘴角上扬，眼睛微微缩小，瞳孔缩小。';
        break;
      case 'fn':
        this.leftTitle = '愤怒';
        this.rightTitle = 'Anger';
        this.contentText = '愤怒的表情是人生气时表现出的表情，当人们遇到挫折无法实现，' +
          '或者是内心的需求得不到满足等情况下就会出现愤怒的情绪。愤怒的面部表情是眼睛瞪大，' +
          '瞳孔变小，眉毛下压，鼻孔不自觉的张大，并且会带有呼吸变粗，手握拳头等动作。';
        break;
      case 'yw':
        this.leftTitle = '厌恶';
        this.rightTitle = 'Disgust';
        this.contentText = '这类表情的表达通常是从心底产生的一种厌恶感，遇到让自己恶心的人、' +
          '行为或者事物时会产生厌恶的表情。厌恶的面部表情会出现眉毛下压，眼睛微小，' +
          '轻微的厌恶会出现嘴角稍稍张开，漏出一点牙齿，非常厌恶的情况下眼睛和嘴巴会出现紧闭的现象。';
        break;
      case 'hp':
        this.leftTitle = '害怕';
        this.rightTitle = 'Fear';
        this.contentText = '人们在惊恐或者害怕的时候会出现恐惧的表情，是惊讶表情的一种延伸，因为' +
          '惊恐会造成产生一些生理的变化，因此形成的面部表情肌肉会变得紧绷绷的，眉毛和眼皮也会上扬，' +
          '瞳孔会先变大后慢慢变小，同时伴有双臂紧抱等保护自己的动作。';
        break;
      case 'gx':
        this.leftTitle = '高兴';
        this.rightTitle = 'Happiness';
        this.contentText = '人在情绪达到喜悦的时候会不自觉的微笑，微笑是人表达快乐情绪的一个象征，' +
          '但不是所有的微笑都是内心愉悦的表达。许多情况下人们受环境等其它因素的影响，也会出现假笑的情' +
          '况。真正的快乐的表情是嘴角上扬并且眼睛会变小，同时眼角上扬，这才是真笑的表情，若仅仅嘴角上' +
          '扬，眼睛周围肌肉并无变化，此刻就是假笑的表现。';
        break;
      case 'jy':
        this.leftTitle = '惊讶';
        this.rightTitle = 'Surprise';
        this.contentText = '当人们突然接收到某种信息还没有反应过来的时候，通常会出现惊讶的面部表情，' +
          '这是一种突发的状况，人们会瞬间整理思绪进行面对，因此表情会维持不到一秒钟。惊讶的表情是眼睛睁' +
          '大，瞳孔放大，上眼皮和眉毛都会向上扬，并且嘴巴张大。';
        break;
      case 'bs':
        this.leftTitle = '悲伤';
        this.rightTitle = 'Sadness';
        this.contentText = '悲伤是情绪低落的表现，消极的情绪严重影响人们的心理健康，并且也会危害身体' +
          '的健康，调节自己内心，去除抑郁和悲伤的情绪是非常重要的。悲伤的面部表情是面部的肌肉会整体向下' +
          '垂，眉毛稍微紧皱并且向下压，眼睑处下垂。';
        break;
      case 'zl':
        this.leftTitle = '中立';
        this.rightTitle = 'Neutral';
        this.contentText = '中立（平静）的面部表情是最常见的表情，它代表内心没有较大的情绪变化，是一种' +
          '稳定的状态，说明此刻内心并没有受到外界环境的干扰。平静的面部表情是指人的面部肌肉是一种松弛的状' +
          '态，分布平稳均匀，没有较大的变化，保持面部表情的时间是最长久的。';
        break;
    }
  }

}
