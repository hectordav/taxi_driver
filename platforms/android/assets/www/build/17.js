webpackJsonp([17],{247:function(l,n,e){"use strict";function t(l){return i._19(0,[(l()(),i.Z(0,0,null,null,10,"div",[["id","custom-overlay"]],[[4,"display",null]],null,null,null,null)),(l()(),i._18(-1,null,["\n  "])),(l()(),i.Z(2,0,null,null,7,"div",[["class","flb"]],null,null,null,null,null)),(l()(),i._18(-1,null,["\n    "])),(l()(),i.Z(4,0,null,null,0,"div",[["class","Aligner-item Aligner-item--top"]],null,null,null,null,null)),(l()(),i._18(-1,null,["\n    "])),(l()(),i.Z(6,0,null,null,0,"img",[["src","assets/img/inicio.png"]],null,null,null,null,null)),(l()(),i._18(-1,null,["\n    "])),(l()(),i.Z(8,0,null,null,0,"div",[["class","Aligner-item Aligner-item--bottom"]],null,null,null,null,null)),(l()(),i._18(-1,null,["\n  "])),(l()(),i._18(-1,null,["\n"])),(l()(),i._18(-1,null,["\n"])),(l()(),i.Z(12,0,null,null,2,"ion-header",[],null,null,null,null,null)),i.Y(13,16384,null,0,h.a,[m.a,i.j,i.z,[2,y.a]],null,null),(l()(),i._18(-1,null,["\n"]))],null,function(l,n){l(n,0,0,n.component.splash?"flex":"none")})}Object.defineProperty(n,"__esModule",{value:!0});var i=e(0),o=(e(2),e(57),e(48)),u=e(130),s=function(){function l(l,n,e,t,i,o){var u=this;this.navCtrl=l,this.navParams=n,this.prlogin=e,this.alertCtrl=t,this.loadingCtrl=i,this.conexion=o,this.splash=!0,this.serial_device="undefined",this.tabBarElement=document.querySelector(".tabbar"),setTimeout(function(){u.serial()},3e3)}return l.prototype.ionViewDidLoad=function(){var l=this;this.tabBarElement.style.display="none",setTimeout(function(){l.splash=!1,l.tabBarElement.style.display="flex"},4e3)},l.prototype.serial=function(){var l=this,n=setInterval(function(){l.serial_device=l.prlogin.get_serial(),console.log(l.serial_device),void 0!=l.serial_device&&(clearInterval(n),l.login_serial()),console.log(n)},1e3)},l.prototype.login_serial=function(){var l=this,n=this.serial_device,e=this.prlogin.getToken();this.prlogin.login_serial(n,e).subscribe(function(n){if(l.results=n,"null"==l.results._body){l.alertCtrl.create({title:"Error",subTitle:"Equipo no registrado",buttons:["OK"]}).present(),l.navCtrl.setRoot("LoginPage")}else if(2==n.json().id_estado_usuario){l.alertCtrl.create({title:"Error",subTitle:"Usuario Inactivo",buttons:["OK"]}).present(),l.navCtrl.setRoot("LoginPage")}else if(1==n.json().id_nivel||2==n.json().id_nivel||4==n.json().id_nivel||5==n.json().id_nivel){l.alertCtrl.create({title:"Error",subTitle:"Debes ser un Conductor para poder iniciar sesion",buttons:["OK"]}).present(),l.navCtrl.setRoot("LoginPage")}else l.presentLoading(),l.prlogin.setMyGlobalVar(l.results),l.navCtrl.setRoot("HomePage"),l.loader.dismiss()},function(l){console.log("NO EXISTE REGISTRO")})},l.prototype.presentLoading=function(){this.loader=this.loadingCtrl.create({content:"Cargando..."}),this.loader.present()},l}(),r=function(){return function(){}}(),a=e(206),c=e(207),d=e(208),_=e(209),g=e(210),p=e(211),v=e(212),f=e(213),b=e(214),h=e(132),m=e(1),y=e(5),C=e(20),E=e(11),j=e(60),T=e(61),P=i.X({encapsulation:2,styles:[],data:{}}),Z=i.V("page-inicio",s,function(l){return i._19(0,[(l()(),i.Z(0,0,null,null,1,"page-inicio",[],null,null,null,t,P)),i.Y(1,49152,null,0,s,[C.a,E.a,o.a,j.a,T.a,u.a],null,null)],null,null)},{},{},[]),I=e(15),L=e(18),O=e(131),R=e(41);e.d(n,"InicioPageModuleNgFactory",function(){return q});var q=i.W(r,[],function(l){return i._10([i._11(512,i.i,i.S,[[8,[a.a,c.a,d.a,_.a,g.a,p.a,v.a,f.a,b.a,Z]],[3,i.i],i.s]),i._11(4608,I.k,I.j,[i.r,[2,I.s]]),i._11(4608,L.q,L.q,[]),i._11(4608,L.d,L.d,[]),i._11(512,I.b,I.b,[]),i._11(512,L.o,L.o,[]),i._11(512,L.g,L.g,[]),i._11(512,L.m,L.m,[]),i._11(512,O.a,O.a,[]),i._11(512,O.b,O.b,[]),i._11(512,r,r,[]),i._11(256,R.a,s,[])])})}});