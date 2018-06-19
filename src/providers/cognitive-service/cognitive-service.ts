import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ResponseData} from "../../entity/ResponseData";


@Injectable()
export class CognitiveServiceProvider {
  private key: string;

  constructor(public http: HttpClient) {
    // console.log('Hello CognitiveServiceProvider Provider');
      this.key = 'c093ad68cef643a68ae5792633c09688';
  }


  /**
   * 上传图片url，调用认知服务
   * @param {string} photoUrl
   * @returns {Observable<ResponseData>}
   * @constructor
   */
  CognitiveUrl(photoUrl: string) {
    const CognitiveApiUrl = 'https://api.cognitive.azure.cn/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,emotion';
    const CognitiveHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': this.key
      }),
    };
    let CognitiveBody = {
      'url': photoUrl
    };
    return this.http.post<ResponseData>(CognitiveApiUrl, CognitiveBody, CognitiveHttpOptions)
  }

  /**
   * 上传图片FormData，调用认知服务
   * @param {string} base64code
   * @constructor
   */
  CognitiveFile(dataURL: string) {
    const CognitiveApiUrl = 'https://api.cognitive.azure.cn/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,emotion';
    const CognitiveHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': this.key,
      }),
    };

    return this.http.post<any>(CognitiveApiUrl, this.dataURLtoBlob(dataURL), CognitiveHttpOptions)
  }

  /**
   * base64编码转换成Blob二进制代码
   * @param {string} dataURL
   * @returns {Blob}
   */
  dataURLtoBlob(dataurl: string) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    // console.log(u8arr);
    return new Blob([u8arr], {type: mime} );
  }


}
