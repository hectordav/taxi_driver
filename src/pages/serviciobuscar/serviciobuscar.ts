import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, AlertController,Platform } from 'ionic-angular';
import {DriverService} from '../../services/driver-service';
import {Prlogin} from "../../providers/prlogin";
import {Prservicio} from "../../providers/prservicio";
declare var google: any;
import {GoogleMapsLatLng} from 'ionic-native';


@IonicPage()
@Component({
  selector: 'page-serviciobuscar',
  templateUrl: 'serviciobuscar.html'
})
export class ServiciobuscarPage {
	result:any;
  result_2:any;
  result_distancia:any;
  public render = new google.maps.DirectionsRenderer();
  public directionsService= new google.maps.DirectionsService;
  result_3:any;
  intervalo:any;
  public driver:any;
  backPressed:any=false;
  loader:any;
  g_distancia:any;
  lat_lng_carrera:any;
  // map id
  public mapId = Math.random() + 'map';
  // map height
  public mapHeight: number = 480;
  // Map
  public map: any;
  g_latitud:any;
  g_longitud:any;
  lat_lng:any;
  distancia:any;
  constructor(public navCtrl: NavController,public driverService: DriverService,  public navParams: NavParams, public prlogin:Prlogin, public prservicio:Prservicio,public modalCtrl: ModalController, public alertCtrl: AlertController,public platform:Platform) {
    this.g_distancia=this.prservicio.get_variable_distancia_taxi_cliente();
    console.log('ready');
        setTimeout(() => {
        this.initializeMap();
        }, 2000);
    /*****back button*****/
     platform.registerBackButtonAction(() => {
       
         if (this.navCtrl.canGoBack()) {
          this.navCtrl.pop()
          return;
        }
        if(!this.backPressed) {
          this.backPressed = true
          this.navCtrl.setRoot('HomePage');
          setTimeout(() => this.backPressed = false, 2000)
          return;
        }else{
       
        }
      });
     /*/backbutton*/

  	// get driver info from service
    this.driver = driverService.getCurrentDriver();

    // show modal
    let modal = this.modalCtrl.create('ModalJobPage');

    // listen for modal close
    modal.onDidDismiss(confirm => {
      if (confirm) {
        // show confirm box
        this.confirmJob();
      } else {
    
      }
    });
  }
  initializeMap() {
   let latLng = new google.maps.LatLng(25.686614, -100.316113);
    let mapOptions = {
      center: latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false
    }

    this.map = new google.maps.Map(document.getElementById(this.mapId), mapOptions);

    // get ion-view height
    var viewHeight = window.screen.height - 44; // minus nav bar
    // get info block height
   

    // set map height = view height - info block height + booking form height
    this.mapHeight = viewHeight;

    let options = {timeout: 120000, enableHighAccuracy: true};

    // refresh map
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 300);

    // use GPS to get center position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let newLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
       
         var pinImage ="assets/img/cliente_pin.png";
        this.map.setCenter(newLatLng);
        new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          icon: pinImage,
          position: this.map.getCenter()
        });
        console.log('aqui guardo las coordenadas del cliente');
        this.g_latitud=position.coords.latitude;
        this.g_longitud=position.coords.longitude;
        let lat_lng1=this.g_latitud+','+this.g_longitud;
        this.lat_lng=lat_lng1;
        this.buscar_carreras();
      },

      (error) => {
        console.log(error);
      },
      options
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiciobuscarPage');
  }
  
   la_modal(datos_modal){
   let modal = this.modalCtrl.create('ModalJobPage');
     modal.onDidDismiss(confirm => {
     if (confirm) {
        // show confirm box
        this.confirmJob();
      } else {
        // do nothing
      }
    });
  }
 
// make array with range is n
  range(n) {
    return new Array(n);
  }


  // confirm a job
  confirmJob() {
    /*toma la variable de carrera aceptada*/
    let carrera_aceptada=this.prservicio.get_carrera_aceptada_otro_taxi();
    if(carrera_aceptada=='1') {
      /*si es aceptada no hace nada.*/
      let alert = this.alertCtrl.create({
         title: 'Info',
         subTitle: 'La carrera ya no está disponible, fue tomada por otro taxista',
         buttons: ['OK']
         });
         alert.present();
    }else{
      /*aqui pregunta si esta seguro que la toma*/
      let confirm = this.alertCtrl.create({
      title: 'Esta Seguro?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            let id_servicio:any=this.prservicio.getMyGlobalVarservicio();
            let id_status:any=1;
            let _token:any='5oJn^ixsIp~ltoEnXia^Iv[wIhiy]R0TkH6G';
                 this.prservicio.cambiar_status_servicio(id_servicio,id_status,_token).subscribe(
                    prservicio => {
                       console.log("REGISTRO EXISTE");
                    },
                    err => {console.log("NO EXISTE REGISTRO");
                    },
                );
              clearInterval(this.intervalo);
              this.navCtrl.setRoot('HomePage');
          }
        },
        {
          text: 'Si',
          handler: () => {
           let id_servicio:any=this.prservicio.getMyGlobalVarservicio();
            // go to pickup page
          console.log(id_servicio);
          
          this.navCtrl.setRoot('PickUpPage');
          }
        }
      ]
    });
    confirm.present();
    }
  }
  intevalo_buscar_carrera(){
     this.intervalo =setInterval(() => {
     this.buscar_carreras();},4000);
  }

   buscar_carreras(){
   let datos:any= this.prlogin.getMyGlobalVar();
   let _id_usuario:number=datos.json().id_usuario;
   let _token:any='5oJn^ixsIp~ltoEnXia^Iv[wIhiy]R0TkH6G';
     console.log('busca la carrera');
     clearInterval(this.intervalo);
     this.prservicio.buscar_carrera(_id_usuario,_token).subscribe(
           prservicio => {
             this.result_2=prservicio;
             console.log(prservicio);
             if(prservicio==null) {
               console.log("no hay carreras vuelve a abrir el ciclo para que no lo repita a cada rato");
               this.intevalo_buscar_carrera();
             }else{
                for(let value of this.result_2) {
                   this.lat_lng_carrera=value.lat_lng_i;
                }
                /*aqui calcula la distancia y tiempo.*/
                
                this.calcular_distancia();
             }
           },
           err => {
             console.log('no existe ninguna carrera');
           /*  clearInterval(this.intervalo);*/
           /*  console.log(err);*/
           },
       );
  }
  calcular_distancia(){
     console.log("entra en Calulcar Ruta");
    console.log("entro en calcular ruta");
    let modal = this.modalCtrl.create('ModalJobPage');
    let lat_lng_i=this.lat_lng_carrera.split(',');
    console.log(this.lat_lng);
    let lat_lng_usuario=this.lat_lng.split(',');
    let lat_i:any=parseFloat(lat_lng_i['0']);
    let lng_i:any=parseFloat(lat_lng_i['1']);
    let lat_f:any=parseFloat(lat_lng_usuario['0']);
    let lng_f:any=parseFloat(lat_lng_usuario['1']);
    let inicio=new GoogleMapsLatLng(lat_i,lng_i);
    let fin=new GoogleMapsLatLng(lat_f,lng_f);
    let panel = document.getElementById('panel'); 
    let directionsDisplay = null;
            directionsDisplay = this.render;
            /*el panel que tengo en el html OJO debe ir*/
     document.getElementById("panel").innerHTML = "";
     console.log('entro en panel');
            /*directionsDisplay.setMap(this.map);*/
            directionsDisplay.setPanel(panel);
      this.directionsService.route({
        origin: inicio,
        destination: fin,
        travelMode: google.maps.TravelMode.DRIVING
      },(response,status)=>{
        console.log('entro en response status');  
        let distance = null;
        let duration=null;
        if(status === google.maps.DirectionsStatus.OK) {
        /*este muestra la ruta marcada*/
          directionsDisplay.setDirections(response);
         let leg = response.routes[ 0 ].legs[ 0 ];
         console.log('en leg');
         console.log(leg);
        let legs = response.routes[0].legs;
        distance = legs[0].distance.text;
        duration = legs[0].duration.text;
        this.distancia=distance;
        let distancia_split=this.distancia.split(' ');
        let unidades_medida=distancia_split['1'];
        this.distancia=parseInt(distancia_split['0']);
        if(unidades_medida=="km") {
          if(this.distancia>=this.g_distancia) {
          // si la distancia es mayor 
           console.log('la distancia es mayor');
           console.log(this.distancia);
           this.intevalo_buscar_carrera();
        }else{
          console.log('es menor');
          console.log(this.g_distancia);
          console.log("si existe para el intervalo");
           clearInterval(this.intervalo);
          modal.onDidDismiss(confirm => {
            if (confirm) {
              // show confirm box
              this.confirmJob();
            } else {
            console.log('entra en el else de ignorar carrera');
            /*como ignoro la carrera, vuelve a tomar el ciclo*/
             this.intevalo_buscar_carrera();
            }
          });
          modal.present();
        }
        }else{
          console.log('la distancia en metros');
          console.log("si existe para el intervalo");
           clearInterval(this.intervalo);
          modal.onDidDismiss(confirm => {
            if (confirm) {
              // show confirm box
              this.confirmJob();
            } else {
            console.log('entra en el else de ignorar carrera');
            /*como ignoro la carrera, vuelve a tomar el ciclo*/
             this.intevalo_buscar_carrera();
            }
          });
          modal.present();

        }
        console.log('la distancia calculada');
        console.log(this.distancia);
          /* directionsDisplay.setMap(this.map);*/
        }else{
         console.log('entra en el else de ignorar carrera');
         /*como ignoro la carrera, vuelve a tomar el ciclo*/
         this.intevalo_buscar_carrera();
        } 
      }, err => {console.log(err);
        alert(err);
            },)  
  }
  volver_home(page){
		clearInterval(this.intervalo);
		console.log('popto');
		this.navCtrl.setRoot('HomePage');
  }

}
