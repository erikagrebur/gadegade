import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GameDescriptionPage } from '../game-description/game-description';
import { HomePage } from '../home/home';

/**
 * Generated class for the GameDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-game-details',
  templateUrl: 'game-details.html',
})
export class GameDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  getGameDescription() {
    this.navCtrl.push(GameDescriptionPage);
  }

  getHomePage() {
    this.navCtrl.push(HomePage);
  }

  ionViewWillEnter() {
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(56px)';
        tabs[ key ].style.display = 'none';
      });
    } // end if
  }
  
}
