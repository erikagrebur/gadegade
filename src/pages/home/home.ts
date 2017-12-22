import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GameDetailsPage } from '../game-details/game-details';
import { CityPickerPage } from '../city-picker/city-picker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  getGameDetails() {
    this.navCtrl.push(GameDetailsPage);
  }

  ionViewWillEnter() {
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(0)';
        tabs[ key ].style.display = 'flex';
      });
    } // end if
  }

  getSelectPage() {
    this.navCtrl.push(CityPickerPage);
  }

}
