import {Component, Input} from '@angular/core';
import {getReportResponseData} from "../../entity/getReportResponseData";


@Component({
  selector: 'report-data',
  templateUrl: 'report-data.html',
  inputs: ['FaceAttributesDataItem']
})
export class ReportDataComponent {
  private FaceAttributesDataItem: getReportResponseData;

  constructor() {
  }

  deleteReport() {

  }

}
