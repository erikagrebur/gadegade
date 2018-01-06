import { Component } from '@angular/core';

import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { LogInScreenPage } from '../log-in-screen/log-in-screen';

import * as firebase from 'firebase';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root: any;

  constructor() {
    firebase.auth().onAuthStateChanged( user => {
      if (!user) {
        this.tab3Root = LogInScreenPage;
      } else { 
        this.tab3Root = ProfilePage;
      }
    });
  }
}
