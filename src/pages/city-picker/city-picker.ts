import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { DatabaseProvider } from '../../providers/database/database';

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

  database: any;
  subDatasKeys: string[] = [];
  cityNames: any;
  altTitles: any;
  imgNames: any;
  imgSrcUrls: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseService: DatabaseProvider, platform: Platform) {
    this.databaseService.getSelectableCitysFromDataBase().subscribe(data => {
      this.database = data;

      this.cityNames = this.database[2];
      this.altTitles = this.database[0];
      this.imgNames = this.database[1];
      this.subDatasKeys = Object.keys(this.database[2]);
    
      console.log(this.database);

      for(let i = 0; i < this.subDatasKeys.length; i++) {
        const storageRef = firebase.storage().ref().child('selectableCitysIcons/'+this.imgNames[i]);
        storageRef.getDownloadURL().then(url => console.log(url));
        console.log("img nave: ", this.imgNames[i]);
        console.log("pusholt értékek: ", this.imgSrcUrls);
      }

      console.log("pusholt értékek végleges: ", this.imgSrcUrls);
    });

    console.log("kepek", this.imgSrcUrls);
  }

  ionViewDidLoad() {
    
  }

  test() {
    /*console.log('dataAfter', this.database);
    console.log('nulla', this.database[0]);
    console.log('nulla', this.database[0][0]);*/
  }

  getCity() {
    //this.navCtrl.push(TabsPage);
    console.log("get");
  }

}
