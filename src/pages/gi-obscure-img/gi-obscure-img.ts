import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { GiFinalScreenPage } from '../gi-final-screen/gi-final-screen';

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
  
  targetLat: number = 46.291164;
  targetLng: number = 18.518293;

  distance: number;
  isFirstDistance: boolean = true;
  firstDist: number;
  checkPointDist: number;

  unitDist: number;
  distanceAccuracy: number = 50;
  checkedValue: number;

  wrongWayPTag: any = 'none';
  hourseImgStyle: any = '1';
  waterImgStyle: any = '0';

  constructor(public navCtrl: NavController, public navParams: NavParams, private locationTracker: LocationTrackerProvider, private ngZone: NgZone) {
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

      this.hourseImgStyle = 1 - 1/this.distanceAccuracy*(this.checkedValue + (this.firstDist - this.checkPointDist)/this.unitDist);
      this.waterImgStyle = 1/this.distanceAccuracy*(this.checkedValue + (this.firstDist - this.checkPointDist)/this.unitDist);
      
      this.checkPointDist -= this.checkedValue * this.unitDist;

      
    } else if(this.checkedValue < 0) {
      this.wrongWayPTag = 'block';
      this.rangeLong = this.checkedValue + (this.firstDist - this.checkPointDist)/this.unitDist;      

      this.hourseImgStyle = 1 - 1/this.distanceAccuracy*(this.checkedValue + (this.firstDist - this.checkPointDist)/this.unitDist);
      this.waterImgStyle = 1/this.distanceAccuracy*(this.checkedValue + (this.firstDist - this.checkPointDist)/this.unitDist);

      this.checkPointDist -= this.checkedValue * this.unitDist;

    }
  }

  getNextGameItem() {
    this.navCtrl.push(GiFinalScreenPage);
  }

}
