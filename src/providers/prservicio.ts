import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { RutaProvider } from '../providers/ruta/ruta';
/*
  Generated class for the Prservicio provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Prservicio {
	principal_url:string;
	variable_servicio:any;
	id_usuario_global:any;
  variable_lat_lng_1:any;
  variable_distancia:any;
  variable_lat_lng_2:any;
  id_servicio_global:any;
  datos_cliente:any;
  lat_lng:any;
  datos_carrera:any;
  carrera_aceptada:any;
  constructor(public http: Http,public ruta:RutaProvider) {
    console.log('Hello Prservicio Provider');
    this.principal_url=this.ruta.get_ruta();
  }
  set_variable_distancia_taxi_cliente(value){
    this.variable_distancia=value;
  }
  get_variable_distancia_taxi_cliente(){
    return this.variable_distancia;
  }
  get_carrera_aceptada_otro_taxi(){
   return this.carrera_aceptada;
  }
  set_carrera_aceptada_otro_taxi(variable){
   this.carrera_aceptada= variable;
  }
   get_datos_cliente_global(){
   return this.datos_cliente;
  }
   set_datos_cliente_global(variable){
   this.datos_cliente= variable;
  }
    /*recibo (seteo) la variable del dato de la carrera*/
  set_datos_carrera(value) {
    this.datos_carrera = value;
  }
  /*obtengo la variable la variable del dato de la carrera para enviarla a la vista*/
  get_datos_carrera() {
    return this.datos_carrera;
  } 
 
  /*recibo (seteo) la variable lat_lng 1*/
  setMyGlobalVar_lat_lng_1(value) {
    this.variable_lat_lng_1 = value;
  }
  /*obtengo la variable lat_lng 1 para enviarla a los controlers*/
  getMyGlobalVar_lat_lng_1() {
    return this.variable_lat_lng_1;
  }
  /*recibo (seteo) la variable lat_lng 2*/
  setMyGlobalVar_lat_lng_2(value) {
    this.variable_lat_lng_2 = value;
  }
  /*obtengo la variable lat_lng 2 para enviarla a los controlers*/
  getMyGlobalVar_lat_lng_2() {
    return this.variable_lat_lng_2;
  }

   /*recibo (seteo) la variable global*/
  setMyGlobalVarservicio(value) {
    this.variable_servicio = value;
  }
  /*obtengo la variable global para enviarla a los controlers*/
  getMyGlobalVarservicio() {
    return this.variable_servicio;
  }
  /*recibo (seteo) la variable global*/
  set_id_usuario_global(value) {
    this.id_usuario_global = value;
  }
  /*obtengo la variable global para enviarla a los controlers*/
  get_id_usuario_global() {
    return this.id_usuario_global;
  }
  set_lat_lng(value){
     this.lat_lng = value;  
  }
  get_lat_lng() {
    return this.lat_lng;
  }

   get_distancia_taxi_cliente(){
    var variable=JSON.stringify({id_usuario:1});
    var url = this.principal_url+'/conductores/get_distancia_taxi_cliente';
    var response = this.http.post(url, variable).map(res => res.json());
    return response;
  }
  buscar_carrera_id_servicio(_id_servicio){
    var variable=JSON.stringify({id_servicio:_id_servicio});
    var url = this.principal_url+'/servicio/buscar_carrera_id_servicio';
    var response = this.http.post(url, variable) .map(res => res.json());
    return response;
  }
  cambiar_status_servicio(_id_servicio,_id_status_servicio,_token){
    var variable=JSON.stringify({id_servicio:_id_servicio, id_status_servicio:_id_status_servicio,token:_token});
    var url = this.principal_url+'/servicio/cambiar_status_servicio';
    var response = this.http.post(url, variable);
    return response;
  }
  guardar_calculo_distancia(_id_servicio,_distancia){
    var variable_2=JSON.stringify({id_servicio:_id_servicio, distancia:_distancia});
      var url = this.principal_url+'/servicio/guardar_calculo_distancia';
      /*si quiero obtener el valor debo agregar el .map(res => res.json())*/
      var response = this.http.post(url,variable_2);
      return response;
    }
  cambiar_status_servicio_resta_monto_taxi(_id_servicio,_id_status_servicio,_id_usuario_conductor,_token){
    var variable=JSON.stringify({id_servicio:_id_servicio, id_status_servicio:_id_status_servicio, id_usuario_conductor:_id_usuario_conductor,token:_token});
    var url = this.principal_url+'/servicio/cambiar_status_servicio_resta_monto_taxi';
    var response = this.http.post(url, variable);
    return response;
  }
  guardar_inicia_carrera(_id_servicio,_inicio_lat_lng,_token){
    var variable=JSON.stringify({id_servicio:_id_servicio, inicio_lat_lng:_inicio_lat_lng, token:_token});
    var url = this.principal_url+'/servicio/guardar_inicia_carrera';
    var response = this.http.post(url, variable);
    return response;
  }
  buscar_carrera(_id_usuario,_token){
    var variable=JSON.stringify({id_usuario:_id_usuario,token:_token});
    var url = this.principal_url+'/servicio/buscar_carreras_para_taxista';
    var response = this.http.post(url, variable).map(res => res.json());
    return response;
  }
  buscar_carreras(_id_usuario,_token){
    var variable=JSON.stringify({id_usuario:_id_usuario, token:_token});
    var url = this.principal_url+'/servicio/buscar_carreras_para_taxista';
    var response = this.http.post(url, variable).map(res => res.json());
    return response;
  }
  ignorar_carrera(_id_usuario,_id_servicio,_token){  
    var variable=JSON.stringify({id_usuario:_id_usuario, id_servicio:_id_servicio, token:_token});
    var url = this.principal_url+'/servicio/ignorar_carrera';
    var response = this.http.post(url, variable).map(res => res.json());
    return response;
  }
  aceptar_carrera(_id_usuario,_id_servicio,_monto,_token){  
    var variable=JSON.stringify({id_usuario:_id_usuario, id_servicio:_id_servicio, monto:_monto,token:_token});
    var url = this.principal_url+'/servicio/aceptar_carrera_taxi';
    var response = this.http.post(url, variable).map(res => res.json());
    return response;
  }
  get_datos_cliente_id_servicio(_id_servicio,_token){
    var variable= JSON.stringify({id_servicio:_id_servicio, token:_token});
    var url = this.principal_url+'/servicio/get_datos_cliente_id_servicio';
    var response = this.http.post(url, variable).map(res => res.json());
    return response; 
  }
   get_datos_cliente_id_servicio_2(_id_servicio,_token){
    var variable= JSON.stringify({id_servicio:_id_servicio, token:_token});
    var url = this.principal_url+'/servicio/get_datos_cliente_id_servicio';
    var response = this.http.post(url, variable).map(res => res.json());
    return response; 
  }
  push_estoy_aqui(_id_usuario_cliente){
    var variable= JSON.stringify({id_usuario_cliente:_id_usuario_cliente});
    var url = this.principal_url+'/push_cliente/push_estoy_aqui';
    var response = this.http.post(url, variable).map(res => res.json());
    return response; 
  }
   push_aceptar_carrera(_id_usuario_cliente){
    var variable= JSON.stringify({id_usuario_cliente:_id_usuario_cliente});
    var url = this.principal_url+'/push_cliente/push_aceptar_carrera';
    var response = this.http.post(url, variable).map(res => res.json());
    return response; 
  }
    usuario_cancela_carrera(id_servicio){
    var variable= JSON.stringify({id_servicio:id_servicio});
    var url = this.principal_url+'/servicio/usuario_cancela_carrera';
    var response = this.http.post(url, variable).map(res => res.json());
    return response; 
  }
 
  finalizar_carrera_problema(_id_servicio,_id_status_servicio,_observaciones,_token){  
    var variable=JSON.stringify({id_servicio:_id_servicio, id_status_servicio:_id_status_servicio, observaciones:_observaciones,token:_token});
    var url = this.principal_url+'/servicio/finalizar_carrera_problema';
    var response = this.http.post(url, variable).map(res => res.json());
    return response;
  }
   finalizar_carrera_2(_id_servicio,_id_status_servicio,_observacion_conductor,_token){
    var variable=JSON.stringify({id_servicio:_id_servicio, observaciones:_observacion_conductor,id_status_servicio:_id_status_servicio, token:_token,});
    var url = this.principal_url+'/servicio/finalizar_carrera_2';
    var response = this.http.post(url, variable).map(res => res.json());
    return response;
  }
   finalizar_carrera(_id_servicio,_distancia,_id_status_servicio,_token){
    var variable=JSON.stringify({id_servicio:_id_servicio, distancia:_distancia,id_status_servicio:_id_status_servicio, token:_token});
    var url = this.principal_url+'/servicio/finalizar_carrera';
    var response = this.http.post(url, variable);
    return response;
  }
  buscar_carreras_x_central(_id_usuario, _id_tipo_servicio,_token){
    var variable=JSON.stringify({id_usuario:_id_usuario, id_tipo_servicio:_id_tipo_servicio,token:_token});
    var url = this.principal_url+'/servicio/buscar_carreras_x_central';
    var response = this.http.post(url, variable);
    return response;
  }
  buscar_carreras_x_central_2(_id_usuario, _id_tipo_servicio,_token){
    var variable=JSON.stringify({id_usuario:_id_usuario, id_tipo_servicio:_id_tipo_servicio,token:_token});
    var url = this.principal_url+'/servicio/buscar_carreras_x_central_2';
    var response = this.http.post(url, variable).map(res => res.json());
    return response;
  }
  enviar_mensaje_central(_id_usuario, _mensaje){
    var variable=JSON.stringify({id_usuario:_id_usuario, mensaje:_mensaje});
    var url = this.principal_url+'/push_secretaria/push_enviar_mensaje_secretaria';
    var response = this.http.post(url, variable).map(res => res.json());
    return response;
  }
  get_puntaje_driver(_id_usuario_contrata,_token){
   var variable= JSON.stringify({id_usuario_contrata:_id_usuario_contrata, token:_token});
   var url = this.principal_url+'/puntaje_comentarios/get_puntaje_driver_driver';
   var response = this.http.post(url, variable).map(res => res.json());
    return response; 
  }
  get_ubicacion_destino(id_servicio,_token){
    var variable= JSON.stringify({id_servicio:id_servicio,token:_token});
    var url = this.principal_url+'/servicio/get_ubicacion_destino';
   /*no debe tener json porque sino dara error ya que no lo estoy enviando a la vista ojo*/
    var response = this.http.post(url, variable);
    return response;
  }
  get_ubicacion_destino_2(id_servicio,_token){
    var variable= JSON.stringify({id_servicio:id_servicio,token:_token});
    var url = this.principal_url+'/servicio/get_ubicacion_destino';
   /*no debe tener json porque sino dara error ya que no lo estoy enviando a la vista ojo*/
    var response = this.http.post(url, variable);
    return response;
  }
  get_ubicacion_taxista(_id_usuario_taxista,_token){
    var variable= JSON.stringify({id_usuario:_id_usuario_taxista,token:_token});
    var url = this.principal_url+'/servicio/ubicacion_taxista';
   /*no debe tener json porque sino dara error ya que no lo estoy enviando a la vista ojo*/
    var response = this.http.post(url, variable);
    return response;
  }
  

}
