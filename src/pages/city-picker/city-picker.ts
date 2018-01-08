import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { DatabaseProvider } from '../../providers/database/database';
import { StorageProvider } from '../../providers/storage/storage';

import * as firebase from 'firebase';

/**
 * Generated class for the CityPickerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-city-picker',
  templateUrl: 'city-picker.html',
})
export class CityPickerPage {

  objectKeys: string[] = [];
  cityNames: any;
  imgAltProps: any;
  imgNames: any;
  imgSrcUrls: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseService: DatabaseProvider, platform: Platform, private storageService: StorageProvider) {
    
    this.databaseService.getSelectableCitysFromDataBase().subscribe(data => {

      this.cityNames = data[2];
      this.imgAltProps = data[0];
      this.imgNames = data[1];
      this.objectKeys = Object.keys(this.cityNames);

      for(let i = 0; i < this.objectKeys.length; i++) {
        
        const storageRef = firebase.storage().ref().child(`selectableCitysIcons/${this.imgNames[i]}`);
        storageRef.getDownloadURL().then(url => this.imgSrcUrls.push(url));
      }
    });
  }

  valueChange(city) {
    for(let i = 0; i < this.objectKeys.length; i++) {
      if (this.cityNames[i] === city) {
        this.storageService.setData('selectedCity', city).subscribe(() => this.navCtrl.push(TabsPage));
      }
    }
  }

  getCity(city) {
    this.storageService.setData('selectedCity', city).subscribe(() => this.navCtrl.push(TabsPage));
  }

}
