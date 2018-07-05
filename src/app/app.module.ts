import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {SplashScreen} from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

// import services
import { Geolocation } from '@ionic-native/geolocation';
import { NativeAudio } from '@ionic-native/native-audio';
import { SmartAudio } from '../providers/smart-audio';
import { PrasignacionmontoProvider } from '../providers/prasignacionmonto/prasignacionmonto';
import { PrhistorialProvider } from '../providers/prhistorial/prhistorial';
import { Device } from '@ionic-native/device';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { PrconexionProvider } from '../providers/prconexion/prconexion';
import { Network } from '@ionic-native/network';
import {StatusBar} from '@ionic-native/status-bar';
import { PrnotificacionProvider } from '../providers/prnotificacion/prnotificacion';
import { RutaProvider } from '../providers/ruta/ruta';
import {Prlogin}from '../providers/prlogin';
import {Prservicio}from '../providers/prservicio';
import {DriverService} from '../services/driver-service';
import {JobService} from '../services/job-service';
import {ReportService} from '../services/report-service';
import {TransactionService} from '../services/transaction-service';
import { OneSignal } from '@ionic-native/onesignal';
// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.


// end import pages

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    DriverService,
    JobService,
    ReportService,
    TransactionService,
    Prlogin,
    Prservicio,
    Geolocation,
    SmartAudio,
    NativeAudio,
    PrasignacionmontoProvider,
    SplashScreen,
    PrhistorialProvider,
    Device,
    StatusBar,
    LaunchNavigator,
    PrconexionProvider,
    Network,
    PrnotificacionProvider,
    RutaProvider,
    OneSignal
    /* import services */
  ]
})
export class AppModule { }
