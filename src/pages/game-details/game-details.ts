import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GameDescriptionPage } from '../game-description/game-description';

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

}
