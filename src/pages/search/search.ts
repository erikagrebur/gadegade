import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { GoogleMaps, GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { StorageProvider } from '../../providers/storage/storage';
import { GameDetailsPage } from '../game-details/game-details';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  cityNames: string[] = [];
  objectKeys: any;
  map: GoogleMap;
  games: any[] =[];
  logged: boolean = false;

  gamesKey: any;
  cityCoordinates: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseService: DatabaseProvider, private googleMaps: GoogleMaps, private ngZone: NgZone, private locationTracker: LocationTrackerProvider, private storageService: StorageProvider) {
    this.databaseService.getSelectableCitysFromDataBase().subscribe(data => {

      this.cityNames = data[2];
      this.objectKeys = Object.keys(this.cityNames);
    
      this.databaseService.getGamesFromDataBase().subscribe(games => {
        if(this.logged) {
          for(let i = 0; i < this.objectKeys.length; i++) {
            this.gamesKey = Object.keys(games[1][this.cityNames[i]]);
            for(let j = 1; j <= this.gamesKey.length; j++) {
              let aux = '';
              if(j < 10) {
                aux = 'game_0' + j;
              } else {
                aux = 'game_' + j;
              }
              this.games.push(games[0][this.cityNames[i]][aux]);
            }
          }
        } else {
          
          for(let i = 0; i < this.objectKeys.length; i++) {
            this.gamesKey = Object.keys(games[0][this.cityNames[i]]);
            for(let j = 1; j <= this.gamesKey.length; j++) {
              let aux = '';
              if(j < 10) {
                aux = 'game_0' + j;
              } else {
                aux = 'game_' + j;
              }
              this.games.push(games[0][this.cityNames[i]][aux]);
            }
          }
        }
      });

      this.databaseService.getCitiesFromDataBase().subscribe(data => {
        if(this.logged) {
          this.cityCoordinates = data[1];
        } else {
          this.cityCoordinates = data[0];
        }
      });
      
      this.locationTracker.startTracking();
    this.locationTracker.backGeolocation.subscribe((location) => {
      
        this.loadMap(location[0].value, location[1].value);
    });
    });
  }

  changeLocation(lat, lng){
    this.map.animateCamera({
      'target': {
        lat: lat,
        lng: lng
      }, 
      'zoom': 12
    });

    return this.map;
  }

  loadMap(lat, lng) {
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
          lat: lat,
          lng: lng
        },
        'tilt': 0,
        'zoom': 17
      }
    });
    this.map.on(GoogleMapsEvent.MAP_READY)
    .subscribe(() => {
      for(let i=0; i<this.games.length; i++){
        this.map.addMarker({
          title: this.games[i].title,
          icon: 'red',
          animation: 'DROP',
          position: {
            lat: this.games[i].start_point_lat, 
            lng: this.games[i].start_point_lng
          }
        }).then(marker => {
          marker.on(GoogleMapsEvent.MARKER_CLICK)
            .subscribe(() => {
              this.goToDetailsScreen(this.games[i].city_id, this.games[i].id);
            });
        });
      }
    });
  }

  goToDetailsScreen(city, game) {
    this.storageService.setData('selectedCity', city).subscribe(() => {
      this.storageService.setData('selectedGame', game).subscribe(() => {
        this.navCtrl.push(GameDetailsPage);
      });
    });
  }

  valueChange(city) {
    for(let i = 0; i < this.objectKeys.length; i++) {
      if(this.cityNames[i] === city) {
        this.changeLocation(this.cityCoordinates[city].lat, this.cityCoordinates[city].lng);
      }
    }
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

}
