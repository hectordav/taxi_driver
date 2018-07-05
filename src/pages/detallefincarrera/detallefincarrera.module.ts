import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallefincarreraPage } from './detallefincarrera';

@NgModule({
  declarations: [
    DetallefincarreraPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallefincarreraPage),
  ],
  exports: [
    DetallefincarreraPage
  ]
})
export class DetallefincarreraPageModule {}
