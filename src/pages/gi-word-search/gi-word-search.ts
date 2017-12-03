import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GiWordSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-gi-word-search',
  templateUrl: 'gi-word-search.html',
})
export class GiWordSearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  tapped(e) {
    console.log(e);
    document.getElementById(e).style.backgroundColor = "#ff993d";
    
  }

}
