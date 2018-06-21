import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FaceAttributes} from "../../entity/FaceAttributes";



@Component({
  selector: 'page-practice-report',
  templateUrl: 'practice-report.html',
})
export class PracticeReportPage {
  private FaceAttributesData: Array<FaceAttributes>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.FaceAttributesData = [
      {
        "gender": "male",
        "age": 22,
        "emotion": {
          "anger": 0,
          "contempt": 0,
          "disgust": 0,
          "fear": 0,
          "happiness": 0.986,
          "neutral": 0,
          "sadness": 0.014,
          "surprise": 0
        }
      },
      {
        "gender": "male",
        "age": 22,
        "emotion": {
          "anger": 0,
          "contempt": 0,
          "disgust": 0,
          "fear": 0,
          "happiness": 0.986,
          "neutral": 0,
          "sadness": 0.014,
          "surprise": 0
        }
      }
    ]
  }

}
