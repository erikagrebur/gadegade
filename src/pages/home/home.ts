import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GameDetailsPage } from '../game-details/game-details';

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

}
