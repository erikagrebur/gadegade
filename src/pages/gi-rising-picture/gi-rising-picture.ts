import { Component, NgZone} from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { ThreeQuestionPage } from '../three-question/three-question';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-gi-rising-picture',
  templateUrl: 'gi-rising-picture.html',
})
export class GiRisingPicturePage {

  rangeLong: number = 0;
  currentLng: number;
  currentLat: number;

  targetLat: number;
  targetLng: number;

  distance: number;

  imageWidth: string = '15px';
  imageUnit: number;
  distanceAccuracy: number = 50;
  slideStyle: string = 'rgba(148, 151, 153, 0.45)';

  isFirstDistance: boolean = true; //We would like to save the first value of the distance
  firstDist: number; //the first value of the distance what is tha basic distance
  unitDist: number; //the basic distance / 100, this will be the checkpoints distance
  checkedValue: number;
  checkPointDist: number; // this means the distance between the target and the checkpoint

  wrongWayPTag: any = 'none';

  risingImageUrl: string;

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

  constructor(public navCtrl: NavController, platform: Platform, public navParams: NavParams, private locationTracker: LocationTrackerProvider, private ngZone: NgZone, private databaseService: DatabaseProvider, private storageService: StorageProvider) {
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
        this.databaseService.getRisingPictureFromDataBase().subscribe(data => {
          
          if(this.logged) {
            this.dataElements = data[1];
          } else {
            this.dataElements = data[0];
          }

          this.paragraphs = this.dataElements[this.storedCity][this.storedGame]['prgs'];
          this.imgName = this.dataElements[this.storedCity][this.storedGame]['img'];
          this.targetLat = Number(this.dataElements[this.storedCity][this.storedGame]['target_point_lat']);
          this.targetLng = Number(this.dataElements[this.storedCity][this.storedGame]['target_point_lng']);

          let storageRef:any;
          if(this.logged) {
            storageRef = firebase.storage().ref().child(`giRisingPicture/whole_games/${this.storedCity}/${this.storedGame}/${this.imgName}`);
          } else {
            storageRef = firebase.storage().ref().child(`giRisingPicture/try_games/${this.storedCity}/${this.storedGame}/${this.imgName}`);
          }
          storageRef.getDownloadURL().then(url => this.imgSrcUrl = url);
          
          this.objectKeys = Object.keys(this.paragraphs);
          
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

    this.imageUnit = 180 / this.distanceAccuracy;


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
      
      this.imageWidth = (this.imageUnit * (this.checkedValue + (this.firstDist - this.checkPointDist)/this.unitDist)).toString()+'px';

      this.checkPointDist -= this.checkedValue * this.unitDist;

      //formázni a csúszka gömböt
    } else if(this.checkedValue < 0) {
      this.wrongWayPTag = 'block';
      this.rangeLong = this.checkedValue + (this.firstDist - this.checkPointDist)/this.unitDist;
      
      if(this.checkPointDist !== this.firstDist) {
        this.imageWidth = (this.imageUnit * (this.checkedValue + (this.firstDist - this.checkPointDist)/this.unitDist)).toString()+'px';
      }

      this.checkPointDist -= this.checkedValue * this.unitDist;

      /* itt még formázni kell a kis csuszka gömböt */
    }
  }

  getNextGameItem() {
    this.navCtrl.setRoot(ThreeQuestionPage);
  }


}
