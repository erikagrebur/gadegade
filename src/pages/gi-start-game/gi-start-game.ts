import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GiWordSearchPage } from '../gi-word-search/gi-word-search';
import { GameDescriptionPage } from '../game-description/game-description';
import { GoogleMaps, GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';
import { DatabaseProvider } from '../../providers/database/database';
import { StorageProvider } from '../../providers/storage/storage';
import { Diagnostic } from '@ionic-native/diagnostic';


@Component({
  selector: 'page-gi-start-game',
  templateUrl: 'gi-start-game.html',
})
export class GiStartGamePage {

  map: GoogleMap;
  storedGame: string = '';
  storedCity: string = '';
  logged: boolean = false;
  availableGames: any[] = [];
  selectedGame: any[] = [];
  basicInfo: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private googleMaps: GoogleMaps, private storageService: StorageProvider, private databaseService: DatabaseProvider, private diagnostic: Diagnostic, private ngZone: NgZone) {
    this.databaseService.getBasicInfoFromDataBase().subscribe(data => {console.log(data); this.basicInfo = data});
    this.storageService.getData('selectedCity').subscribe(storedCity => {
      this.storedCity = storedCity;
      this.storageService.getData('selectedGame').subscribe(storedGame => {
        this.storedGame = storedGame;
        this.databaseService.getGamesFromDataBase().subscribe(data => {
          if(this.logged) {
            this.availableGames = data[1];
          } else {
            this.availableGames = data[0];
          }

          this.selectedGame = this.availableGames[this.storedCity][this.storedGame];
          console.log(this.selectedGame);
          this.loadMap(this.selectedGame);
        });
      });
    });
  }

  ionViewDidLoad() {
    
  }

  getFirstGameItem() {
    this.navCtrl.push(GameDescriptionPage);
  }

  loadMap(game) {
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
          lat: game['start_point_lat'],
          lng: game['start_point_lng']
        },
        'tilt': 0,
        'zoom': 17
      }
    });
    console.info('this.map', JSON.stringify(this.map));
    this.map.on(GoogleMapsEvent.MAP_READY)
    .subscribe(() => {
      this.ngZone.run(() => {
        this.checkLocation();
      });
      console.log('Map is ready');
      this.map.addMarker({
        title: game['title'],
        icon: 'red',
        animation: 'DROP',
        position: {
          lat: game['start_point_lat'],
          lng: game['start_point_lng']
        }
      });
    });
  }

  checkLocation() {
    let successCallback = (isAvailable) => { console.log('Is available? ' + isAvailable); };
    let errorCallback = (e) => console.error(e);

    this.diagnostic.isLocationAuthorized().then(successCallback).catch(errorCallback);

  }

  test() {
    this.checkLocation();
  }
}
