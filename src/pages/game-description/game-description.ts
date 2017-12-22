import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GiWordSearchPage } from '../gi-word-search/gi-word-search';

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
  image: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    /*const storageRef = firebase.storage().ref().child('game_00/description/odin.JPG');
    storageRef.getDownloadURL().then(url => this.image = url);
    const thorRef = firebase.storage().ref().child('game_00/description/thor.png');
    console.log("thorref", thorRef);
    console.log("imageconstba", this.image);*/
  }

  getGiWordSearch() {
    this.navCtrl.push(GiWordSearchPage);
  }

  ionViewDidLoad() {
   /* const storageRef = firebase.storage().ref().child('game_00/description/odin.JPG');
    storageRef.getDownloadURL().then(url => this.image = url);
    console.log("didloadbastorageref", this.image);*/
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
