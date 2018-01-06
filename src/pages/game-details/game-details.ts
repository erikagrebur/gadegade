import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { HomePage } from '../home/home';
import { GiStartGamePage } from '../gi-start-game/gi-start-game';
import { DatabaseProvider } from '../../providers/database/database';
import { StorageProvider } from '../../providers/storage/storage';
import { SearchPage } from '../search/search';
import { ProfilePage } from '../profile/profile';
import * as firebase from 'firebase';

/**
 * Generated class for the GameDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-game-details',
  templateUrl: 'game-details.html',
})
export class GameDetailsPage {

  storedGame: string = '';
  storedCity: string = '';
  logged: boolean = false;
  availableGames: any[] = [];
  selectedGame: any[] = [];
  Math: any;

  constructor(public navCtrl: NavController,private app: App, public navParams: NavParams, private databaseService: DatabaseProvider, private storageService: StorageProvider) {
    this.Math = Math;
    firebase.auth().onAuthStateChanged(user => {
      if(!user) {
        this.logged = false;
      } else {
        this.logged = true;
      }
    });
    this.storageService.getData('selectedCity').subscribe(storedCity => {
      this.storedCity = storedCity;
      this.storageService.getData('selectedGame').subscribe(storedGame => {
        this.storedGame = storedGame;
        this.databaseService.getGamesFromDataBase().subscribe(data => {
          if(this.logged) {
            this.availableGames = data[1];
          } else {
            this.availableGames = data[0];
          }

          this.selectedGame = this.availableGames[this.storedCity][this.storedGame];
        });
      });
    });
  }

  getStartGame() {
    this.navCtrl.push(GiStartGamePage);
  }

  getHomePage() {
    this.app.getRootNav().getActiveChildNav().select(0);
  }

  getSearchPage() {
    this.app.getRootNav().getActiveChildNav().select(1);
  }

  getProfilePage() {
    this.app.getRootNav().getActiveChildNav().select(2);
  }

  ionViewWillEnter() {
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(56px)';
        tabs[ key ].style.display = 'none';
      });
    } // end if
  }
  
}
