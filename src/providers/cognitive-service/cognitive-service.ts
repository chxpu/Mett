import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ResponseData} from "../../entity/ResponseData";


@Injectable()
export class CognitiveServiceProvider {
  private key: string;

  constructor(public http: HttpClient) {
    // console.log('Hello CognitiveServiceProvider Provider');
    this.key = 'd8678645a47341e1bdb2659b9ad55672';
  }


  /**
   * 上传图片url，调用认知服务
   * @param {string} photoUrl
   * @returns {Observable<ResponseData>}
   * @constructor
   */
  CognitiveUrl(photoUrl: string) {
    const CognitiveApiUrl = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,emotion';
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
  CognitiveFile(octetStream: any) {
    const CognitiveApiUrl = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,emotion';
    const CognitiveHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': this.key
      }),
    };
    // let CognitiveBody = {
    //   formdata
    // };
    this.http.post<any>(CognitiveApiUrl, octetStream, CognitiveHttpOptions)
      .subscribe(
        data => {
          console.log(data);
        },
        error1 => {
          console.log(error1);
        }
      )
  }


}
