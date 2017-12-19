import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GiRateScreenPage } from '../gi-rate-screen/gi-rate-screen';

/**
 * Generated class for the GiFinalScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-gi-final-screen',
  templateUrl: 'gi-final-screen.html',
})
export class GiFinalScreenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  getNextGameItem() {
    this.navCtrl.push(GiRateScreenPage);
  }

}
