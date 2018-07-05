import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { RutaProvider } from '../../providers/ruta/ruta';

@Injectable()
export class PrhistorialProvider {
	 variable_servicio:any;
	 principal_url:string;
  constructor(public http: Http,public ruta:RutaProvider) {
    console.log('Hello PrhistorialProvider Provider');
    this.principal_url=this.ruta.get_ruta();
  }
   setMyGlobalVarservicio(value) {
    this.variable_servicio = value;
  }
  /*obtengo la variable global para enviarla a los controlers*/
  getMyGlobalVarservicio() {
    return this.variable_servicio;
  }
  contar_carreras_hoy(_id_usuario){
    var variable=JSON.stringify({id_usuario:_id_usuario});
    var url = this.principal_url+'/historial/contar_carrera_hoy';
    var response = this.http.post(url, variable);
    return response;
  }  
  ver_carreras_hoy(_id_usuario){
    var variable=JSON.stringify({id_usuario:_id_usuario});
    var url = this.principal_url+'/historial/ver_carreras_hoy';
    var response = this.http.post(url, variable).map(res => res.json());;
    return response;
  }  
  contar_carreras_entre_fechas(_id_usuario,_fecha_i,_fecha_f){
    var variable=JSON.stringify({id_usuario:_id_usuario, fecha_i:_fecha_i,fecha_f:_fecha_f});
    var url = this.principal_url+'/historial/contar_carreras_entre_fechas';
    var response = this.http.post(url, variable).map(res => res.json());
    return response;
  } 

  ver_carreras_entre_fechas(_id_usuario,_fecha_i,_fecha_f){
    var variable=JSON.stringify({id_usuario:_id_usuario, fecha_i:_fecha_i,fecha_f:_fecha_f});
    var url = this.principal_url+'/historial/ver_carreras_entre_fechas';
    var response = this.http.post(url, variable).map(res => res.json());
    return response;
  }
    sumar_carreras_entre_fechas(_id_usuario,_fecha_i,_fecha_f){
    var variable=JSON.stringify({id_usuario:_id_usuario, fecha_i:_fecha_i,fecha_f:_fecha_f});
    var url = this.principal_url+'/historial/sumar_carreras_entre_fechas';
    var response = this.http.post(url, variable).map(res => res.json());
    return response;
  }  

}
