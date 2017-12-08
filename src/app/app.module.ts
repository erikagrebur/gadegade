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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

export const firebaseConfig = {
  apiKey: "AIzaSyC3y38y8eF4FFtHCprNC9N2yeLXCBYNSO4",
  authDomain: "trytry-88c62.firebaseapp.com",
  databaseURL: "https://trytry-88c62.firebaseio.com",
  projectId: "trytry-88c62",
  storageBucket: "trytry-88c62.appspot.com",
  messagingSenderId: "48329241262"
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
    GiStartGamePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
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
    GiStartGamePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
