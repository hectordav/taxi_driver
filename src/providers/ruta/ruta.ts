import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RutaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RutaProvider {
  principal_url:string='http://taxsi.mx/taxi_rest_pedro';
  constructor(public http: Http) {
    console.log('Hello RutaProvider Provider');
  }
   get_ruta() {
    return this.principal_url;
  }

}
