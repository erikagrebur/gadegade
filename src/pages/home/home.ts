import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GameDetailsPage } from '../game-details/game-details';
import { CityPickerPage } from '../city-picker/city-picker';
import { SignUpScreenPage } from '../sign-up-screen/sign-up-screen';
import { StorageProvider } from '../../providers/storage/storage';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';
import { LogInScreenPage } from '../log-in-screen/log-in-screen';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selectedCity: string = '';
  logged: boolean = false;
  availableGames: any[] = [];
  objectKeys: string[] = [];
  selectedCityGames: any[] = [];
  Math: any;

  constructor(public navCtrl: NavController, private storageService: StorageProvider, private databaseService: DatabaseProvider) {
    this.Math = Math;
    this.showContent();
  }

  getGameDetails(id) {
    this.storageService.setData('selectedGame', id).subscribe(() => this.navCtrl.push(GameDetailsPage));
  }

  showContent() {
    firebase.auth().onAuthStateChanged(user => {
      if(!user) {
        this.logged = false;
      } else {
        this.logged = true;
      }
    });
    this.storageService.getData('selectedCity').subscribe(store => {
      this.selectedCity = store;
      this.databaseService.getGamesFromDataBase().subscribe(data => {
        if(this.logged) {
          this.availableGames = data[1];
        } else {
          this.availableGames = data[0];
        }

        this.selectedCityGames = this.availableGames[this.selectedCity];
        this.objectKeys = Object.keys(this.selectedCityGames);
  
        if(this.logged) {
          for (let i = 1; i <= this.objectKeys.length; i++) {
            let aux = '';
            if (i < 10) {
              aux = 'game_0' + i;
            } else {
              aux = 'game_' + i;
            }
            
            const storageRef = firebase.storage().ref().child(`games/whole_games/${this.selectedCity}/game_${i}/${this.selectedCityGames[aux].background_img}`);
            storageRef.getDownloadURL().then(url => {
              this.selectedCityGames[aux]['background_img_url'] = url;
              let path = this.selectedCity.concat('.', aux, '.background_img_url');
              this.databaseService.updateGames('whole_games', this.selectedCity, aux, url);
            });
           
          }
        } else {
          for (let i = 1; i <= this.objectKeys.length; i++) {
            let aux = '';
            if (i < 10) {
              aux = 'game_0' + i;
            } else {
              aux = 'game_' + i;
            }
            
            const storageRef = firebase.storage().ref().child(`games/try_games/${this.selectedCity}/game_${i}/${this.selectedCityGames[aux].background_img}`);
            storageRef.getDownloadURL().then(url => {
              this.selectedCityGames[aux]['background_img_url'] = url;
              let path = this.selectedCity.concat('.', aux, '.background_img_url');
              this.databaseService.updateGames('try_games', this.selectedCity, aux, url);
            });
           
          }
        }
      });
    });
  }

  ionViewWillEnter() {
    this.showContent();
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(0)';
        tabs[ key ].style.display = 'flex';
      });
    } // end if
  }

  getSelectPage() {
    this.navCtrl.push(CityPickerPage);
  }

  getRegistrationPage() {
    this.navCtrl.push(SignUpScreenPage);
  }

  getLoginPage() {
    this.navCtrl.push(LogInScreenPage);
  }

}
