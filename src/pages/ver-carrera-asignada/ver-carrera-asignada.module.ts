import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerCarreraAsignadaPage } from './ver-carrera-asignada';

@NgModule({
  declarations: [
    VerCarreraAsignadaPage,
  ],
  imports: [
    IonicPageModule.forChild(VerCarreraAsignadaPage),
  ],
  exports: [
    VerCarreraAsignadaPage
  ]
})
export class VerCarreraAsignadaPageModule {}
