import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { GameDetailsPage } from '../pages/game-details/game-details';
import { GameDescriptionPage } from '../pages/game-description/game-description';
import { GiWordSearchPage } from '../pages/gi-word-search/gi-word-search';
import { GiStartGamePage } from '../pages/gi-start-game/gi-start-game';
import { GiRisingPicturePage } from '../pages/gi-rising-picture/gi-rising-picture';
import { SliderScreenPage } from '../pages/slider-screen/slider-screen';
import { ThreeQuestionPage } from '../pages/three-question/three-question';
import { GiMixedWordsPage } from '../pages/gi-mixed-words/gi-mixed-words';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { DatabaseProvider } from '../providers/database/database';

import { GoogleMaps } from '@ionic-native/google-maps';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

export const firebaseConfig = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC3y38y8eF4FFtHCprNC9N2yeLXCBYNSO4",
    authDomain: "trytry-88c62.firebaseapp.com",
    databaseURL: "https://trytry-88c62.firebaseio.com",
    projectId: "trytry-88c62",
    storageBucket: "trytry-88c62.appspot.com",
    messagingSenderId: "48329241262"
  }
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    GameDetailsPage,
    GameDescriptionPage,
    GiWordSearchPage,
    GiStartGamePage,
    GiRisingPicturePage,
    SliderScreenPage,
    ThreeQuestionPage,
    GiMixedWordsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    GameDetailsPage,
    GameDescriptionPage,
    GiWordSearchPage,
    GiStartGamePage,
    GiRisingPicturePage,
    SliderScreenPage,
    ThreeQuestionPage,
    GiMixedWordsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationTrackerProvider,
    Geolocation,
    BackgroundGeolocation,
    DatabaseProvider,
    GoogleMaps
  ]
})
export class AppModule {}
