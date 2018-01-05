import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { GoogleMaps, GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseService: DatabaseProvider, private googleMaps: GoogleMaps, private ngZone: NgZone) {
    this.databaseService.getSelectableCitysFromDataBase().subscribe(data => {

      this.cityNames = data[2];
      this.objectKeys = Object.keys(this.cityNames);
    
      this.loadMap();
    });
  }

  loadMap() {
    console.log("futik a mapsz");
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
          lat: 55.472376,
          lng: 8.442486
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
        title: 'title',
        icon: 'red',
        animation: 'DROP',
        position: {
          lat: 55.471691, 
          lng: 8.441160
        }
      });
    });
  }

  test() {
    console.log("hopp mükszik");
  }

}
