import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickOffPage } from './pick-off';

@NgModule({
  declarations: [
    PickOffPage,
  ],
  imports: [
    IonicPageModule.forChild(PickOffPage)
  ],
  exports: [
    PickOffPage
  ]
})
export class PickOffPageModule {}