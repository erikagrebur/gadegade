import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { GiObscureImgPage } from '../gi-obscure-img/gi-obscure-img';

/**
 * Generated class for the GiMixedWordsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-gi-mixed-words',
  templateUrl: 'gi-mixed-words.html',
})
export class GiMixedWordsPage {
  mixedWordsCollection: string[] = [
    'Wfo!oll het sshero\' seey',
    'wfooll hte sserho\' esey!',
    'foollw the hssero\' esey!',
    'Fololw the hosser\' eyes!',
    'Follow the horse\'s eyes!'];
  mixedWordsValue: string;

  slideStyle: any = 'rgba(148, 151, 153, 0.45)';
  rangeLong: number = 0;

  currentLat: number;
  currentLng: number;
  
  targetLat: number = 46.290983;
  targetLng: number = 18.519511;

  distance: number;
  isFirstDistance: boolean = true;
  firstDist: number;
  checkPointDist: number;

  unitDist: number;
  distanceAccuracy: number = 50;
  checkedValue: number;

  wrongWayPTag: any = 'none';

  testLogFirstElem: string;
  testLogSecondElem: string;
  testLogThirdElem: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseService: DatabaseProvider, private locationTracker: LocationTrackerProvider, private ngZone: NgZone) {

    this.locationTracker.startTracking();
    this.locationTracker.backGeolocation.subscribe((location) => {
      this.ngZone.run(() => {
        this.currentLat = location[0].value;
        this.currentLng = location[1].value;
        this.getDistance(this.targetLat,this.targetLng,this.currentLat,this.currentLng);
      });
    });
    
    this.databaseService.getMixedWordsFromDataBase().subscribe(mixedwords => {
      this. mixedWordsCollection = mixedwords;
      console.log("ittvannak", this.mixedWordsCollection);
    });
    
    this.mixedWordsValue = this.mixedWordsCollection[0];
    console.log('c', this.mixedWordsCollection);
    console.log('c0', this.mixedWordsCollection[0]);
    console.log('c1', this.mixedWordsCollection[1]);
    console.log('c2', this.mixedWordsCollection[2]);
    console.log('c3', this.mixedWordsCollection[3]);
    console.log('c4', this.mixedWordsCollection[4]);
    this.testLogFirstElem = this.mixedWordsCollection[0];
    this.testLogSecondElem = this.mixedWordsCollection[1];
    this.testLogThirdElem = this.mixedWordsCollection[2];
    console.log('m', this.mixedWordsValue);
    /*this.mixedWordsValue = this.mixedWordsCollection['0']['01stStage'];
    console.log("szo", this.mixedWordsValue);*/
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
    console.log("distance",this.distance);
    //this.distanceMeter = this.distance*1000;
    
    if(this.isFirstDistance) {
      this.firstDist = this.distance;
      this.checkPointDist = this.firstDist;
      this.unitDist = this.firstDist / this.distanceAccuracy;
      this.isFirstDistance = false;
    }
    this.checkDistance();
    if(this.distance <= 0.005) {
      this.slideStyle = '#ff993d';
    } else {
      this.slideStyle = 'rgba(148, 151, 153, 0.45)';
    }
  }
  
  degToRad(deg) {
    return deg * (Math.PI/180)
  }

  checkDistance() {

    this.checkedValue = Math.floor((this.checkPointDist - this.distance) / this.unitDist);
    
    if( this.checkedValue > 0 ) {
      this.wrongWayPTag = 'none';
      this.rangeLong = this.checkedValue + (this.firstDist - this.checkPointDist)/this.unitDist;

      console.log('condii', this.rangeLong < this.distanceAccuracy / 5);
      
      if(this.rangeLong < this.distanceAccuracy / 5) {
        this.mixedWordsValue = this.mixedWordsCollection[0];
        console.log('ertek 00', this.mixedWordsCollection[0]);
      } else if(this.rangeLong >= this.distanceAccuracy / 5 && this.rangeLong < 2* this.distanceAccuracy / 5) {
        this.mixedWordsValue = this.mixedWordsCollection[1];
        console.log('ertek 01', this.mixedWordsCollection[1]);
      } else if(this.rangeLong >= 2* this.distanceAccuracy / 5 && this.rangeLong < 3* this.distanceAccuracy / 5) {
        this.mixedWordsValue = this.mixedWordsCollection[2];
      } else if(this.rangeLong >= 3* this.distanceAccuracy / 5 && this.rangeLong < 4* this.distanceAccuracy / 5) {
        this.mixedWordsValue = this.mixedWordsCollection[3];
      } else if(this.rangeLong >= 4* this.distanceAccuracy / 5 && this.rangeLong < 5* this.distanceAccuracy / 5) {
        this.mixedWordsValue = this.mixedWordsCollection[4];
      }
      
      this.checkPointDist -= this.checkedValue * this.unitDist;

      
    } else if(this.checkedValue < 0) {
      this.wrongWayPTag = 'block';
      this.rangeLong = this.checkedValue + (this.firstDist - this.checkPointDist)/this.unitDist;      

      if(this.rangeLong < this.distanceAccuracy / 5) {
        this.mixedWordsValue = this.mixedWordsCollection[0];
      } else if(this.rangeLong >= this.distanceAccuracy / 5 && this.rangeLong < 2* this.distanceAccuracy / 5) {
        this.mixedWordsValue = this.mixedWordsCollection[1];
      } else if(this.rangeLong >= 2* this.distanceAccuracy / 5 && this.rangeLong < 3* this.distanceAccuracy / 5) {
        this.mixedWordsValue = this.mixedWordsCollection[2];
      } else if(this.rangeLong >= 3* this.distanceAccuracy / 5 && this.rangeLong < 4* this.distanceAccuracy / 5) {
        this.mixedWordsValue = this.mixedWordsCollection[3];
      } else if(this.rangeLong >= 4* this.distanceAccuracy / 5 && this.rangeLong < 5* this.distanceAccuracy / 5) {
        this.mixedWordsValue = this.mixedWordsCollection[4];
      }

      this.checkPointDist -= this.checkedValue * this.unitDist;

    }
  }

  getNextGameItem() {
    this.navCtrl.push(GiObscureImgPage);
  }



}
