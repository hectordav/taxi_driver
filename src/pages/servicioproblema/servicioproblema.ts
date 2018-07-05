import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams,Platform,ToastController } from 'ionic-angular';
import {PrconexionProvider} from "../../providers/prconexion/prconexion";
import {Prlogin} from "../../providers/prlogin";
import {Prservicio} from "../../providers/prservicio";

@IonicPage()
@Component({
  selector: 'page-servicioproblema',
  templateUrl: 'servicioproblema.html'
})
export class ServicioproblemaPage {
	id_servicio:any;
	observacion_conductor:any;
	result:any;
  backPressed:any=false;
  loader:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public prlogin:Prlogin, public prservicio:Prservicio,public platform:Platform,private toastCtrl: ToastController, public conexion:PrconexionProvider,) {
     /*****back button*****/
     platform.registerBackButtonAction(() => {
       
         if (this.navCtrl.canGoBack()) {
          this.navCtrl.pop()
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicioproblemaPage');
  }
   cancelar_carrera(){
 		let _id_servicio:any=this.prservicio.getMyGlobalVarservicio();
    let _id_status_servicio=4;
    let _observaciones:any=this.observacion_conductor;
    let _token:any='5oJn^ixsIp~ltoEnXia^Iv[wIhiy]R0TkH6G';
    if(_observaciones=='') {
      _observaciones="ninguna";
    }
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
       this.prservicio.finalizar_carrera_problema(_id_servicio,_id_status_servicio,_observaciones,_token).subscribe(
          prservicio => {
             this.result=prservicio;
             console.log(this.result);
             this.navCtrl.setRoot('HomePage');
          },
          err => {console.log("NO EXISTE REGISTRO");
          },
      );
   }
  }

}
