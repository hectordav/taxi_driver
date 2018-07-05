import { Injectable } from '@angular/core';
import {AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PrnotificacionProvider {

  constructor(public http: Http,public alertCtrl: AlertController) {
    console.log('Hello PrnotificacionProvider Provider');
  }

}
