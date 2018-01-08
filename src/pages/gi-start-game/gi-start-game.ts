import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GiWordSearchPage } from '../gi-word-search/gi-word-search';
import { GameDescriptionPage } from '../game-description/game-description';
import { GoogleMaps, GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';
import { DatabaseProvider } from '../../providers/database/database';
import { StorageProvider } from '../../providers/storage/storage';
import { Diagnostic } from '@ionic-native/diagnostic';
import * as firebase from 'firebase';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';


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
  noGpsIconStyle: string = 'block';
  slideStyle: string = 'rgba(148, 151, 153, 0.45)';
  distance: number;
  isHere: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private googleMaps: GoogleMaps, private storageService: StorageProvider, private databaseService: DatabaseProvider, private diagnostic: Diagnostic, private ngZone: NgZone, private locationTracker: LocationTrackerProvider) {
    firebase.auth().onAuthStateChanged(user => {
      if(!user) {
        this.logged = false;
      } else {
        this.logged = true;
      }
    });
    this.databaseService.getBasicInfoFromDataBase().subscribe(data => {this.basicInfo = data});
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
          this.loadMap(this.selectedGame);
          
          this.locationTracker.startTracking();
          this.locationTracker.backGeolocation.subscribe((location) => {
            this.ngZone.run(() => {
              this.getDistance(this.selectedGame['start_point_lat'], this.selectedGame['start_point_lng'], location[0].value, location[1].value);
              this.checkLocation();
            });
          });
        });
      });
    });
  }

  getDistance(tLat,tLng,cLat,cLng) {
    let R: number = 6371; // Radius of the earth in km
    let dLat: number = this.degToRad(cLat-tLat);  // deg2rad below
    let dLon: number = this.degToRad(cLng-tLng); 
    let a: number = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.degToRad(tLat)) * Math.cos(this.degToRad(cLat)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    let c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    this.distance = R * c; // Distance in km
    
    if(this.distance <= 0.005) {
      this.slideStyle = '#ff993d';
      this.isHere = true;
    } else {
      this.slideStyle = 'rgba(148, 151, 153, 0.45)';
      this.isHere = false;
    }
  }
  
  degToRad(deg) {
    return deg * (Math.PI/180)
  }

  getFirstGameItem() {
    this.navCtrl.setRoot(GameDescriptionPage);
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
    this.map.on(GoogleMapsEvent.MAP_READY)
    .subscribe(() => {
      this.ngZone.run(() => {
        this.checkLocation();
      });
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
    let successCallback = (isAvailable) => { this.noGpsIconStyle = 'none' };
    let errorCallback = (e) => { this.noGpsIconStyle = 'block' };

    this.diagnostic.isLocationAvailable().then(successCallback).catch(errorCallback);

  }
}
