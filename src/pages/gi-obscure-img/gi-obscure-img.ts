import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { GiFinalScreenPage } from '../gi-final-screen/gi-final-screen';
import { StorageProvider } from '../../providers/storage/storage';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';

/**
 * Generated class for the GiObscureImgPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-gi-obscure-img',
  templateUrl: 'gi-obscure-img.html',
})
export class GiObscureImgPage {

  slideStyle: any = 'rgba(148, 151, 153, 0.45)';
  rangeLong: number = 0;

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
  startImgStyle: any = '1';
  targetImgStyle: any = '0';

  storedGame: string = '';
  storedCity: string = '';
  logged: boolean = false;
  availableGames: any[] = [];
  gameTitle: string = '';
  objectKeys: any[] = [];
  imageKeys: any[] = [];
  paragraphs: string[] = [];
  dataElements: string[] = [];
  imgSrcUrls: string[] = [];
  imgNames: string[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private locationTracker: LocationTrackerProvider, private ngZone: NgZone, private storageService: StorageProvider, private databaseService: DatabaseProvider) {
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
        this.databaseService.getObscureImageFromDataBase().subscribe(data => {
          
          if(this.logged) {
            this.dataElements = data[1];
          } else {
            this.dataElements = data[0];
          }

          this.paragraphs = this.dataElements[this.storedCity][this.storedGame]['prgs'];
          this.objectKeys = Object.keys(this.paragraphs);
          this.imgNames = this.dataElements[this.storedCity][this.storedGame]['imgs'];
          this.imageKeys = Object.keys(this.imgNames);
          this.targetLat = this.dataElements[this.storedCity][this.storedGame]['target_point_lat'];
          this.targetLng = this.dataElements[this.storedCity][this.storedGame]['target_point_lng'];

          let storageRef:any;
          if(this.logged) {
            for(let i = 0; i < this.imageKeys.length; i++) {
              storageRef = firebase.storage().ref().child(`giObscureImage/whole_games/${this.storedCity}/${this.storedGame}/${this.imgNames[i]}`);
              storageRef.getDownloadURL().then(url => this.imgSrcUrls.push(url));
            }
          } else {
            for(let i = 0; i < this.imageKeys.length; i++) {
              storageRef = firebase.storage().ref().child(`giObscureImage/try_games/${this.storedCity}/${this.storedGame}/${this.imgNames[i]}`);
              storageRef.getDownloadURL().then(url => this.imgSrcUrls.push(url));
            }
          }

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

      this.startImgStyle = 1 - 1/this.distanceAccuracy*(this.checkedValue + (this.firstDist - this.checkPointDist)/this.unitDist);
      this.targetImgStyle = 1/this.distanceAccuracy*(this.checkedValue + (this.firstDist - this.checkPointDist)/this.unitDist);
      
      this.checkPointDist -= this.checkedValue * this.unitDist;

      
    } else if(this.checkedValue < 0) {
      this.wrongWayPTag = 'block';
      this.rangeLong = this.checkedValue + (this.firstDist - this.checkPointDist)/this.unitDist;      

      this.startImgStyle = 1 - 1/this.distanceAccuracy*(this.checkedValue + (this.firstDist - this.checkPointDist)/this.unitDist);
      this.targetImgStyle = 1/this.distanceAccuracy*(this.checkedValue + (this.firstDist - this.checkPointDist)/this.unitDist);

      this.checkPointDist -= this.checkedValue * this.unitDist;

    }
  }

  getNextGameItem() {
    this.navCtrl.setRoot(GiFinalScreenPage);
  }

}
