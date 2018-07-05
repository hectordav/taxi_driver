import {Component} from '@angular/core';
import {IonicPage,NavController, AlertController,Platform,ToastController} from 'ionic-angular';
import {PrconexionProvider} from "../../providers/prconexion/prconexion";
import {JobService} from '../../services/job-service';
import {Prlogin} from "../../providers/prlogin";
import {Prservicio} from "../../providers/prservicio";
import {GoogleMapsLatLng} from 'ionic-native';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

declare var google;
import 'rxjs/add/operator/map'

@IonicPage()
@Component({
  selector: 'page-pick-off',
  templateUrl: 'pick-off.html'
})
export class PickOffPage {
  // job info
  public job: any;
  result:any;
  result_2:any;
  g_latitud_i:any;
  g_longitud_i:any;
  g_latitud_taxi:any;
  g_longitud_taxi:any;
  g_latitud_f:any;
  g_longitud_f:any;
  intervalo_2:any;
  g_lat_lng_inicio:any;
  g_lat_lng_fin:any;
  distancia:any;
  duracion:any;
  directionsService:any;
  backPressed:any=false;
  loader:any;
  notas:any;
  result_5:any;
  result_ubicacion:any;
  address_i:any;
  address_f:any;
  direccion:any;
  buttonDisabled:boolean=true;
  result_finalizar:any;
  result_calculo_distancia:any;
  result_datos_carrera:any;
  intervalo_calculo_distancia:any;
  /*esto es temporal*/
  lat_i:any;
  lng_i:any;
  lat_f:any;
  lng_f:any;
  /******************/

  public render = new google.maps.DirectionsRenderer();
  constructor(public nav: NavController, public jobService: JobService, public alertCtrl: AlertController, public prlogin:Prlogin, public prservicio:Prservicio,public platform:Platform,private launchNavigator: LaunchNavigator,private toastCtrl: ToastController, public conexion:PrconexionProvider) {
    // get job info from service
    this.job = jobService.getItem(1);
     platform.ready().then(() => {

      this.directionsService= new google.maps.DirectionsService();
    });
       /*****back button*****/
     platform.registerBackButtonAction(() => {
         if (this.nav.canGoBack()) {
          this.nav.pop()
          return;
        }
        if(!this.backPressed) {
          this.backPressed = true
          this.cancelar_carrera();
          setTimeout(() => this.backPressed = false, 2000)
          return;
        }else{
        }
      });
     /*/backbutton*/
     setTimeout(()=>{this.calculo_taximetro()},1000);
  }
  ionViewDidLoad(){
    this.get_datos_cliente_id_servicio();
     this.intervalo_2=setInterval(() => {
     this.conexion.conexion();
     let status=this.prlogin.get_variable_status_conexion();
    /*verifica si hay internet*/
      if(status=='desconectado') {
        let toast = this.toastCtrl.create({
          message: 'Verifique la conexion a internet',
          duration: 3500,
          position: 'bottom'
          });
        toast.present();
      }else{
       this.cargar_ubicacion();
      }
    }, 7000);
  }
   /****************notas ala central****************/
  mensaje_central() {
    let prompt = this.alertCtrl.create({
      title: 'Enviar Mensaje a Central',
      message: "",
      inputs: [
        {
          name: 'note',
          placeholder: 'Escriba su mensaje'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            this.notas=data;
            console.log(data);
            this.fn_enviar_mensaje_central();
          }
        }
      ]
    });
   prompt.present();
  };
 fn_enviar_mensaje_central(){
   let datos:any=this.prlogin.getMyGlobalVar();
   let _id_usuario:any=datos.json().id_usuario;
   let _mensaje:any=this.notas.note;
     this.prservicio.enviar_mensaje_central(_id_usuario,_mensaje).subscribe(
         prservicio => {
           this.result_5=prservicio;
            console.log("REGISTRO EXISTE");
             let alert = this.alertCtrl.create({
              title: 'Mensaje a Central',
              subTitle: 'Mensaje Enviado',
              buttons: ['OK']
              });
              alert.present();  
              },
              err => {console.log("NO EXISTE REGISTRO");
              },
          );
  }
   cargar_ubicacion(){
     if (navigator.geolocation) {
      var options = {
        enableHighAccuracy: true
      };
      navigator.geolocation.getCurrentPosition(position=> {
        console.info('using navigator');
         this.g_latitud_taxi=position.coords.latitude;
         this.g_longitud_taxi=position.coords.longitude;
         this.buttonDisabled=null;
      }, error => {
        console.log(error);
      }, options);
    }else{
      console.log('un error');
    }
  }
  cancelar_carrera(){
      this.loader= this.alertCtrl.create({
             title: 'Confirmar',
          message: 'Esta accion cancelara la carrera en curso, desea continuar?',
          buttons: [
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Si',
              handler: () => {
                  this.nav.setRoot('ServicioproblemaPage');
              }
            }
          ]
         });
      this.loader.present();
  }

  get_datos_cliente_id_servicio(){
    let _id_servicio:any=this.prservicio.getMyGlobalVarservicio();
    let _token:any='5oJn^ixsIp~ltoEnXia^Iv[wIhiy]R0TkH6G';
         this.prservicio.get_datos_cliente_id_servicio(_id_servicio,_token).subscribe(
            prservicio => {
              this.result=prservicio;
               console.log("REGISTRO EXISTE");
               this.ubicacion_destino();
            },
            err => {console.log("NO EXISTE REGISTRO");
            },
        );
  }
   calculo_distancia_tiempo_transcurrido(item){
      let _id_usuario_cliente:any=item['id_usuario_cliente'];
       this.prservicio.set_id_usuario_global(_id_usuario_cliente);
       /*this.prservicio.calculo_tiempo_transcurrido(_id_servicio).subscribe(
            prservicio => {
              this.result=prservicio;
               console.log("REGISTRO EXISTE");
            },
            err => {console.log("NO EXISTE REGISTRO");
            },
        );*/
      this.nav.setRoot('ServiciofinPage');
  }


  // show payment popup
  showPayment() {
    let prompt = this.alertCtrl.create({
      title: 'Total (cash):',
      message: '<h1>$2.5</h1>',
      buttons: [
        {
          text: 'OK',
          handler: data => {
            // comeback to home page
            this.nav.setRoot('HomePage');
          }
        }
      ]
    });

    prompt.present();
  }
  ubicacion_destino(){
          this.result_ubicacion=this.result;
           console.log("REGISTRO EXISTE");
           console.log(this.result_ubicacion);
           let lat_lng_f;
           let lat_lng_i;
           for(let algo of this.result_ubicacion){
             lat_lng_i=algo.lat_lng_i.split(',');
             lat_lng_f=algo.lat_lng_f.split(',');
             this.g_latitud_i=lat_lng_i[0];
             this.g_longitud_i=lat_lng_i[1];
             this.g_latitud_f=lat_lng_f[0];
             this.g_longitud_f=lat_lng_f[1];
             this.address_i=algo.desde;
             this.address_f=algo.hasta;
             this.direccion=this.g_latitud_i+','+this.g_longitud_i;
           }       
  }
  calculo_taximetro(){
    let lat_taxi_i=null;
    let lng_taxi_i=null;
    let lat_taxi_f=null;
    let lng_taxi_f=null;
    let _id_servicio:any=this.prservicio.getMyGlobalVarservicio();
    this.intervalo_calculo_distancia=setInterval(()=>{
      if(lat_taxi_i==null && lng_taxi_i==null) {
         /*busca la ubicacion*/
         if (navigator.geolocation) {
        var options = {
        enableHighAccuracy: true
         };
        navigator.geolocation.getCurrentPosition(position=> {
        console.info('using navigator');
           this.g_latitud_taxi=position.coords.latitude;
           this.g_longitud_taxi=position.coords.longitude;
           this.buttonDisabled=null;
           lat_taxi_i=parseFloat(this.g_latitud_taxi);
           lng_taxi_i=parseFloat(this.g_longitud_taxi);
        }, error => {
          console.log(error);
        }, options);
    }else{
      console.log('un error');
    }
    /*¨**************/
      }else{
        /*aqui toma el valor de la ubicacion inicial para el calculo  luego debe tomar el valor del final y asignarselo al inicio para que haga siempre el ciclo*/
            /*busca la ubicacion*/
         if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position=> {
            console.info('using navigator');
               this.g_latitud_taxi=position.coords.latitude;
               this.g_longitud_taxi=position.coords.longitude;
               this.buttonDisabled=null;
               lat_taxi_f=parseFloat(this.g_latitud_taxi);
               lng_taxi_f=parseFloat(this.g_longitud_taxi);
            }, error => {
              console.log(error);
            }, options);
          }else{
            console.log('un error');
          }
          /*aqui calcula la distancia*/
           let inicio= new GoogleMapsLatLng(lat_taxi_i,lng_taxi_i);
           let fin= new GoogleMapsLatLng(lat_taxi_f,lng_taxi_f);
          
            let directionsDisplay = null;
            directionsDisplay = this.render;
            /*el panel que tengo en el html OJO debe ir*/
            document.getElementById("panel").innerHTML = "";
             console.log('entro en panel');
            this.directionsService.route({
                origin: inicio,
                destination: fin,
                travelMode: google.maps.TravelMode.DRIVING
              },(response,status)=>{
                console.log('entro en response status');  
                let distance = null;
                let duration=null;
                if(status == google.maps.DirectionsStatus.OK) {
                 let leg = response.routes[ 0 ].legs[ 0 ];
                 console.log('en leg');
                 console.log(leg);
                let legs = response.routes[0].legs;
                distance = legs[0].distance.text;
                duration = legs[0].duration.text;
                this.distancia=distance;
                this.duracion=duration;
                console.log('la distancia'); 
                console.log(this.distancia);
                console.log(this.duracion);
                this.conexion.conexion();
                let lat_lng_i=lat_taxi_i+','+lng_taxi_i;
                let lat_lng_f=lat_taxi_f+','+lng_taxi_f;
                console.log('las distancias lat long inicio y fin');
                
                console.log(lat_lng_i);
                console.log(lat_lng_f);
                
                if(lat_lng_i!=lat_lng_f) {

                  console.log('son differentes');
                  
                    this.prservicio.guardar_calculo_distancia(_id_servicio,this.distancia).subscribe(
                       prservicio => {
                         this.result_calculo_distancia=prservicio;
                         console.log("REGISTRO EXISTE");
                    /***********************************************/
                    /*le da el valor final al incio para que recalcule*/
                        lat_taxi_i=lat_taxi_f;
                        lng_taxi_i=lng_taxi_f;
                    /************************************************/

                    /*aqui calculo el kilometraje del carro*/
                    
                    /***************************************/
                       },
                       err => {console.log(err+" NO EXISTE REGISTRO");
                       },
                   );    
                }     
             /*   }   */

                  /* directionsDisplay.setMap(this.map);*/
                }else{
                  console.log(status);
                  console.log('no va pal baile');
                } 
              }, err => {console.log(err);
                alert(err);
               },)
          }
          /***************************/
    },10000);

  }
  /*aqui calcula la distancia y la ruta sin mostrarlo en el mapa*/
  calcular_distancia_ruta_finalizar_carrera(item){
    console.log("entro en calcular_distancia_ruta");
    let _id_servicio:any=item['id_servicio'];
    let _id_status_servicio='6';
    this.g_lat_lng_inicio=this.prservicio.getMyGlobalVar_lat_lng_1();
    let lat_inicio:any=parseFloat(this.g_latitud_i);
    let lng_inicio:any=parseFloat(this.g_longitud_i);
    let _token:any='5oJn^ixsIp~ltoEnXia^Iv[wIhiy]R0TkH6G';
    let lat_fin:any=parseFloat(this.g_latitud_f);
    let lng_fin:any=parseFloat(this.g_longitud_f);
    let inicio= new GoogleMapsLatLng(lat_inicio,lng_inicio);
    let fin= new GoogleMapsLatLng(lat_fin,lng_fin);
 
 
    let directionsDisplay = null;
            directionsDisplay = this.render;
            /*el panel que tengo en el html OJO debe ir*/
     document.getElementById("panel").innerHTML = "";
     console.log('entro en panel');
            /*directionsDisplay.setMap(this.map);*/
            /*aqui muestro la direccion detallada*/

         /*   console.log(this.direccion_panel);*/
         /*   directionsDisplay.setPanel(panel);*/
    this.directionsService.route({
        origin: inicio,
        destination: fin,
        travelMode: google.maps.TravelMode.DRIVING
      },(response,status)=>{
        console.log('entro en response status');  
        let distance = null;
        let duration=null;
        if(status == google.maps.DirectionsStatus.OK) {
         let leg = response.routes[ 0 ].legs[ 0 ];
         console.log('en leg');
         console.log(leg);
        let legs = response.routes[0].legs;
        distance = legs[0].distance.text;
        duration = legs[0].duration.text;
        this.distancia=distance;
        this.duracion=duration;
        console.log('la distancia'); 
        console.log(this.distancia);
        console.log(this.duracion);
        this.conexion.conexion();
        let status=this.prlogin.get_variable_status_conexion();
    /*verifica si hay internet*/
        if(status=='desconectado') {
          let toast = this.toastCtrl.create({
            message: 'Verifique la conexion a internet',
            duration: 3500,
            position: 'bottom'
            });
          toast.present();
        }else{
            this.prservicio.finalizar_carrera(_id_servicio,this.distancia,_id_status_servicio,_token).subscribe(
               prservicio => {
                 this.result_finalizar=prservicio;
                 console.log("REGISTRO EXISTE");
            /***********************************************/
             this.datos_carrera();
            /************************************************/
                 clearInterval(this.intervalo_2);
               },
               err => {console.log("NO EXISTE REGISTRO");
               },
           );      
        }   

          /* directionsDisplay.setMap(this.map);*/
        }else{
          console.log(status);
          console.log('no va pal baile');
        } 
      }, err => {console.log(err);
        alert(err);
       },)
  }
  abrir_mapa() {

      this.conexion.conexion();
      let status=this.prlogin.get_variable_status_conexion();
    /*verifica si hay internet*/
      if(status=='desconectado') {
        let toast = this.toastCtrl.create({
          message: 'Verifique la conexion a internet',
          duration: 3500,
          position: 'bottom'
          });
        toast.present();
      }else{
        let inicio=this.g_latitud_i+','+this.g_longitud_i;
        let fin= (this.g_latitud_f + ',' + this.g_longitud_f);
        let options: LaunchNavigatorOptions = {
          start: inicio
        };
        this.launchNavigator.navigate(fin, options)
        .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator'+ error)
      );
     }
  }
  /*para enviarlo al detalle fin carrera y agilizar la parte de la carga*/
  datos_carrera(){
    let id_servicio:any=this.prservicio.getMyGlobalVarservicio();
    let _token:any='5oJn^ixsIp~ltoEnXia^Iv[wIhiy]R0TkH6G';
     this.prservicio.get_datos_cliente_id_servicio(id_servicio,_token).subscribe(
        prservicio => {
          this.result_datos_carrera=prservicio;
           console.log("REGISTRO EXISTE");
           console.log(this.result_datos_carrera);
           this.prservicio.set_datos_carrera(this.result_datos_carrera);
           clearInterval(this.intervalo_calculo_distancia);
           this.nav.setRoot('DetallefincarreraPage');
        },
        err => {console.log("NO EXISTE REGISTRO");
        },
    );
  }
 
}
