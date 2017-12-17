import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GiWordSearchPage } from '../gi-word-search/gi-word-search';
import { GameDescriptionPage } from '../game-description/game-description';
import { GoogleMaps, GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';

@Component({
  selector: 'page-gi-start-game',
  templateUrl: 'gi-start-game.html',
})
export class GiStartGamePage {
  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private googleMaps: GoogleMaps) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  getFirstGameItem() {
    this.navCtrl.push(GameDescriptionPage);
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: 'Your friend, <img src=\'https://rovinj-apartman.extra.hu/images/rovinj-kepek/rovinj_kepek9.jpg\'> Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }

  loadMap() {
    console.log("megye");
    this.map = new GoogleMap('map', {
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'target': {
          lat: 47.1457479,
          lng: 18.409079
        },
        'tilt': 0,
        'zoom': 17
      }
    });
    console.info('this.map', JSON.stringify(this.map));
    this.map.on(GoogleMapsEvent.MAP_READY)
    .subscribe(() => {
      console.log('Map is ready');
      this.map.addMarker({
        title: 'FuckYouMaps',
        icon: 'red',
        animation: 'DROP',
        position: {
          lat: 47.1457479,
          lng: 18.409079
        }
      });
    });
  }

}
