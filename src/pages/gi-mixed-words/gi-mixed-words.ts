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
  mixedWordsValue: string;

  mixedWordDatabaseValues:string[] = [];

  slideStyle: any = 'rgba(148, 151, 153, 0.45)';
  rangeLong: number = 0;

  answered: boolean = false;

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
  }

  ionViewDidLoad() {
    console.log("odaegyet");
    this.databaseService.getMixedWordsFromDataBase().subscribe(mixedwords => {
      this.mixedWordDatabaseValues = mixedwords;
      this.mixedWordsValue = this.mixedWordDatabaseValues[0]['01stStage'];
    });
    console.log("mixedvordsvalue", this.mixedWordDatabaseValues);
    console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm", this.mixedWordsValue);
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
      this.answered = true;
    } else {
      this.slideStyle = 'rgba(148, 151, 153, 0.45)';
      this.answered = false;
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
        this.mixedWordsValue = this.mixedWordDatabaseValues[0]['01stStage'];
      } else if(this.rangeLong >= this.distanceAccuracy / 5 && this.rangeLong < 2* this.distanceAccuracy / 5) {
        this.mixedWordsValue = this.mixedWordDatabaseValues[0]['02ndStage'];
      } else if(this.rangeLong >= 2* this.distanceAccuracy / 5 && this.rangeLong < 3* this.distanceAccuracy / 5) {
        this.mixedWordsValue = this.mixedWordDatabaseValues[0]['03rdStage'];
      } else if(this.rangeLong >= 3* this.distanceAccuracy / 5 && this.rangeLong < 4* this.distanceAccuracy / 5) {
        this.mixedWordsValue = this.mixedWordDatabaseValues[0]['04thStage'];
      } else if(this.rangeLong >= 4* this.distanceAccuracy / 5 && this.rangeLong < 5* this.distanceAccuracy / 5) {
        this.mixedWordsValue = this.mixedWordDatabaseValues[0]['05thStage'];
      }
      
      this.checkPointDist -= this.checkedValue * this.unitDist;

      
    } else if(this.checkedValue < 0) {
      this.wrongWayPTag = 'block';
      this.rangeLong = this.checkedValue + (this.firstDist - this.checkPointDist)/this.unitDist;      

      if(this.rangeLong < this.distanceAccuracy / 5) {
        this.mixedWordsValue = this.mixedWordDatabaseValues[0]['01stStage'];
      } else if(this.rangeLong >= this.distanceAccuracy / 5 && this.rangeLong < 2* this.distanceAccuracy / 5) {
        this.mixedWordsValue = this.mixedWordDatabaseValues[0]['02ndStage'];
      } else if(this.rangeLong >= 2* this.distanceAccuracy / 5 && this.rangeLong < 3* this.distanceAccuracy / 5) {
        this.mixedWordsValue = this.mixedWordDatabaseValues[0]['03rdStage'];
      } else if(this.rangeLong >= 3* this.distanceAccuracy / 5 && this.rangeLong < 4* this.distanceAccuracy / 5) {
        this.mixedWordsValue = this.mixedWordDatabaseValues[0]['04thStage'];
      } else if(this.rangeLong >= 4* this.distanceAccuracy / 5 && this.rangeLong < 5* this.distanceAccuracy / 5) {
        this.mixedWordsValue = this.mixedWordDatabaseValues[0]['05thStage'];
      }

      this.checkPointDist -= this.checkedValue * this.unitDist;

    }
  }

  getNextGameItem() {
    //if(this.answered) {
      this.navCtrl.push(GiObscureImgPage);
    //}
  }
}
