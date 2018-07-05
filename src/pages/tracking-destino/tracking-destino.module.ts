import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackingDestinoPage } from './tracking-destino';

@NgModule({
  declarations: [
    TrackingDestinoPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackingDestinoPage),
  ],
  exports: [
    TrackingDestinoPage
  ]
})
export class TrackingDestinoPageModule {}
