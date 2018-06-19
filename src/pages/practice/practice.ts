import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {CognitiveServiceProvider} from "../../providers/cognitive-service/cognitive-service";
import {FaceAttributes} from "../../entity/FaceAttributes";


@Component({
  selector: 'page-practice',
  templateUrl: 'practice.html',
  providers: []
})
export class PracticePage {
  private imgSrc: string;
  private photoUrl: string;
  private result: FaceAttributes;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              private cognitiveService: CognitiveServiceProvider,
              private toastCtrl: ToastController,) {
    this.clearNowData();
  }

  ionViewDidLoad() {
  }

  /**
   * 识别文件
   * @param {boolean} sourceFlag true打开相机，false打开相册
   */
  uploadFile(sourceFlag: boolean) {
    this.photoUrl = '';
    let sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    if (sourceFlag) {
      sourceType = this.camera.PictureSourceType.CAMERA
    }
    const options: CameraOptions = {
      quality: 70,                                                   //相片质量 0 -100
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
      this.imgSrc = base64Image;
      // console.log("base64Image: " + base64Image);

      //If it's file URI
      // this.imgSrc = imageData;

      this.result = null;
      this.cognitiveService.CognitiveFile(base64Image)
        .subscribe(
          data => {
            if (data.length == 0) {
              this.imgSrc = "./assets/imgs/logo.png";
              this.showToast('未检测到人脸，请重试！', 2500, 'top','');
              return;
            }
            this.result = data[0].faceAttributes;
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
   * 上传Url
   */
  uploadUrl() {
    this.result = null;
    if (this.photoUrl === "") {
      this.showToast('请输入需要识别的图片URL！', 2500, 'top','');
      return;
    }
    this.imgSrc = this.photoUrl;
    this.cognitiveService.CognitiveUrl(this.photoUrl)
      .subscribe(
        data => {
          this.result = data[0].faceAttributes;
          // console.log(this.result);
        },
        error1 => {
          console.log(error1);
        }
      )
  }


  /**
   * 清空当前数据，准备下一次识别
   */
  clearNowData() {
    this.result = null;
    this.imgSrc = "./assets/imgs/logo.png";
    this.photoUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529400706&di=94dc8156d94f1fc5d6e7175dcd139b03&imgtype=jpg&er=1&src=http%3A%2F%2Fimg2.bug.cn%2Fimages%2F2017%2F07%2F02%2F73d117603ae9c521ef28f633eba4ff65.jpg';
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
