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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SliderScreenPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
