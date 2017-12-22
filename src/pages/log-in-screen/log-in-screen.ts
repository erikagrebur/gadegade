import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignUpScreenPage } from '../sign-up-screen/sign-up-screen';

/**
 * Generated class for the LogInScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-log-in-screen',
  templateUrl: 'log-in-screen.html',
})
export class LogInScreenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInScreenPage');
  }

  getSignUpPage() {
    this.navCtrl.push(SignUpScreenPage);
  }

}
