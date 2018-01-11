import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { GiObscureImgPage } from '../gi-obscure-img/gi-obscure-img';
import { StorageProvider } from '../../providers/storage/storage';
import * as firebase from 'firebase';

@Component({
  selector: 'page-gi-mixed-words',
  templateUrl: 'gi-mixed-words.html',
})
export class GiMixedWordsPage {
  currentStage: string;

  mixedWordStages:string[] = [];

  slideStyle: any = 'rgba(148, 151, 153, 0.45)';
  rangeLong: number = 0;

  answered: boolean = false;

  currentLat: number;
  currentLng: number;
  
  targetLat: number;
  targetLng: number;

  distance: number;
  isFirstDistance: boolean = true;
  firstDist: number;
  checkPointDist: number;

  unitDist: number;
  distanceAccuracy: number = 50;
  checkedValue: number;

  wrongWayPTag: any = 'none';

  storedGame: string = '';
  storedCity: string = '';
  logged: boolean = false;
  availableGames: any[] = [];
  gameTitle: string = '';
  objectKeys: any[] = [];
  paragraphs: string[] = [];
  dataElements: string[] = [];
  imgSrcUrl: string;
  imgName: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseService: DatabaseProvider, private locationTracker: LocationTrackerProvider, private ngZone: NgZone, private storageService: StorageProvider) {
    firebase.auth().onAuthStateChanged(user => {
      if(!user) {
        this.logged = false;
      } else {
        this.logged = true;
      }
    });
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

          this.gameTitle = this.availableGames[this.storedCity][this.storedGame]['title'];
        });
        this.databaseService.getMixedWordsFromDataBase().subscribe(data => {
          
          if(this.logged) {
            this.dataElements = data[1];
          } else {
            this.dataElements = data[0];
          }

          this.paragraphs = this.dataElements[this.storedCity][this.storedGame]['prgs'];          
          this.objectKeys = Object.keys(this.paragraphs);
          this.mixedWordStages = this.dataElements[this.storedCity][this.storedGame]['word_stages'];
          this.currentStage = this.mixedWordStages[0];
          this.targetLat = Number(this.dataElements[this.storedCity][this.storedGame]['target_point_lat']);
          this.targetLng = Number(this.dataElements[this.storedCity][this.storedGame]['target_point_lng']);

          
        })
      });
    });

    this.locationTracker.startTracking();
    this.locationTracker.backGeolocation.subscribe((location) => {
      this.ngZone.run(() => {
        this.currentLat = location[0].value;
        this.currentLng = location[1].value;
        this.getDistance(this.targetLat,this.targetLng,this.currentLat,this.currentLng);
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
      
      this.setStage();
      
      this.checkPointDist -= this.checkedValue * this.unitDist;

      
    } else if(this.checkedValue < 0) {
      this.wrongWayPTag = 'block';
      this.rangeLong = this.checkedValue + (this.firstDist - this.checkPointDist)/this.unitDist;

      this.setStage();

      this.checkPointDist -= this.checkedValue * this.unitDist;

    }
  }

  setStage() {
    if(this.rangeLong < this.distanceAccuracy / 5) {
      this.currentStage = this.mixedWordStages[0];
    } else if(this.rangeLong >= this.distanceAccuracy / 5 && this.rangeLong < 2* this.distanceAccuracy / 5) {
      this.currentStage = this.mixedWordStages[1];
    } else if(this.rangeLong >= 2* this.distanceAccuracy / 5 && this.rangeLong < 3* this.distanceAccuracy / 5) {
      this.currentStage = this.mixedWordStages[2];
    } else if(this.rangeLong >= 3* this.distanceAccuracy / 5 && this.rangeLong < 4* this.distanceAccuracy / 5) {
      this.currentStage = this.mixedWordStages[3];
    } else if(this.rangeLong >= 4* this.distanceAccuracy / 5 && this.rangeLong < 5* this.distanceAccuracy / 5) {
      this.currentStage = this.mixedWordStages[4];
    }
  } 

  getNextGameItem() {
    //if(this.answered) {
      this.navCtrl.setRoot(GiObscureImgPage);
    //}
  }
}
