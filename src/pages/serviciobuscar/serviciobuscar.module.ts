import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiciobuscarPage } from './serviciobuscar';

@NgModule({
  declarations: [
    ServiciobuscarPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiciobuscarPage)
  ],
  exports: [
    ServiciobuscarPage
  ]
})
export class ServiciobuscarPageModule {}