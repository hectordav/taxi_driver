import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Platform,ToastController } from 'ionic-angular';
import {PrconexionProvider} from "../../providers/prconexion/prconexion";
import {Prlogin} from "../../providers/prlogin";
import {Prservicio} from "../../providers/prservicio";
import {GoogleMapsLatLng} from 'ionic-native';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-tracking-destino',
  templateUrl: 'tracking-destino.html',
})
export class TrackingDestinoPage {
	public driver:any;
  // map
  public map:any;
  public directionsService= new google.maps.DirectionsService;
  public my_route:any;
  public render = new google.maps.DirectionsRenderer();
  public showForm: boolean = false;
  ruta:boolean=false;
  public showModalBg: boolean = false;
  public result:any;
  datos_taxista:any;
  lat_tax:any;
  lng_tax:any;
  lat_usuario:any;
  lng_usuario:any;
  pinA:any;
  pinB=[];
  intervalo:any;
  intervalo_2:any;
  distancia:any;
  duracion:any;
  result_2:any;
  backPressed:any=false;
  loader:any;
  result_g:any;
  result4:any;
  direccion_panel;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform,public alertCtrl: AlertController, public login:Prlogin, public servicio:Prservicio,private toastCtrl: ToastController, public conexion:PrconexionProvider,) {
  /*	this.datos_taxista=this.servicio.get_datos_taxista_global();
  */ 
    // when platform ready, init map
    platform.ready().then(() => {
      // init map
       setTimeout(() => {
        this.initializeMap();
        }, 2000);
    });
      /*****back button*****/
     platform.registerBackButtonAction(() => {
         if (this.navCtrl.canGoBack()) {
          this.navCtrl.pop()
          return;
        }
        if(!this.backPressed) {
          this.backPressed = true
          this.regreso_driver();
          setTimeout(() => this.backPressed = false, 2000)
          return;
        }else{
        
        }
      });
     /*/backbutton*/

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingDestinoPage');
  }
    initializeMap() {
    let latLng = new google.maps.LatLng(21.0318202, 105.8495298);
    let mapOptions = {
      center: latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false
    }

    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // get ion-view height
/*    var viewHeight = window.screen.height - 66; // minus nav bar
*/    // get info block height
 /*   var infoHeight = document.getElementsByClassName('tracking-info')[0].scrollHeight;
*/
   /* this.mapHeight = viewHeight - infoHeight;*/

    let options = {timeout: 120000, enableHighAccuracy: true};

    navigator.geolocation.getCurrentPosition(
      (position) => {
        let newLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.map.setCenter(newLatLng);
       /* new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: this.map.getCenter()
        });*/
      },

      (error) => {
        console.log(error);
      }, options
    );

    // refresh map
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 300);
     this.intervalo=setInterval(() => {
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
        this.calcular_ruta();
      }
    }, 7000);
      this.intervalo_2=setInterval(() => {
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
          this.calcular_direccion();
        }
      }, 7000);
  }

calcular_ruta(){
    console.log("entra en Calulcar Ruta");
    let data:any=this.login.getMyGlobalVar();
    let id_usuario=data.json().id_usuario;
    let id_servicio:any=this.servicio.getMyGlobalVarservicio();
    let _token:any='5oJn^ixsIp~ltoEnXia^Iv[wIhiy]R0TkH6G';
    console.log("sacando el dato");
    console.log(id_usuario);
      this.servicio.get_ubicacion_destino(id_servicio,_token).subscribe(
            servicio => {
              this.result=servicio;
               console.log("REGISTRO EXISTE");
            /*  let items = servicio.json();*/
              console.log("guarda el result en latlng");
              this.servicio.set_lat_lng(this.result);
               let datos_2:any=this.servicio.get_lat_lng();
                console.log('lat');
                this.lat_usuario=datos_2.json().lat;
                console.log(this.lat_tax);
                console.log('lng');
                this.lng_usuario=datos_2.json().lng;
                console.log(this.lng_tax);
               
            },
            err => {console.log("NO EXISTE REGISTRO");
            },
        );
 
    /*la ubicacion del taxista*/
    let datos=this.login.getMyGlobalVar();
     let id_taxista=datos.json().id_usuario;
         this.servicio.get_ubicacion_taxista(id_taxista,_token).subscribe(
            servicio => {
              this.result=servicio;
               console.log("REGISTRO EXISTE");
            /*  let items = servicio.json();*/
              console.log("guarda el result en latlng");
              this.servicio.set_lat_lng(this.result);
               let datos:any=this.servicio.get_lat_lng();
                console.log('lat');
                /*aqui cambio el lat y lng como viene para poder que el me busque al taxista como A y el destino como B*/
                this.lat_tax=datos.json().lat;
                console.log( this.lat_usuario);
                console.log('lng');
                this.lng_tax=datos.json().lng;
                console.log(this.lng_usuario);
            },
            err => {console.log("NO EXISTE REGISTRO");
            },
        );
     /*************************************************/
    let lat_usuario:any=parseFloat(this.lat_usuario);
    let lng_usuario:any=parseFloat(this.lng_usuario);
    let lat_taxi:any=parseFloat(this.lat_tax);
    let lng_taxi:any=parseFloat(this.lng_tax);
    console.log("entro en calcular ruta");
    let inicio=new GoogleMapsLatLng(lat_usuario, lng_usuario);
    let fin=new GoogleMapsLatLng(lat_taxi, lng_taxi);
  
    let icono_pasajero = " ././assets/img/pasajero.png";
    let icono_taxi = " ././assets/img/taxi.png";
    let directionsDisplay = null;
            directionsDisplay = this.render;
            /*el panel que tengo en el html OJO debe ir*/
   /*  document.getElementById("panel").innerHTML = "";*/
     console.log('entro en panel');
           /*aqui muestro la ruta trazada*/
            directionsDisplay.setMap(this.map);
           /* this.direccion_panel=directionsDisplay.setPanel(panel);*/
            console.log(this.direccion_panel);
         /*   directionsDisplay.setPanel(panel);*/
      this.directionsService.route({
        origin: fin,
        destination: inicio,
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
        this.duracion=duration;
        this.makeMarker(leg.inicio,icono_pasajero, "algo 1" );
        this.makeMarker(leg.fin, icono_taxi, 'algo 2' );
          /* directionsDisplay.setMap(this.map);*/
        }else{
          console.log('no va pal baile');
        } 
      }, err => {console.log(err);
        alert(err);
            },)
   
  }
  /*************************************************/
  calcular_direccion(){
       console.log('cambia la ruta a true');
       this.ruta=true;
    console.log("entra en Calulcar direccion");
    let data:any=this.login.getMyGlobalVar();
    let id_usuario=data.json().id_usuario;
/*  let data_2:any=this.servicio.get_id_servicio();
    let id_servicio=data_2;
    let _token:any='5oJn^ixsIp~ltoEnXia^Iv[wIhiy]R0TkH6G';
*/    console.log("sacando el dato");
    console.log(id_usuario);

     /*************************************************/
    let lat_usuario:any=parseFloat(this.lat_usuario);
    let lng_usuario:any=parseFloat(this.lng_usuario);
    let lat_taxi:any=parseFloat(this.lat_tax);
    let lng_taxi:any=parseFloat(this.lng_tax);
    console.log("entro en calcular ruta");
    let inicio=new GoogleMapsLatLng(lat_usuario, lng_usuario);
    let fin=new GoogleMapsLatLng(lat_taxi, lng_taxi);
    let panel = document.getElementById('panel2'); 
    let icono_pasajero = " ././assets/img/pasajero.png";
    let icono_taxi = " ././assets/img/taxi.png";
    let directionsDisplay = null;
            directionsDisplay = this.render;
            /*el panel que tengo en el html OJO debe ir*/
     document.getElementById("panel2").innerHTML = "";
     console.log('entro en panel');
            /*directionsDisplay.setMap(this.map);*/
            /*aqui muestro la direccion detallada*/
            this.direccion_panel=directionsDisplay.setPanel(panel);

         /*   console.log(this.direccion_panel);*/
         /*   directionsDisplay.setPanel(panel);*/
      this.directionsService.route({
        origin: fin,
        destination: inicio,
        travelMode: google.maps.TravelMode.DRIVING

      },(response,status)=>{
        console.log('entro en response status direccion');  
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
        this.duracion=duration;
        this.makeMarker(leg.inicio,icono_pasajero, "algo 1" );
        this.makeMarker(leg.fin, icono_taxi, 'algo 2' );
          /* directionsDisplay.setMap(this.map);*/
        }else{
          console.log('no va pal baile');
        } 
      }, err => {console.log(err);
        alert(err);
            },)
   
}

  /*************************************************/

  makeMarker( position, icon, title ){
     new google.maps.Marker({
      position: position,
      map: this.map,
      icon: icon,
      title: title
     });
	}
	regreso_driver(){
  	clearInterval(this.intervalo);
  	clearInterval(this.intervalo_2);
  	this.navCtrl.setRoot('PickOffPage');
	}
}
