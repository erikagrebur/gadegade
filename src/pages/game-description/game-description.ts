import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { GiWordSearchPage } from '../gi-word-search/gi-word-search';

import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';

/**
 * Generated class for the GameDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-game-description',
  templateUrl: 'game-description.html',
})
export class GameDescriptionPage {
  odinImageUrl: string;
  thorImageUrl: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform) {
    platform.ready().then(() => {
      const storageRef = firebase.storage().ref().child('game_00/description/odin.JPG');
      storageRef.getDownloadURL().then(url => this.odinImageUrl = url);
      const thorRef = firebase.storage().ref().child('game_00/description/thor.png');
      thorRef.getDownloadURL().then(url => this.thorImageUrl = url);
    });

  }

  getGiWordSearch() {
    this.navCtrl.push(GiWordSearchPage);
  }

  ionViewDidLoad() {
   
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
