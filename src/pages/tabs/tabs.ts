import { Component, ViewChild } from '@angular/core';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';

import * as firebase from 'firebase';
import { NavController } from 'ionic-angular/navigation/nav-controller';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root: any;

  constructor(public navCtrl: NavController) {
    this.getAuth();
  }

  getAuth() {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.tab3Root = ProfilePage;  
      }
    });
  }
}
