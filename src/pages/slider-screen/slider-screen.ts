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
    //dbp.getLettersFromDataBase().subscribe(letters => console.log(letters));
    var config = {
      apiKey: "AIzaSyB6Kyact4Y6iooiaKHPaFXCEmTl8DtlACY",
      authDomain: "tryagain-b5737.firebaseapp.com",
      databaseURL: "https://tryagain-b5737.firebaseio.com",
      projectId: "tryagain-b5737",
      storageBucket: "tryagain-b5737.appspot.com",
      messagingSenderId: "158844905597"
    };

    firebase.initializeApp(config);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SliderScreenPage');
  }

  getHomePage() {
    this.navCtrl.push(CityPickerPage);
  }

}
