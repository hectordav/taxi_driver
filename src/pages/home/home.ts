import {Component} from '@angular/core';
import {IonicPage,NavController, ModalController, AlertController,Platform,ToastController} from 'ionic-angular';
import {DriverService} from '../../services/driver-service';
import {Prlogin} from "../../providers/prlogin";
import {PrasignacionmontoProvider} from "../../providers/prasignacionmonto/prasignacionmonto";
import {Prservicio} from "../../providers/prservicio";
import {PrconexionProvider} from "../../providers/prconexion/prconexion";
import { Geolocation } from '@ionic-native/geolocation';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // driver info
  public driver:any;
  buttonDisabled:boolean=true;
  intervalo:any;
  g_latitud:any;
  g_longitud:any;
  result_2:any;
  result_3:any;
  monto_asignado:any;
  datos_taxi_nombre:any;
  datos_taxi_cedula:any;
  datos_taxi_id_usuario:any;
  backPressed:any=false;
  loader:any;
  result_4:any;
  notas:any;
  result_5:any;
  result_puntaje:any;
  puntaje_obtenido:any=0;
  valor_result:any;
  result_monto_estableciso:any;
  monto_establecido:any;
  result_distancia:any;

  constructor(public nav: NavController, public driverService: DriverService, public modalCtrl: ModalController,public alertCtrl: AlertController,public geolocation: Geolocation,public prlogin:Prlogin, public pr_asignacion_monto:PrasignacionmontoProvider,public platform: Platform, public servicio:Prservicio,private toastCtrl: ToastController, public conexion:PrconexionProvider) {
     this.intervalo=setInterval(() => {
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
       },3000);
     this.monto_establecido_taxi();
     this.buscar_monto_disponible();
     this.datos_taxista();
    // get driver info from service
    this.driver = driverService.getCurrentDriver();
     /*****back button*****/
     platform.registerBackButtonAction(() => {
       
         if (this.nav.canGoBack()) {
          this.nav.pop()
          return;
        }
        if(!this.backPressed) {
          this.backPressed = true
          this.salir_sistema();
          setTimeout(() => this.backPressed = false, 2000)
          return;
        }else{
       
        }
      });
     /*/backbutton*/
     /*aqui va buscar carreras asignadas por la central*/
     /*this.buscar_carreras_asignadas_x_central();*/
     this.get_puntaje_driver();
     this.distancia_taxi_cliente();
  }
    distancia_taxi_cliente(){
     this.servicio.get_distancia_taxi_cliente().subscribe(
        servicio => {
          this.result_distancia=servicio;
           let distancia=this.result_distancia.distancia;
           console.log('la distancia '+distancia);
           this.servicio.set_variable_distancia_taxi_cliente(distancia);
        },
        err => {console.log("NO EXISTE REGISTRO");
        },
    );
  }
    salir_sistema(){
          this.loader= this.alertCtrl.create({
             title: 'Confirmar',
          message: 'Esta accion cerrará el sistema, desea continuar?',
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
                 this.platform.exitApp();
              }
            }
          ]
         });
      this.loader.present();  
   
  }
  buscar_carreras_asignadas_x_central(){
     let datos=this.prlogin.getMyGlobalVar();
     let _id_usuario=datos.json().id_usuario;
     let _id_tipo_servicio='6';
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
        
       this.servicio.buscar_carreras_x_central(_id_usuario, _id_tipo_servicio,_token).subscribe(
             servicio => {
               this.result_4=servicio;
               console.log("REGISTRO EXISTE");
               console.log('si hay carreras');
               console.log(servicio);
               if(servicio.json().id=='si existe') {
                this.loader= this.alertCtrl.create({
             title: 'Notificacion',
              message: 'tiene una carrera asignada por la central, desea ir a carreras asignadas?',
              buttons: [
                {
                  text: 'Si',
                  handler: () => {
                      this.nav.setRoot('CarrerasAsignadasPage');
                  }
                },
                {
                  text: 'No',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                }
          ]
         });
      this.loader.present();
               }else{
               }
             },
             err => {console.log("NO EXISTE REGISTRO");
             },
         );
        }
  }
  datos_taxista(){
     let datos=this.prlogin.getMyGlobalVar();
     this.datos_taxi_nombre=datos.json().nombre;
     this.datos_taxi_cedula=datos.json().cedula_cliente;
     this.datos_taxi_id_usuario=datos.json().id_usuario;
  }
  /*el ma´paaaa*/
  cargar_ubicacion(){
     if (navigator.geolocation) {
      let options = {timeout: 120000, enableHighAccuracy: true};
      navigator.geolocation.getCurrentPosition(position=> {
        console.info('using navigator');
         this.g_latitud=position.coords.latitude;
         this.g_longitud=position.coords.longitude;
         this.guardar_ubicacion_taxista();
        /* alert(navigator.geolocation);*/
      }, error => {
      /*  alert(error);*/
      }, options);
    }else{
      
      console.log('un error');
    }
  }
  monto_establecido_taxi(){
    
  }
  buscar_monto_disponible(){
   let datos:any=this.prlogin.getMyGlobalVar();
   let _id_usuario_conductor:any=datos.json().id_usuario;
   let _token:any='5oJn^ixsIp~ltoEnXia^Iv[wIhiy]R0TkH6G';
       this.pr_asignacion_monto.get_monto_disponible_id_taxi(_id_usuario_conductor,_token).subscribe(
          pr_asignacion_monto => {
            this.result_3=pr_asignacion_monto;
             console.log("REGISTRO EXISTE");
             console.log(pr_asignacion_monto);
             this.monto_asignado=pr_asignacion_monto.json().monto;
        /*busca el monto establecido*/
        this.pr_asignacion_monto.get_monto_establecido_taxi().subscribe(
        pr_asignacion_monto => {
          this.result_monto_estableciso=pr_asignacion_monto;
           console.log("REGISTRO EXISTE");
          this.monto_establecido=pr_asignacion_monto.json().monto_establecido;
           this.comparar_monto();
        },
        err => {console.log("NO EXISTE REGISTRO");
        },
    );
          },
          err => {console.log("NO EXISTE REGISTRO");
          },
      );
  }
  /*compara si el monto es mayor al monto establecido*/
  comparar_monto(){
    let monto_a:number=JSON.parse(this.monto_asignado);
    let monto_e:number=JSON.parse(this.monto_establecido);
    if(monto_a<monto_e) {
               let alert = this.alertCtrl.create({
                 title: 'Notificacion',
                 subTitle: 'Monto disponible menor o igual al monto establecido, no puede hacer carreras',
                 buttons: ['OK']
                 });
                 alert.present(); 
             }else{
               let alert = this.alertCtrl.create({
                 title: 'Notificacion',
                 subTitle: 'Monto disponible '+this.monto_asignado,
                 buttons: ['OK']
                 });
                 alert.present();
             }
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
     this.servicio.enviar_mensaje_central(_id_usuario,_mensaje).subscribe(
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
  }
    guardar_ubicacion_taxista(){
    let datos:any=this.prlogin.getMyGlobalVar();
    let id_usuario:any=datos.json().id_usuario;
    let lat_lng=this.g_latitud+','+this.g_longitud;
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
      this.prlogin.guardar_ubicacion(id_usuario,lat_lng,_token).subscribe(
         prlogin => {
           this.result_2=prlogin;
            console.log("ubicacion guardada");
            this.buttonDisabled=null;
         },
         err => {console.log(err);
           alert(err);
         },
     ); 
    }
  }
/*************/

  // make array with range is n
  range(n) {
    return new Array(n);
  }


   buscar_carreras(){
    let monto_a:number=JSON.parse(this.monto_asignado);
    let monto_e:number=JSON.parse(this.monto_establecido);
   if(monto_a<monto_e) {
      let alert = this.alertCtrl.create({
           title: 'Notificacion',
           subTitle: 'Monto disponible menor o igual al monto establecido, no puede hacer carreras',
           buttons: ['OK']
           });
           alert.present(); 
   }else{
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
     clearInterval(this.intervalo);
     this.nav.push('ServiciobuscarPage');   
    }
   }    
  }
 get_puntaje_driver(){
  let data:any=this.prlogin.getMyGlobalVar();
   /*el id usuario del que crea la carrera*/
  let _id_usuario:any=data.json().id_usuario;
  let _token:any='5oJn^ixsIp~ltoEnXia^Iv[wIhiy]R0TkH6G';
  console.log('el id usuario');
  console.log(_id_usuario);
       this.servicio.get_puntaje_driver(_id_usuario,_token).subscribe(
          prservicio => {
            this.result_puntaje=prservicio;
            console.log('el puntaje');
            console.log(this.result_puntaje);
            this.valor_result=this.result_puntaje;
            if(this.result_puntaje=='no hay datos disponibles') {
              console.log('entro en el if');
            this.result_puntaje.valor=0.0;
            this.get_puntaje_driver_2(this.result_puntaje);
            this.puntaje_obtenido=0; 
            console.log(this.puntaje_obtenido);
            }else{
              console.log('en el else');
             this.get_puntaje_driver_2(this.result_puntaje);
             console.log("REGISTRO EXISTE");
            }
            
          },
          err => {console.log("NO EXISTE REGISTRO");
          },
      );
      
    }  
/*esto viene del get_puntaje_driver*/
  get_puntaje_driver_2(valor){
    for (let valorpuntaje of valor) {
     let valor_1= valorpuntaje.puntaje.split('.');
     console.log('el valor puntaje');
     console.log('algo'+valor_1[0]);
     if(valor_1[0]=='1') {
      this.puntaje_obtenido=1;
     }
     if(valor_1[0]=='2') {
      this.puntaje_obtenido=2;
     }
     if(valor_1[0]=='3') {
      this.puntaje_obtenido=3;
     }
     if(valor_1[0]=='4') {
      this.puntaje_obtenido=4;
     }
     if(valor_1[0]=='5') {
      this.puntaje_obtenido=5;
     }
    }
    console.log('el valor puntaje');
    console.log(this.puntaje_obtenido);
  }


}
