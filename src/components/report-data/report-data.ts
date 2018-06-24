import {Component} from '@angular/core';
import {getReportResponseData} from "../../entity/getReportResponseData";
import {UserServiceProvider} from "../../providers/user-service/user.service";
import {ToastController} from "ionic-angular";


@Component({
  selector: 'report-data',
  templateUrl: 'report-data.html',
  inputs: ['FaceAttributesDataItem']
})
export class ReportDataComponent {
  private FaceAttributesDataItem: getReportResponseData;
  private IsShowTheReport: boolean;

  constructor(private userService: UserServiceProvider,
              private toastCtrl: ToastController) {
    this.IsShowTheReport = true;
  }

  deleteReport(deleteReporeId: string) {
    this.userService.deleteReport(deleteReporeId).
      subscribe(
      (data) => {
        this.showToast('删除成功!', 1000, 'top','');
        this.IsShowTheReport = false;
      },
      (error1) => {
        console.log(error1);
      }
    );
  }

  /**
   * 封装showToast
   * @param {string} messageParam,
   * @param {number} durationParam
   * @param {string} positionParam
   */
  showToast(messageParam:string, durationParam:number, positionParam:string, cssClassParam:string) {
    let toast = this.toastCtrl.create({
      message: messageParam,
      duration: durationParam,
      position:positionParam,
      cssClass: cssClassParam
    });
    toast.present();
  }

}
