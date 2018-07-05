import {Component} from '@angular/core';
import {IonicPage,ViewController,NavController,AlertController,Platform} from 'ionic-angular';
import {Prlogin} from "../../providers/prlogin";
import {Prservicio} from "../../providers/prservicio";
import { SmartAudio } from '../../providers/smart-audio';

@IonicPage()
@Component({
  selector: 'page-modal-job',
  templateUrl: 'modal-job.html'
})
export class ModalJobPage {
  // job info
  public job: any;

  // remaining time for countdown
  public remainingTime = 20;
  result:any;
  result_2:any;
  result_buscar:any;
  monto:number;
  interval:any;
  music:any;
  backPressed:any=false;
  loader:any;

  constructor(public viewCtrl: ViewController, public prlogin:Prlogin, public prservicio:Prservicio, public nav:NavController, public alertctrl:AlertController,public smartAudio: SmartAudio,public platform: Platform) {
    this.countDown();
    this.buscar_carreras();
    this.efecto_sonido();
      /*****back button*****/
     platform.registerBackButtonAction(() => {
       
         if (this.nav.canGoBack()) {
          this.nav.pop()
          return;
        }
        if(!this.backPressed) {
          this.backPressed = true
          this.viewCtrl.dismiss();;
          setTimeout(() => this.backPressed = false, 2000)
          return;
        }else{
        }
      });
     /*/backbutton*/
  }

  // close modal
  close() {
    this.viewCtrl.dismiss();
     this.nav.setRoot('ServiciobuscarPage');
  }
   /*el llamado del efecto*/
   efecto_sonido() {
     console.log('sono sono sono me llaman del bar de Moe');
        this.smartAudio.play('tabSwitch');
    }
   buscar_carreras(){
   let datos:any= this.prlogin.getMyGlobalVar()
   let _id_usuario:number=datos.json().id_usuario;
   let _token:any='5oJn^ixsIp~ltoEnXia^Iv[wIhiy]R0TkH6G';
        this.prservicio.buscar_carreras(_id_usuario,_token).subscribe(
           prservicio => {
             this.result=prservicio;
             console.log(this.result);
          },
           err => {console.log(err);
           },
       );
  }

  ignorar_carrera(item){
   let datos:any= this.prlogin.getMyGlobalVar();
   let _id_usuario:number=datos.json().id_usuario;
   let _id_servicio:number=item['id_servicio'];
   let _token:any='5oJn^ixsIp~ltoEnXia^Iv[wIhiy]R0TkH6G';
        this.prservicio.ignorar_carrera(_id_usuario,_id_servicio,_token).subscribe(
           prservicio => {
             this.result=prservicio;
           },
           err => {console.log(err);
           },
       );
    clearInterval(this.interval);
    this.viewCtrl.dismiss();
  }

  // count down
  countDown() {
    let interval = setInterval(() => {
      this.remainingTime--;
      // if time is over
      if (this.remainingTime == 0) {
        // stop interval
        clearInterval(interval)
        this.viewCtrl.dismiss();
      }
    }, 1000);
  }

  accept(item) {
    let data:any=this.prlogin.getMyGlobalVar();
    let id_usuario:number=data.json().id_usuario;
    let id_servicio:number=item['id_servicio'];
    let _token:any='5oJn^ixsIp~ltoEnXia^Iv[wIhiy]R0TkH6G';
    let _monto:number=this.monto;
    /*busca la carrera si ya otro taxista la tomó*/
      this.prservicio.buscar_carrera_id_servicio(id_servicio).subscribe(
         prservicio => {
           let carrera;
           this.result_buscar=prservicio;
           /*si ya la tomó envia una variable a prservicio con status 1*/
            if(this.result_buscar=='carrera aceptada') {
               this.prservicio.set_carrera_aceptada_otro_taxi(1);
               clearInterval(this.interval);
               this.viewCtrl.dismiss(true);
            }else{
              /*si no lo ha tomado envia una variable a prservicio con status 0*/
              carrera='0';
              this.prservicio.set_carrera_aceptada_otro_taxi(0);
              this.prservicio.aceptar_carrera(id_usuario,id_servicio,_monto,_token).subscribe(
              prservicio => {
                this.result_2=prservicio;
              },
                err => {console.log(err);},
              );
             this.prservicio.setMyGlobalVarservicio(id_servicio);
             clearInterval(this.interval);
             this.viewCtrl.dismiss(true);

            }
        
         },
         err => {console.log("NO EXISTE REGISTRO");
         },
       );




     
  }
}
