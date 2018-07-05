import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController} from 'ionic-angular';
import {Prlogin} from "../../providers/prlogin";
import {PrconexionProvider} from "../../providers/prconexion/prconexion";


@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {
		splash = true;
		tabBarElement: any;
		serial_device:any='undefined';
		results:any;
		loader:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public prlogin:Prlogin,public alertCtrl: AlertController,public loadingCtrl:LoadingController, public conexion:PrconexionProvider) {
  	 this.tabBarElement = document.querySelector('.tabbar');     
	   setTimeout(()=>{ this.serial();},3000);
  }

  ionViewDidLoad() {
     this.tabBarElement.style.display = 'none';
	    setTimeout(() => {
	      this.splash = false;
	      this.tabBarElement.style.display = 'flex';
	    }, 4000);
  }
   serial(){
   let id=setInterval(()=>{
    this.serial_device=this.prlogin.get_serial();
    console.log(this.serial_device);
       if(this.serial_device!=undefined) {
         clearInterval(id);
         this.login_serial();
       }
       console.log(id);
   },1000);
  }
    login_serial() {
			let _serial= this.serial_device;
      let token:string=this.prlogin.getToken();
       this.prlogin.login_serial(_serial,token).subscribe(
          prlogin => {
            this.results=prlogin;
           /*  console.log(this.results);*/
           if(this.results['_body']=="null") {
            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Equipo no registrado',
              buttons: ['OK']
              });
              alert.present();
              this.navCtrl.setRoot('LoginPage');        
          }else{
           if(prlogin.json().id_estado_usuario==2) {
              let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Usuario Inactivo',
              buttons: ['OK']
              });
              alert.present();
              this.navCtrl.setRoot('LoginPage');
           }else{
             if(prlogin.json().id_nivel==1 || prlogin.json().id_nivel==2 || prlogin.json().id_nivel==4 || prlogin.json().id_nivel==5){
             let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Debes ser un Conductor para poder iniciar sesion',
              buttons: ['OK']
              });
              alert.present();
                this.navCtrl.setRoot('LoginPage');        
             }else{
               this.presentLoading();
               this.prlogin.setMyGlobalVar(this.results);
              /*envia a la pagina principal*/
             this.navCtrl.setRoot('HomePage');
             this.loader.dismiss();
             /*¨****************************/
             }
           }
          }
        },
          err => {console.log("NO EXISTE REGISTRO");
          },
      );
       /***********/  
   
  }
   presentLoading() {
    this.loader = this.loadingCtrl.create({
        content: "Cargando..."
    });
    this.loader.present();
      }

}
