import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {CognitiveServiceProvider} from "../../providers/cognitive-service/cognitive-service";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {SimilarResponseData} from "../../entity/SimilarResponseData";


@Component({
  selector: 'page-similar',
  templateUrl: 'similar.html',
})
export class SimilarPage {
  private imgSrc_1: string;
  private imgSrc_2: string;
  private photoUrl_1: string;
  private photoUrl_2: string;
  private faceId_1: string;
  private faceId_2: string;
  private result: Array<SimilarResponseData>;
  private resultIsZero: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              private cognitiveService: CognitiveServiceProvider,
              private toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public alerCtrl: AlertController) {
    this.clearNowData();
  }

  ionViewDidLoad() {
  }

  /**
   * 设置图片，1为上面，2为下面的第二张
   * @param {number} Num
   */
  setfaceIDByFile(Num: number) {
    let confirm = this.alerCtrl.create({
      title: '获取图片',
      message: '你需要从手机相册中选择图片还是打开相机拍照?',
      buttons: [{
          text: '手机相册',
          handler: () => {
            this.getLocalPhoto(Num, false);
          }
        }, {
          text: '拍照',
          handler: () => {
            this.getLocalPhoto(Num, true);
          }
        }
      ]
    });
    confirm.present();
  }

  /**
   *input失去焦点时触发，上传URL，并设置其faceId
   */
  setfaceIDByUrl(Num: number) {
      if (Num == 1) {
        if (this.photoUrl_1 == '') {
          return;
        }
        this.imgSrc_1 = this.photoUrl_1;
        this.cognitiveService.CognitiveUrl(this.photoUrl_1)
          .subscribe(
            data => {
              this.faceId_1 = data[0].faceId;
              if (this.faceId_2 != '') {
                this.compare();
              }
            },
            error1 => {
              console.log(error1);
            }
          );
      }
      else {
        if (this.photoUrl_2 == '') {
          return;
        }
        this.imgSrc_2 = this.photoUrl_2;
        this.cognitiveService.CognitiveUrl(this.photoUrl_2)
          .subscribe(
            data => {
              this.faceId_2 = data[0].faceId;
              if (this.faceId_1 != '') {
                this.compare();
              }
            },
            error1 => {
              console.log(error1);
            }
          );
      }

    }



  /**
   * 从手机相册或者拍照获取图片url并上传，将返回的faceId进行赋值
   * @param {number} Num 设置图片，1为上面，2为下面的第二张
   * @param {boolean} sourceFlag sourceFlag true打开相机，false打开相册
   */
  getLocalPhoto(Num: number, sourceFlag: boolean) {
    let sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    if (sourceFlag) {
      sourceType = this.camera.PictureSourceType.CAMERA
    }
    const options: CameraOptions = {
      quality: 80,                                                   //相片质量 0 - 100
      destinationType: this.camera.DestinationType.DATA_URL,        //DATA_URL 是 base64   FILE_URL 是文件路径
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,                                       //是否保存到相册
      sourceType: sourceType ,         //是打开相机拍照还是打开相册选择  PHOTOLIBRARY : 相册选择, CAMERA : 拍照,
      correctOrientation: true                                      // 固定照片的方向
    };
    this.camera.getPicture(options).then((imageData) => {
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      if (Num === 1) {
        this.imgSrc_1 = base64Image;
        this.photoUrl_1 = '';
      }
      if (Num === 2) {
        this.imgSrc_2 = base64Image;
        this.photoUrl_2 = '';
      }
      // console.log("base64Image: " + base64Image);
      //If it's file URI
      // this.imgSrc = imageData;

      this.cognitiveService.CognitiveFile(base64Image)
        .subscribe(
          data => {
            if (data.length == 0) {
              this.showToast('未检测到人脸，请重试！', 2500, 'top','');
              return;
            }
            else {
              if (Num === 1) {
                this.faceId_1 = data[0].faceId;
                // alert('this.faceId_1 = ' + this.faceId_1);
              }
              if (Num === 2) {
                this.faceId_2 = data[0].faceId;
                // alert('this.faceId_2 = ' + this.faceId_2);
              }
              if (this.faceId_1 != '' && this.faceId_2 != '') {
                this.compare();
              }
            }
          },
          error1 => {
            this.showToast('获取图片失败,请重试！', 2500, 'top','');
            console.log(error1);
          }
        )
    }, (err) => {
      // Handle error
    });
  }

  /**
   * 清空当前数据，准备下一次识别
   */
  clearNowData() {
    this.imgSrc_1 = './assets/imgs/card-amsterdam.png';
    this.imgSrc_2 = './assets/imgs/card-sf.png';
    this.photoUrl_1 = '';
    this.photoUrl_2 = '';
    this.faceId_1 = '';
    this.faceId_2 = '';
    this.result = null;
    this.resultIsZero = false;
  }


  /**
   * 调用比较API
   */
  compare() {
    this.result = null;
    // 没有合格的faceId
    if (this.faceId_1 == '' || this.faceId_2 == '') {
      this.showToast('识别失败，请选择正确的照片，必须含有人脸，请重试！', 3000, 'top','');
      return;
    }
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: '识别中...'
    });
    this.cognitiveService.findSimilar(this.faceId_2, this.faceId_1)
      .subscribe(
        (data) =>{
          this.resultIsZero = false;
          this.result = data;
          loading.dismiss();
        },
        error1 => {
          this.showToast('识别失败，请重试！', 2500, 'top','');
          loading.dismiss();
        }
      )
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
