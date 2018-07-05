import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Platform } from 'ionic-angular';
import {Prlogin} from "../../providers/prlogin";
import {Prservicio} from "../../providers/prservicio";

@IonicPage()
@Component({
  selector: 'page-detallefincarrera',
  templateUrl: 'detallefincarrera.html',
})
export class DetallefincarreraPage {
	result:any={
    id_servicio:'',
    desde:'',
    hasta:'',
    hora_i:'',
    hora_f:'',
    distancia:'',
    monto:''
  };
	observacion_conductor:any='Ninguna';
  backPressed:any=false;
  loader:any;

  constructor(public nav: NavController, public navParams: NavParams,public prlogin:Prlogin, public prservicio:Prservicio,public alertCtrl:AlertController,public platform: Platform) {
      /*****back button*****/
     platform.registerBackButtonAction(() => {
       
         if (this.nav.canGoBack()) {
          this.nav.pop()
          return;
        }
        if(!this.backPressed) {
          this.backPressed = true
          this.cancelar_solicitud_taxi();
          setTimeout(() => this.backPressed = false, 2000)
          return;
        }else{
       
        }
      });
     /*/backbutton*/
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallefincarreraPage');
    this.datos_carrera();
  }
     cancelar_solicitud_taxi(){
      this.loader= this.alertCtrl.create({
             title: 'Confirmar',
          message: 'Ya a llegado a su destino, desea Salir a Home sin dejar un comentario?',
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
                  this.nav.push('HomePage');
              }
            }
          ]
         });
      this.loader.present();
  }
    datos_carrera(){
      let datos_carrera=this.prservicio.get_datos_carrera();
      for(let value of datos_carrera) {
      this.result.id_servicio=value.id_servicio;
      this.result.desde=value.desde;
      this.result.hasta=value.hasta;
      this.result.hora_i=value.hora_i;
      this.result.hora_f=value.hora_f;
      this.result.distancia=value.distancia;
      this.result.monto=value.monto;
      }
    }
  finalizar_carrera(){
  	let _id_servicio:any=this.prservicio.getMyGlobalVarservicio();
  	let _id_status_servicio=6;
    let _token:any='5oJn^ixsIp~ltoEnXia^Iv[wIhiy]R0TkH6G';
  	let _observacion_conductor=this.observacion_conductor;
  		this.prservicio.finalizar_carrera_2(_id_servicio,_id_status_servicio,_observacion_conductor,_token).subscribe(
  			prservicio => {
  	     this.result=prservicio;
  	        console.log("guardo la finalizacion de carrera y lo manda al home");
  	        
  	        this.nav.setRoot('HomePage');
  	        },
  	        err => {console.log("NO EXISTE REGISTRO");
  	        },
  	    );
  }

}
