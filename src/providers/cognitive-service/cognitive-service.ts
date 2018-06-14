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
  CognitiveFile(dataURL: string) {
    const CognitiveApiUrl = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,emotion';
    const CognitiveHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': this.key,
      }),
      // 'processData': false,
    };

    this.http.post<any>(CognitiveApiUrl, this.makeBlob(dataURL), CognitiveHttpOptions)
      .subscribe(
        data => {
          console.log(data);
        },
        error1 => {
          console.log(error1);
        }
      )
  }

  /**
   * base64编码转换成Blob二进制代码
   * @param {string} dataURL
   * @returns {Blob}
   */
  makeBlob(dataURL: string) {
    let BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      let parts = dataURL.split(',');
      let contentType = parts[0].split(':')[1];
      let raw = decodeURIComponent(parts[1]);
      return new Blob([raw], { type: contentType });
    }
    let parts = dataURL.split(BASE64_MARKER);
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;

    let uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    console.log(uInt8Array);
    console.log(contentType);

    return new Blob([uInt8Array], { type: contentType });
  }


}
