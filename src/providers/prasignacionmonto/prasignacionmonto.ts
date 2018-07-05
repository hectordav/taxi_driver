import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { RutaProvider } from '../../providers/ruta/ruta';


@Injectable()
export class PrasignacionmontoProvider {
		principal_url:string;
		variable_global: any;
		
  constructor(public http: Http,public ruta:RutaProvider) {
    this.principal_url=this.ruta.get_ruta();
  }
   /*recibo (seteo) la variable global*/
  setMyGlobalVar(value) {
    this.variable_global = value;
  }
  /*obtengo la variable global para enviarla a los controlers*/
  getMyGlobalVar() {
    return this.variable_global;
  }
    get_monto_disponible_id_taxi(_id_usuario_conductor,_token){
    var variable=JSON.stringify({id_usuario_conductor:_id_usuario_conductor,token:_token});
    var url = this.principal_url+'/asignacion_monto_taxi/get_monto_disponible_id_taxi';
    var response = this.http.post(url, variable);
    return response;
  }
  get_monto_establecido_taxi(){
    var variable=JSON.stringify({id_usuario_conductor:1,});
    var url = this.principal_url+'/asignacion_monto_taxi/get_monto_establecido_taxi';
    var response = this.http.post(url, variable);
    return response;
  }

}
