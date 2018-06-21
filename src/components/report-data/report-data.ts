import {Component, Input} from '@angular/core';
import {FaceAttributes} from "../../entity/FaceAttributes";


@Component({
  selector: 'report-data',
  templateUrl: 'report-data.html',
  inputs: ['FaceAttributesDataItem']
})
export class ReportDataComponent {
  private FaceAttributesDataItem: FaceAttributes;
  private title1: string;
  private title2: string;
  private score: number;


  constructor() {
    this.score = 95.89;
  }

}
