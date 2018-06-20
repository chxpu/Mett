import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
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
              private toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {
    this.clearNowData();
  }

  ionViewDidLoad() {
  }

  /**
   * 识别文件
   * @param {boolean} sourceFlag true打开相机，false打开相册
   */
  uploadFile(sourceFlag: boolean) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: '识别中...'
    });
    this.photoUrl = '';
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
      this.imgSrc = base64Image;
      // console.log("base64Image: " + base64Image);

      //If it's file URI
      // this.imgSrc = imageData;

      this.result = null;
      loading.present();
      this.cognitiveService.CognitiveFile(base64Image)
        .subscribe(
          data => {
            loading.dismiss();
            if (data.length == 0) {
              this.showToast('未检测到人脸，请重试！', 2500, 'top','');
              return;
            }
            this.result = data[0].faceAttributes;
          },
          error1 => {
            loading.dismiss();
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
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: '识别中...'
    });
    this.result = null;
    if (this.photoUrl === "") {
      this.showToast('请输入需要识别的图片URL！', 2500, 'top','');
      return;
    }
    this.imgSrc = this.photoUrl;
    loading.present();
    this.cognitiveService.CognitiveUrl(this.photoUrl)
      .subscribe(
        data => {
          loading.dismiss();
          this.result = data[0].faceAttributes;
          // console.log(this.result);
        },
        error1 => {
          loading.dismiss();
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
    this.photoUrl = 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1648199628,421704929&fm=27&gp=0.jpg';
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
