import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SliderScreenPage } from '../pages/slider-screen/slider-screen';
import * as firebase from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';
import { StorageProvider } from '../providers/storage/storage';
import { CityPickerPage } from '../pages/city-picker/city-picker';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storageService: StorageProvider) {
    var config = {
      apiKey: "AIzaSyB6Kyact4Y6iooiaKHPaFXCEmTl8DtlACY",
      authDomain: "tryagain-b5737.firebaseapp.com",
      databaseURL: "https://tryagain-b5737.firebaseio.com",
      projectId: "tryagain-b5737",
      storageBucket: "tryagain-b5737.appspot.com",
      messagingSenderId: "158844905597"
    };

    firebase.initializeApp(config);
    platform.ready().then(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged( user => {
        if (!user) {
          this.rootPage = SliderScreenPage;
          unsubscribe();
        } else { 
          this.storageService.getData('selectedCity').subscribe(store => {
            if(store) {
              this.rootPage = TabsPage;
            } else {
              this.rootPage = CityPickerPage;
            }
            unsubscribe();
          });
        }
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
