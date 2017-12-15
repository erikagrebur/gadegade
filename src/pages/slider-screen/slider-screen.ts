import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

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
    //dbp.getLettersFromDataBase().subscribe(letters => console.log(letters));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SliderScreenPage');
  }

  getHomePage() {
    this.navCtrl.push(HomePage);
  }

}
