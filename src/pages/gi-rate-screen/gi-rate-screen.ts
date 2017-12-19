import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignUpScreenPage } from '../sign-up-screen/sign-up-screen';

/**
 * Generated class for the GiRateScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-gi-rate-screen',
  templateUrl: 'gi-rate-screen.html',
})
export class GiRateScreenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  getSignUpScreen() {
    this.navCtrl.push(SignUpScreenPage);
  }

}
