import { Component } from '@angular/core';


@Component({
  selector: 'similar',
  templateUrl: 'similar.html'
})
export class SimilarComponent {

  constructor() {
  }

  /**
   * 设置图片，1为上面，2为下面的第二张
   * @param {number} Num
   */
  setPhoto(Num: number) {
    alert('选择了第 '+ Num +' 张图片');
  }

}
