import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { RutaProvider } from '../providers/ruta/ruta';


@Injectable()
export class Prlogin {
	principal_url:string;
	variable_global: any;
  variable_token:any;
  variable_serial:any;
  variable_status_conexion: any; 
  constructor(public http: Http,public ruta:RutaProvider) {
     this.principal_url=this.ruta.get_ruta();
  }
  set_variable_status_conexion(value) {
    this.variable_status_conexion = value;
  }
  /*obtengo la variable global para enviarla a los controlers*/
  get_variable_status_conexion() {
    return this.variable_status_conexion;
  }
  /*recibo (seteo) la variable global*/
  setMyGlobalVar(value) {
    this.variable_global = value;
  }
  /*obtengo la variable global para enviarla a los controlers*/
  getMyGlobalVar() {
    return this.variable_global;
  }
  /*recibo (seteo) la variable global*/
  setToken(value) {
    this.variable_token = value;
  }
  /*obtengo la variable global para enviarla a los controlers*/
  getToken() {
    return this.variable_token;
  }
    /*el serial*/
  set_serial(value) {
    this.variable_serial = value;
  }
  /*obtengo el serial*/
  get_serial() {
    return this.variable_serial;
  }
  buscar_usuario_manual_token(_login,_clave,_token,_token_u){
    var variable=JSON.stringify({login:_login,clave:_clave,token:_token, token_u:_token_u});
    var url = this.principal_url+'/registro/buscar_usuario_manual_token';
    var response = this.http.post(url, variable);
    return response;
  }

  login(user,pass,_token_u,_serial){
    var variable=JSON.stringify({user:user,pass:pass, token:_token_u, serial:_serial});
    var url = this.principal_url+'/login/login';
    var response = this.http.post(url, variable);
    return response;   

  }
   get_usuario_id_usuario(_id_usuario){
    var variable=JSON.stringify({id_usuario:_id_usuario});
    var url = this.principal_url+'/login/get_usuario_id_usuario';
    var response = this.http.post(url, variable).map(res => res.json());
    return response;   
  }
  cerrar_sesion(){
    var url = this.principal_url+'/login/cerrar_sesion';
    var response = this.http.get(url);
    return response;
  }
  guardar_ubicacion(id_usuario,lat_lng,_token){
    var variable=JSON.stringify({id_usuario:id_usuario, lat_lng:lat_lng, token:_token});
    var url = this.principal_url+'/login/guardar_ubicacion';
    var response = this.http.post(url, variable);
    return response;   
  }
  login_serial(_serial,token){
    var variable=JSON.stringify({serial:_serial,token:token});
    var url = this.principal_url+'/login/login_serial';
    var response = this.http.post(url, variable);
    return response;
  }
  buscar_usuario_manual_serial(_serial,_usuario){
    var variable=JSON.stringify({serial:_serial});
    var url = this.principal_url+'/registro/buscar_usuario_manual_token';
    var response = this.http.post(url, variable);
    return response;
  }

}
