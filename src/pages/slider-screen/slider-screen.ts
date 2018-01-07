import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CityPickerPage } from '../city-picker/city-picker';
import * as firebase from 'firebase';

/**
 * Generated class for the SliderScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-slider-screen',
  templateUrl: 'slider-screen.html',
})
export class SliderScreenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  getHomePage() {
    this.navCtrl.push(CityPickerPage);
  }

}
