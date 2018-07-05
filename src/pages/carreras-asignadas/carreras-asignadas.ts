import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,AlertController,ToastController } from 'ionic-angular';
import {Prlogin} from "../../providers/prlogin";
import {Prservicio} from "../../providers/prservicio";
import {PrconexionProvider} from "../../providers/prconexion/prconexion";

@IonicPage()
@Component({
  selector: 'page-carreras-asignadas',
  templateUrl: 'carreras-asignadas.html',
})
export class CarrerasAsignadasPage {
	result:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public prlogin:Prlogin,public servicio:Prservicio, public modalCtrl:ModalController, public alertCtrl:AlertController,private toastCtrl: ToastController, public conexion:PrconexionProvider){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarrerasAsignadasPage');
    this.buscar_carreras_asignadas_x_central();
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
     		 this.servicio.buscar_carreras_x_central_2(_id_usuario,_id_tipo_servicio,_token).subscribe(
             servicio => {
               this.result=servicio;
                console.log("REGISTRO EXISTE");
             },
             err => {console.log("NO EXISTE REGISTRO");
             },
         );
       }
  }
    alert_aceptar_carrera(item) {
     let _id_servicio:any=item.id_servicio;
     let confirm = this.alertCtrl.create({
      title: 'Desea Aceptar esta carrera?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
           this.aceptar_carrera(_id_servicio);
          }
        },
        {
          text: 'Ingorar',
          handler: () => {
          this.ignorar_carrera(_id_servicio);
          this.buscar_carreras_asignadas_x_central();
          }
        }
      ]
    });
    confirm.present();
  }
   ignorar_carrera(item){
 
   let _id_servicio:number=item;
   let _id_status_servicio='4';
   console.log('el id servicio de ignorar carrera');
   console.log(_id_servicio);
   let _token:any='5oJn^ixsIp~ltoEnXia^Iv[wIhiy]R0TkH6G';
         this.servicio.cambiar_status_servicio(_id_servicio,_id_status_servicio,_token).subscribe(
           prservicio => {
             this.result=prservicio;
           },
           err => {console.log(err);
           },
       );
 /*   clearInterval(this.interval);
    this.viewCtrl.dismiss();*/
  }
  aceptar_carrera(item){
   let datos:any= this.prlogin.getMyGlobalVar();
   let _id_usuario:number=datos.json().id_usuario;
   let _id_servicio:number=item;
   let _monto=0;
     let _token:any='5oJn^ixsIp~ltoEnXia^Iv[wIhiy]R0TkH6G';
   this.servicio.aceptar_carrera(_id_usuario,_id_servicio,_monto,_token).subscribe(
        prservicio => {
        this.servicio.setMyGlobalVarservicio(_id_servicio);
        this.navCtrl.setRoot('PickUpPage');
        },
        err => {console.log(err);
        },
    );
   
  }
  
}
