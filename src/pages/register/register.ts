import { Component } from '@angular/core';
import {IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  constructor(public nav: NavController) {

  }

  signup() {
    this.nav.setRoot('HomePage');
  }

  login() {
    this.nav.setRoot('LoginPage');
  }
}
