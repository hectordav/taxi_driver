import {Component} from '@angular/core';
import {IonicPage,NavController,ToastController} from 'ionic-angular';
import {JobService} from '../../services/job-service';
import {ReportService} from '../../services/report-service';
import {Prlogin} from "../../providers/prlogin";
import {PrhistorialProvider} from "../../providers/prhistorial/prhistorial";
import {PrconexionProvider} from "../../providers/prconexion/prconexion";

@IonicPage()
@Component({
  selector: 'page-job-history',
  templateUrl: 'job-history.html'
})
export class JobHistoryPage {

  // statistic
  public stats: any;

  // list of records
  public records: any;
  result_hoy_contar:any;
  result_hoy_ver:any;
  result_fechas_contar:any;
  result_fechas_sumar:any;
  result_fechas_ver:any;
  fecha_i:any;
  fecha_f:any;
  suma:any;
  cuenta:any;

  constructor(public nav: NavController, public jobService: JobService, public reportService: ReportService,public login:Prlogin,public historial:PrhistorialProvider,private toastCtrl: ToastController, public conexion:PrconexionProvider) {
    // set report data
    this.stats = reportService.getAll();

    // set jobs
    this.records = jobService.getAll();
  }
    contar_carreras_hoy(){
    console.log('carreras hoy');
    
    let data:any=this.login.getMyGlobalVar();
    let _id_usuario:any=data.json().id_usuario;
    this.conexion.conexion();
    let status=this.login.get_variable_status_conexion();
    /*verifica si hay internet*/
        if(status=='desconectado') {
          let toast = this.toastCtrl.create({
            message: 'Verifique la conexion a internet',
            duration: 3500,
            position: 'bottom'
            });
          toast.present();
        }else{
           this.historial.contar_carreras_hoy(_id_usuario).subscribe(
              historial => {
                 console.log("si existen carreras la muestra");
                 if(historial.json().id=='null') {
                   console.log('no hay registros');
                   
                 }else{
                   this.result_hoy_contar=historial;
                 }               
              },
              err => {console.log("NO EXISTE REGISTRO");
              },
          );
        }
    }
  ver_carreras_hoy(){
    let data:any=this.login.getMyGlobalVar();
    let _id_usuario:any=data.json().id_usuario;
         this.historial.ver_carreras_hoy(_id_usuario).subscribe(
            historial => {
              this.result_hoy_ver=historial;
               console.log("REGISTRO EXISTE");
            },
            err => {console.log("NO EXISTE REGISTRO");
            },
        );
  }

  sumar_carreras_entre_fechas(){
    let data:any=this.login.getMyGlobalVar();
    let _id_usuario:any=data.json().id_usuario;
        this.conexion.conexion();
    let status=this.login.get_variable_status_conexion();
    /*verifica si hay internet*/
    if(status=='desconectado') {
      let toast = this.toastCtrl.create({
        message: 'Verifique la conexion a internet',
        duration: 3500,
        position: 'bottom'
        });
      toast.present();
    }else{
       this.historial.sumar_carreras_entre_fechas(_id_usuario,this.fecha_i,this.fecha_f).subscribe(
            historial => {
              this.result_fechas_sumar=historial;
               console.log("REGISTRO EXISTE"); 
               console.log(this.result_fechas_sumar);
                for(let sumar of this.result_fechas_sumar) {
                  this.suma=Math.round(sumar.total);
                }
                console.log(this.suma);
            },
            err => {console.log("NO EXISTE REGISTRO");
            },
        );
    }
  }
  ver_carreras_entre_fechas(){
    let data:any=this.login.getMyGlobalVar();
    let _id_usuario:any=data.json().id_usuario;
    let _fecha_i=this.fecha_i;
    let _fecha_f=this.fecha_f;
    this.conexion.conexion();
    let status=this.login.get_variable_status_conexion();
    /*verifica si hay internet*/
        if(status=='desconectado') {
          let toast = this.toastCtrl.create({
            message: 'Verifique la conexion a internet',
            duration: 3500,
            position: 'bottom'
            });
          toast.present();
        }else{
           this.historial.ver_carreras_entre_fechas(_id_usuario,_fecha_i,_fecha_f).subscribe(
              historial => {
                this.result_fechas_ver=historial;
                 console.log("REGISTRO EXISTE");
      
                this.sumar_carreras_entre_fechas();
              },
              err => {console.log("NO EXISTE REGISTRO");
              },
          );
        }

  }

}
