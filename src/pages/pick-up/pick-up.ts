import {Component} from '@angular/core';
import {IonicPage,NavController,NavParams, LoadingController,AlertController,Platform,ToastController} from 'ionic-angular';
import {Prlogin} from "../../providers/prlogin";
import {Prservicio} from "../../providers/prservicio";
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import {PrconexionProvider} from "../../providers/prconexion/prconexion";
import 'rxjs/add/operator/map'

@IonicPage()
@Component({
  selector: 'page-pick-up',
  templateUrl: 'pick-up.html'
})
export class PickUpPage {
  // job info
  public job: any;
  id_servicio:any;
  result:any;
  g_latitud:any;
  g_longitud:any;
  result_2:any;
  intervalo:any;
  intervalo_2:any;
  result_3:any;
  result_4:any;
  backPressed:any=false;
  loader:any;
  notas:any;
  result_5:any;
  result_ubicacion:any;
  g_latitud_i:any;
  g_longitud_i:any;  
  g_latitud_f:any;    
  g_longitud_f:any;  
  address_i:any;        
  address_f:any;        
  direccion:any;
  g_latitud_taxi:any;
  g_longitud_taxi:any;
  buttonDisabled:boolean=true;
  result_push_aceptar_carrera:any;
  result_cancela_carrera:any;
  intervalo_cancela_carrera:any;

  constructor(public nav: NavController, public navParams: NavParams,public prlogin:Prlogin, public prservicio:Prservicio,public loadingCtrl:LoadingController, public alertCtrl: AlertController,public platform:Platform,private launchNavigator: LaunchNavigator,private toastCtrl: ToastController, public conexion:PrconexionProvider) {
    this.intevalo_usuario_cancela_carrera();
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
  }
  intevalo_usuario_cancela_carrera(){
      this.intervalo_cancela_carrera=setInterval(()=>{
       this.usuario_cancela_carrera();
     },3000);
  }
   ionViewDidLoad() {
   this.datos_carrera();
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
  /*el ma´paaaa*/
  cargar_ubicacion(){
     if (navigator.geolocation) {
      var options = {
        enableHighAccuracy: true
      };
      navigator.geolocation.getCurrentPosition(position=> {
        console.info('using navigator');
         this.g_latitud=position.coords.latitude;
         this.g_longitud=position.coords.longitude;
         this.g_latitud_taxi=this.g_latitud;
         this.g_longitud_taxi=this.g_longitud;
         this.buttonDisabled=null;
         this.guardar_ubicacion_taxista();
         this.ubicacion_destino();
      }, error => {
        console.log(error);
      }, options);
    }else{
      console.log('un error');
    }
  }

  guardar_ubicacion_taxista(){
    let datos:any=this.prlogin.getMyGlobalVar();
    let id_usuario:any=datos.json().id_usuario;
    let _lat_lng:any=this.g_latitud+','+ this.g_longitud;
    let _token:any='5oJn^ixsIp~ltoEnXia^Iv[wIhiy]R0TkH6G';
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
      this.prlogin.guardar_ubicacion(id_usuario,_lat_lng,_token).subscribe(
         prlogin => {
           this.result_2=prlogin;
            console.log("ubicacion guardada");
         },
         err => {console.log(err);
         ;
         },
       );
    }
  }
    datos_carrera(){
    let id_servicio:any=this.prservicio.getMyGlobalVarservicio();
    let _token:any='5oJn^ixsIp~ltoEnXia^Iv[wIhiy]R0TkH6G';
     this.prservicio.get_datos_cliente_id_servicio(id_servicio,_token).subscribe(
        prservicio => {
          this.result=prservicio;
           console.log("REGISTRO EXISTE");
           console.log(this.result);
        this.prservicio.set_datos_cliente_global(this.result);
/*
        this.push_aceptar_carrera();*/
        },
        err => {console.log("NO EXISTE REGISTRO");
        },
    );
  }
  push_aceptar_carrera(){
   let id_usuario_cliente;
   for(let value of this.result) {
     id_usuario_cliente=value.id_usuario_cliente;
   }  
   this.prservicio.push_aceptar_carrera(id_usuario_cliente).subscribe(
      prservicio => {
        this.result_push_aceptar_carrera=prservicio;
         console.log("envia el push");
      },
      err => {console.log("NO EXISTE REGISTRO");
      },
    );
  }
  usuario_cancela_carrera(){
    console.log('para el intevalo de cancelar carrera');
    clearInterval(this.intervalo_cancela_carrera);
    this.id_servicio=this.prservicio.getMyGlobalVarservicio();
    let id_status;
     this.prservicio.usuario_cancela_carrera(this.id_servicio).subscribe(
        prservicio => {
          this.result_cancela_carrera=prservicio;
            for(let value of this.result_cancela_carrera) {
               id_status=value.id_status_servicio;
            }
           if(id_status=='5') {
             let alert = this.alertCtrl.create({
               title: 'titulo',
               subTitle: 'El Cliente canceló la carrera',
               buttons: ['OK']
               });
             clearInterval(this.intervalo_cancela_carrera);
             clearInterval(this.intervalo_2);
               alert.present();
               this.nav.setRoot('HomePage');
           }else{
             console.log('vuelve a abrir el intervalo de cancelar carrera');
             this.intevalo_usuario_cancela_carrera();
           }
       
        },
        err => {console.log("NO EXISTE REGISTRO");
        },
      );
  }
  estoy_aqui(item){
    console.log('entra en estoy aqui');
     let _id_usuario_cliente:any=item['id_usuario_cliente'];
     console.log(_id_usuario_cliente);
     this.prservicio.set_id_usuario_global(_id_usuario_cliente);
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
      this.prservicio.push_estoy_aqui(_id_usuario_cliente).subscribe(
         prservicio => {
           this.result_2=prservicio;
            console.log("REGISTRO EXISTE");
         },
         err => {console.log("NO EXISTE REGISTRO");
         },
     );
     let alert = this.alertCtrl.create({
      title: 'Notificacion',
      subTitle: 'Notificacion enviada al cliente',
      buttons: ['OK']
      });
      alert.present();
    }
  }
recoger_cliente(item){
  clearInterval(this.intervalo);
  clearInterval(this.intervalo_2);
  clearInterval( this.intervalo_cancela_carrera);
  /*el dato del taxista*/
  let datos:any=this.prlogin.getMyGlobalVar();
  let _id_usuario_conductor:any=datos.json().id_usuario;
  /*********************/
  let _id_servicio:any=item['id_servicio'];
  let _id_status_servicio:any=3;
  let _id_usuario_cliente:any=item['id_usuario_cliente'];
  let _token:any='5oJn^ixsIp~ltoEnXia^Iv[wIhiy]R0TkH6G';
   this.prservicio.set_id_usuario_global(_id_usuario_cliente);
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
     this.prservicio.cambiar_status_servicio_resta_monto_taxi(_id_servicio,_id_status_servicio,_id_usuario_conductor,_token).subscribe(
          prservicio => {
            this.result_3=prservicio;
            if(prservicio.json().id=='el monto es menor') {
               let alert = this.alertCtrl.create({
               title: 'Notificacion',
               subTitle: 'El monto disponible es menor a la resta de asignacion de pago',
               buttons: ['OK']
               });
               alert.present();          
            }else{
             /*aqui guarda donde recoje al cliente*/
             let _lat_lng:any=this.g_latitud+','+ this.g_longitud;
             this.prservicio.guardar_inicia_carrera(_id_servicio,_lat_lng,_token).subscribe(
                prservicio => {
                  this.result_4=prservicio;
                   console.log("REGISTRO EXISTE");
                },
                err => {console.log("NO EXISTE REGISTRO");
                },
            );
             this.prservicio.setMyGlobalVar_lat_lng_1(_lat_lng);
               /*muestra la pantalla de recoger cliente*/
              this.nav.setRoot('PickOffPage');
            }
          },
          err => {console.log("NO EXISTE REGISTRO");},
      );
    }
}
cancelar_carrera(){
 console.log('entra en cancelar carrera');

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
                 clearInterval(this.intervalo);
                 clearInterval(this.intervalo_2);
                 clearInterval(this.intervalo_cancela_carrera);
                 this.nav.setRoot('ServicioproblemaPage');
              }
            }
          ]
         });
      this.loader.present();

}

  // pick off
  pickup() {
    this.nav.setRoot('PickOffPage');
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
   abrir_mapa_ruta_cliente() {
    let fin=this.g_latitud_i+','+this.g_longitud_i; /*este es la ubicacion del cliente*/
    let inicio=this.g_latitud_taxi+','+this.g_longitud_taxi;
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
}
