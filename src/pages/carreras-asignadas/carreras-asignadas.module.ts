import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarrerasAsignadasPage } from './carreras-asignadas';

@NgModule({
  declarations: [
    CarrerasAsignadasPage,
  ],
  imports: [
    IonicPageModule.forChild(CarrerasAsignadasPage),
  ],
  exports: [
    CarrerasAsignadasPage
  ]
})
export class CarrerasAsignadasPageModule {}
