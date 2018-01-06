import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SliderScreenPage } from '../pages/slider-screen/slider-screen';
import { GiObscureImgPage } from '../pages/gi-obscure-img/gi-obscure-img';
import { GiFinalScreenPage } from '../pages/gi-final-screen/gi-final-screen';
import { HomePage } from '../pages/home/home';
import { GiRateScreenPage } from '../pages/gi-rate-screen/gi-rate-screen';
import { GiStartGamePage } from '../pages/gi-start-game/gi-start-game';
import { GiMixedWordsPage } from '../pages/gi-mixed-words/gi-mixed-words';
import { GiWordSearchPage } from '../pages/gi-word-search/gi-word-search';
import { GameDescriptionPage } from '../pages/game-description/game-description';
import { ThreeQuestionPage } from '../pages/three-question/three-question';
import * as firebase from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
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
          console.log("user", user);
          this.rootPage = TabsPage;
          unsubscribe();
        }
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
