import { NgModule } from '@angular/core';
import { ReportDataComponent } from './report-data/report-data';
import { EmotionTestComponent } from './emotion-test/emotion-test';
import { SimilarComponent } from './similar/similar';
import {IonicModule} from "ionic-angular";
@NgModule({
	declarations: [
    ReportDataComponent,
    EmotionTestComponent,
    SimilarComponent
  ],
	imports: [
    IonicModule,   // 需要使用ionic的UI组件库
  ],
	exports: [
    ReportDataComponent,
    EmotionTestComponent,
    SimilarComponent
  ]
})
export class ComponentsModule {}
