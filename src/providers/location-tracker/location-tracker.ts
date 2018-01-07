import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';
 
@Injectable()
export class LocationTrackerProvider {
 
  public watch: any;   
  public lat: number = 0;
  public lng: number = 0;
  private backGeolocationObserver: any;
  public backGeolocation: any;
  public location: any[];
 
  constructor(public zone: NgZone, private backgroundGeolocation: BackgroundGeolocation, private geolocation: Geolocation) {
    this.backGeolocationObserver = null;
    this.backGeolocation = Observable.create(observer => {
      this.backGeolocationObserver = observer;
    });
  }
 
  startTracking() {
    
     // Background Tracking
    
     let config: BackgroundGeolocationConfig = {
       desiredAccuracy: 0,
       stationaryRadius: 0,
       distanceFilter: 0,
       interval: 3500
     };
    
     this.backgroundGeolocation.configure(config).subscribe((location) => {
       // Run update inside of Angular's zone
       this.zone.run(() => {
         this.lat = location.latitude;
         this.lng = location.longitude;
       });
       this.location = [];
       this.location.push({key: 'lat', value: this.lat}, {key: 'lng', value: this.lng});
       this.backGeolocationObserver.next(this.location);
    
     }, (err) => {
    
       
    
     });
    
     // Turn ON the background-geolocation system.
     this.backgroundGeolocation.start();
    
    // Foreground Tracking
 
let options = {
  frequency: 3000,
  enableHighAccuracy: true
};
 
this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
 
 
 
  // Run update inside of Angular's zone
  this.zone.run(() => {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
  });
 
});
 
   }
 
   stopTracking() {
    

    
     this.backgroundGeolocation.stop();
     this.watch.unsubscribe();
    
   }
 
}