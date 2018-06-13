import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  private formData: FormData;
  private result: FaceAttributes;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              private cognitiveService: CognitiveServiceProvider) {
    this.clearNowData();
  }

  ionViewDidLoad() {

  }

  /**
   * 打开摄像头
   */
  openCamera() {
    const options: CameraOptions = {
      quality: 90,                                                   //相片质量 0 -100
      destinationType: this.camera.DestinationType.DATA_URL,        //DATA_URL 是 base64   FILE_URL 是文件路径
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,                                       //是否保存到相册
      // sourceType: this.camera.PictureSourceType.CAMERA ,         //是打开相机拍照还是打开相册选择  PHOTOLIBRARY : 相册选择, CAMERA : 拍照,
    };

    this.camera.getPicture(options).then((imageData) => {
      console.log("got file: " + imageData);

      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imgSrc = base64Image;
      console.log("base64Image: " + base64Image);

      this.formData = new FormData();
      //convertBase64UrlToBlob函数是将base64编码转换为Blob
      //append函数的第一个参数是后台获取数据的参数名,和html标签的input的name属性功能相同
      this.formData.append("photo",this.convertBase64UrlToBlob(base64Image));


      //If it's file URI
      // this.path = imageData;

      this.uploadFile();

    }, (err) => {
      // Handle error
    });
  }


  /**
   * 上传Url
   */
  uploadUrl() {
    if (this.photoUrl === "") {
      alert('请输入需要识别的图片URL！');
      return;
    }
    this.imgSrc = this.photoUrl;
    this.cognitiveService.CognitiveUrl(this.photoUrl)
      .subscribe(
        data => {
          this.result = data[0].faceAttributes;
          console.log(this.result);
        },
        error1 => {
          console.log(error1);
        }
      )
  }

  /**
   * 上传File
   */
  uploadFile(){

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
   * 以base64的图片url数据转换为Blob
   * @param urlData
   * @returns {Blob}
   */
  convertBase64UrlToBlob(urlData) {
    let bytes = window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte

    //处理异常,将ascii码小于0的转换为大于0
    let ab = new ArrayBuffer(bytes.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }

    return new Blob([ab], {type: 'image/png'});
  }

}
