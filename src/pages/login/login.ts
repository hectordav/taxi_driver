import { Component } from '@angular/core';
import { IonicPage,NavController,LoadingController,AlertController,ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PrconexionProvider} from "../../providers/prconexion/prconexion";
import {Prlogin} from "../../providers/prlogin";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
   myForm: FormGroup;
   results: any;
   loader: any;
   result_serial:any;

  constructor(public nav: NavController,public prlogin:Prlogin,public fb: FormBuilder, public loadingCtrl:LoadingController, public alertCtrl: AlertController,private toastCtrl: ToastController, public conexion:PrconexionProvider) {
     this.myForm= this.fb.group({
      'email': ['', [Validators.required, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]],
      'password': ['', [Validators.required]],
    })
  }

  signup() {
    this.nav.setRoot('RegisterPage');
  }

  login() {
    let datos: any[];
    datos=this.myForm.value;
    let user: string=datos['email'];
    let pass: string=datos['password'];
    let _token_u:any='5oJn^ixsIp~ltoEnXia^Iv[wIhiy]R0TkH6G';
    let token:string=this.prlogin.getToken();
    let _serial=1;/*this.prlogin.get_serial();*/
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
       this.prlogin.login(user,pass,_token_u,_serial).subscribe(
          prlogin => {
            this.results=prlogin;
           /*  console.log(this.results);*/
           if(this.results['_body']=="null") {
            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Usuario y contraseña no validos',
              buttons: ['OK']
              });
              alert.present();          
          }else{
           if(prlogin.json().id_estado_usuario==2) {
              let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Usuario Inactivo',
              buttons: ['OK']
              });
              alert.present();
           }else{
             if(prlogin.json().id_nivel==1 || prlogin.json().id_nivel==2 || prlogin.json().id_nivel==4 || prlogin.json().id_nivel==5){
             let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Debes ser un Conductor para poder iniciar sesion',
              buttons: ['OK']
              });
              alert.present();
             }else{
               this.prlogin.setMyGlobalVar(this.results);
               /*busca si el token es el mismo por si cambia de dispositivo*/
                 this.prlogin.buscar_usuario_manual_token(user,pass,token,_token_u).subscribe(
                    prlogin => {
                      this.results=prlogin;
                       console.log("REGISTRO EXISTE");
                    },
                    err => {alert(err);
                    },
                );
              /*envia a la pagina principal*/
             this.nav.setRoot('HomePage');
             /*¨****************************/
                         this.loader.dismiss();
             }
           }
          }
        },
          err => {console.log("NO EXISTE REGISTRO");
          },
      );
    }
       /***********/
  }
}
