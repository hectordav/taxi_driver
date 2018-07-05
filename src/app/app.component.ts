import {Component} from '@angular/core';
import {Config,Platform,App,AlertController,LoadingController} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar';
// import page
import { SmartAudio } from '../providers/smart-audio';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';
import { OneSignal } from '@ionic-native/onesignal';
/*providers*/
import {Prlogin} from "../providers/prlogin";
declare var cordova:any;


@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {
  public rootPage:any;
  public nav:any;
  backPressed:any=false;
  loader:any;
  serial_device:any;

  public pages = [
    {
      title: 'Home',
      icon: 'ios-home-outline',
      count: 0,
      component: 'HomePage'
    },
    {
      title: 'Carreras asignadas',
      icon: 'ios-pin',
      count: 0,
      component: 'CarrerasAsignadasPage'
    },
    {
      title: 'Historial',
      icon: 'md-search',
      count: 0,
      component: 'JobHistoryPage'
    },
    {
      title: 'Logout',
      icon: 'md-exit',
      count: 0,
      component: 'LoginPage'
    }
  ];

   constructor(public platform: Platform, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen,public oneSignal: OneSignal, public device:Device, public alertCtrl:AlertController, public login:Prlogin, public loadingCtrl:LoadingController,public smartAudio: SmartAudio) {
    platform.ready().then(() => {
      /*la parte del smart audio*/
      smartAudio.preload('tabSwitch', 'assets/audio/campanita.mp3');
      /* cordova.plugins.backgroundMode.setDefaults({ 
           title: 'TaxSi', 
           text: 'Esta activa en segundo plano',
           icon:'assets/img/logo.png'
          },
        cordova.plugins.backgroundMode.enable()
       )*/
       /*************************/
          /*****back button*****/
     platform.registerBackButtonAction(() => {
         if (this.nav.canGoBack()) {
          this.nav.pop()
          return;
        }
        if(!this.backPressed) {
          this.backPressed = true
          this.presentLoading();
          setTimeout(() => this.backPressed = false, 2000)
          return;
        }else{
         this.platform.exitApp();
        }
      });
     /*/backbutton*/
      this.rootPage = 'LoginPage';
       if (platform.is('cordova')) {
           // Okay, so the platform is ready and our plugins are available.
           // Here you can do any higher level native things you might need.
           this.statusBar.styleDefault();
           this.splashScreen.hide();
           this.notificaciones();
         } else {
            /*no hace nada por esta en la web*/
         }
    });
  }
    presentLoading() {
       this.loader= this.alertCtrl.create({
             title: 'Confirmar',
          message: 'Realmente desea Salir',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Salir',
              handler: () => {
                  this.platform.exitApp();
              }
            }
          ]
         });
      this.loader.present();  
    }
   private notificaciones(){
    this.serial_device=this.device.uuid;
    this.oneSignal.startInit('9a9b857d-e44a-4694-9a16-1ffd08d42f44', '867070417969'); //(appId_onesignal,googleProjectNumber)
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationOpened()
  .subscribe(jsonData => {
    let alert = this.alertCtrl.create({
      title: jsonData.notification.payload.title,
      subTitle: jsonData.notification.payload.body,
      buttons: ['OK']
    });
    alert.present();
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  });
  this.oneSignal.endInit();
  this.presentLoading_carga();
  this.oneSignal.getIds().then((id)=>{
    let el_id=id.userId; /*el id para guardarlo en el token de la base de datos*/
    this.login.setToken(el_id);
    this.serial_device=this.device.uuid; /* el serial del dispositivo*/
    this.login.set_serial(this.serial_device+'1');
    this.loader.dismiss();
  })
  }
  presentLoading_carga() {
      this.loader = this.loadingCtrl.create({
          content: "Cargando..."
      });
      this.loader.present();
   }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
