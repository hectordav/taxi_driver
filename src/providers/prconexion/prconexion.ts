import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Network } from '@ionic-native/network';
import {Prlogin} from "../prlogin";
import { RutaProvider } from '../../providers/ruta/ruta';

@Injectable()
export class PrconexionProvider {

  constructor(public http: Http,public network:Network,public login:Prlogin,public ruta:RutaProvider) {
    console.log('Hello PrconexionProvider Provider');
  }
  conexion(){
    let status;
    this.network.onDisconnect().subscribe(() => {
      status='desconectado';
      this.login.set_variable_status_conexion(status);
    });
    // watch network for a connection
    this.network.onConnect().subscribe(() => {
      
      status='conectado';
      this.login.set_variable_status_conexion(status);
    });
  }

}
