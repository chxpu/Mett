import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {DetectResponseData} from "../../entity/DetectResponseData";
import {SimilarResponseData} from "../../entity/SimilarResponseData";


@Injectable()
export class CognitiveServiceProvider {
  private key: string;

  constructor(public http: HttpClient) {
      this.key = 'c093ad68cef643a68ae5792633c09688';
  }


  /**
   * 上传图片url，调用认知服务
   * @param {string} photoUrl
   * @returns {Observable<DetectResponseData>}
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
    return this.http.post<DetectResponseData>(CognitiveApiUrl, CognitiveBody, CognitiveHttpOptions)
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
   * 调用Azure认知服务-检测人脸相似度API
   * @param {string} faceId
   * @param {string} faceIds
   * @returns {Observable<Array<SimilarResponseData>>}
   */
  findSimilar(faceId: string, faceIds: string) {
    const similarUrl = 'https://api.cognitive.azure.cn/face/v1.0/findsimilars';
    const similarHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': this.key,
      }),
    };
    let similarBody = {
      "faceId": faceId,
      "faceIds": [faceIds]
    };
    return this.http.post<Array<SimilarResponseData>>(similarUrl, similarBody, similarHttpOptions);
  }


  /**
   * 上传每次训练的记录到后台
   * @constructor
   */
  SaveRecord() {
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
