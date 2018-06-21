import { NgModule } from '@angular/core';
import { ReportDataComponent } from './report-data/report-data';
import {IonicModule} from "ionic-angular";
@NgModule({
	declarations: [
    ReportDataComponent
  ],
	imports: [
    IonicModule,   // 需要使用ionic的UI组件库
  ],
	exports: [
    ReportDataComponent,
  ]
})
export class ComponentsModule {}
