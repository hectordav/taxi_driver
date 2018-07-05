import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalJobPage } from './modal-job';

@NgModule({
  declarations: [
    ModalJobPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalJobPage)
  ],
  exports: [
    ModalJobPage
  ]
})
export class ModalJobPageModule {}