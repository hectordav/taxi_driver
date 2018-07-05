import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicioproblemaPage } from './servicioproblema';

@NgModule({
  declarations: [
    ServicioproblemaPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicioproblemaPage)
  ],
  exports: [
    ServicioproblemaPage
  ]
})
export class ServicioproblemaPageModule {}