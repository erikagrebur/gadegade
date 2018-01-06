import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { StorageProvider } from '../../providers/storage/storage';
import { GameDetailsPage } from '../game-details/game-details';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { PopoverPage } from '../popover/popover';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  user: any[] = [];
  objectKeys: any[] = [];
  cityNames: string[] = [];
  gameNames: string[] = [];
  playedGames: any[] = [];
  playedGamesCount: number;

  constructor(public navCtrl: NavController, private databaseService: DatabaseProvider, private storageService: StorageProvider, public popover: PopoverController) {
    this.storageService.setData('token', '123').subscribe(token => {
      this.storageService.getData('token').subscribe(store => {
        let token='';
        let user: any[] = [];
        token = store;
        this.databaseService.getUsersFromDataBase().subscribe(data => {
          
          console.log('local token', token);
          data.forEach(function(value, key) {
            console.log('adatb token', value['token']);
            console.log('adatb', value);
            if(token == value['token']) {
              user = value;
            }
          });
          this.user = user;
          this.gameNames = this.user['completed_games']['games_name'];
          this.cityNames = this.user['completed_games']['games_city'];
          this.objectKeys = Object.keys(this.cityNames);
          this.playedGamesCount = this.objectKeys.length;
          
          this.databaseService.getGamesFromDataBase().subscribe(games => {
            console.log('games', games[1]);
            console.log(this.objectKeys);
            for(let i = 0; i < this.objectKeys.length; i++) {
              console.log('hozzaadott', games[0][this.cityNames[i]][this.gameNames[i]])
              console.log(this.cityNames[i])
              console.log(this.gameNames[i])
              this.playedGames.push(games[0][this.cityNames[i]][this.gameNames[i]]);
            }
            console.log('played', this.playedGames)
          });
        });
      });
    });
  }

  getDetails(city, game) {
    this.storageService.setData('selectedCity', city).subscribe(() => {
      this.storageService.setData('selectedGame', game).subscribe(() => {
        this.navCtrl.push(GameDetailsPage);
      });  
    });
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

  showMenu(myEvent) {
    let popover = this.popover.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
}
