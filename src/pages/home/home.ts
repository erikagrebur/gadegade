import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GameDetailsPage } from '../game-details/game-details';
import { CityPickerPage } from '../city-picker/city-picker';
import { SignUpScreenPage } from '../sign-up-screen/sign-up-screen';
import { StorageProvider } from '../../providers/storage/storage';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';

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
  Math: any

  constructor(public navCtrl: NavController, private storageService: StorageProvider, private databaseService: DatabaseProvider) {
    this.Math = Math;
    this.storageService.getData('selectedCity').subscribe(store => {
      this.selectedCity = store;
      console.log('store', store);
      this.databaseService.getGamesFromDataBase().subscribe(data => {
        console.log(data)
  
        if(this.logged) {
          this.availableGames = data[1];
        } else {
          this.availableGames = data[0];
        }
        
        console.log('logged', this.availableGames);
        console.log(this.selectedCity)
        this.selectedCityGames = this.availableGames[this.selectedCity];
        this.objectKeys = Object.keys(this.selectedCityGames);
  
        if(this.logged) {
          //whole games
        } else {
          for (let i = 1; i <= this.objectKeys.length; i++) {
            let aux = '';
            if (i < 10) {
              aux = 'game_0' + i;
            } else {
              aux = 'game_' + i;
            }
            
            console.log('tömb', this.selectedCityGames[aux]);
            const storageRef = firebase.storage().ref().child(`games/try_games/${this.selectedCity}/game_${i}/${this.selectedCityGames[aux].background_img}`);
            storageRef.getDownloadURL().then(url => {
              console.log('url', url);
              this.selectedCityGames[aux]['background_img_url'] = url;
              console.log('ukép url címe', this.selectedCityGames[aux]['background_img_url']);
              console.log('storageRef', storageRef);
              let path = this.selectedCity.concat('.', aux, '.background_img_url');
              this.databaseService.updateGames('try_games', this.selectedCity, aux, url);
            });
           
          }
        }
  
        console.log(this.selectedCityGames);
      });
    });
  }

  getGameDetails(id) {
    this.storageService.setData('selectedGame', id).subscribe(() => this.navCtrl.push(GameDetailsPage));
  }

  ionViewWillEnter() {
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

}
