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

  userData: any[] = [];
  objectKeys: any[] = [];
  cityNames: string[] = [];
  gameNames: string[] = [];
  playedGames: any[] = [];
  playedGamesCount: number;

  constructor(public navCtrl: NavController, private databaseService: DatabaseProvider, private storageService: StorageProvider, public popover: PopoverController) {
      this.storageService.getData('signedEmail').subscribe(store => {
        let signedEmail = '';
        let userData = [];
        signedEmail = store;
        this.databaseService.getUsersFromDataBase().subscribe(data => {
          
          data.forEach(function(value, key) {
            if(signedEmail == value['email']) {
              userData = value;
            }
          });
          this.userData = userData;
          this.gameNames = this.userData['completed_games']['games_name'];
          this.cityNames = this.userData['completed_games']['games_city'];
          this.objectKeys = Object.keys(this.cityNames);
          this.playedGamesCount = this.objectKeys.length;
          
          this.databaseService.getGamesFromDataBase().subscribe(games => {
            for(let i = 0; i < this.objectKeys.length; i++) {
              this.playedGames.push(games[0][this.cityNames[i]][this.gameNames[i]]);
            }
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
