import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { LogInScreenPage } from '../log-in-screen/log-in-screen';

import * as firebase from 'firebase';
import { NavController } from 'ionic-angular/navigation/nav-controller';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root: any;

  constructor(public navCtrl: NavController) {
    this.getAuth();
  }

  getAuth() {
    firebase.auth().onAuthStateChanged( user => {
      if (!user) {
        this.tab3Root = LogInScreenPage;
        console.log("usernincs")
      } else { 
        console.log("uservan")
        
        this.tab3Root = ProfilePage;
      }
    });
  }

  ionViewWillEnter() { 
    console.log("lefutbazmeg", this.tabRef);
    this.tabRef.select(0);
    console.log("selectután", this.tabRef);
  }
}
