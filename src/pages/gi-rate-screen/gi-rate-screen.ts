import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignUpScreenPage } from '../sign-up-screen/sign-up-screen';
import { DatabaseProvider } from '../../providers/database/database';
import { StorageProvider } from '../../providers/storage/storage';
import * as firebase from 'firebase';
import { HomePage } from '../home/home';

/**
 * Generated class for the GiRateScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-gi-rate-screen',
  templateUrl: 'gi-rate-screen.html',
})
export class GiRateScreenPage {

  stars: any[] = [];
  isVoted: boolean = false;
  storedGame: string = '';
  storedCity: string = '';
  logged: boolean = false;
  availableGames: any[] = [];
  gameTitle: string = '';
  dataElements: string[] = [];
  emptyStarSrcUrl: string;
  fullStarSrcUrl: string;
  emptyStar: string;
  fullStar: string;
  numberOfVotes: number;
  valueOfVotes: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseService: DatabaseProvider, private storageService: StorageProvider) {
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

          this.gameTitle = this.availableGames[this.storedCity][this.storedGame]['title'];
          this.valueOfVotes = this.availableGames[this.storedCity][this.storedGame]['value_of_votes'];
          this.numberOfVotes = this.availableGames[this.storedCity][this.storedGame]['number_of_votes'];
        });
        this.databaseService.getRatingFromDataBase().subscribe(data => {
          
          if(this.logged) {
            this.dataElements = data[1];
          } else {
            this.dataElements = data[0];
          }

          this.emptyStar = this.dataElements[this.storedCity][this.storedGame]['empty_star'];
          this.fullStar = this.dataElements[this.storedCity][this.storedGame]['full_star'];

          let storageRefEmpty:any;
          let storageRefFull:any;
          if(this.logged) {
            storageRefEmpty = firebase.storage().ref().child(`giRating/whole_games/${this.storedCity}/${this.storedGame}/${this.emptyStar}`);
            storageRefFull = firebase.storage().ref().child(`giRating/whole_games/${this.storedCity}/${this.storedGame}/${this.fullStar}`);
          } else {
            storageRefEmpty = firebase.storage().ref().child(`giRating/try_games/${this.storedCity}/${this.storedGame}/${this.emptyStar}`);
            storageRefFull = firebase.storage().ref().child(`giRating/try_games/${this.storedCity}/${this.storedGame}/${this.fullStar}`);
          }
          storageRefEmpty.getDownloadURL().then(url => {
            this.emptyStarSrcUrl = url;
            for(let i = 1; i < 6; i++) {
              this.stars.push(
                {id: i, src: this.emptyStarSrcUrl});
            }
          });
          storageRefFull.getDownloadURL().then(url => this.fullStarSrcUrl = url);
        })
      });
    });
  }

  getSignUpScreen() {
    this.navCtrl.push(SignUpScreenPage);
  }

  setRate(id) {
    if(!this.isVoted) {
      for(let i = 0; i < id; i++) {
        this.stars[i].src = this.fullStarSrcUrl;
      }
      this.numberOfVotes += 1;
      this.valueOfVotes += id;
      if(this.logged) {
        this.databaseService.evaluation('whole_games', this.storedCity, this.storedGame, this.valueOfVotes, this.numberOfVotes);
      } else {
        this.databaseService.evaluation('try_games', this.storedCity, this.storedGame, this.valueOfVotes, this.numberOfVotes);
      }
      this.isVoted = true;
      setTimeout(() => {
        this.navCtrl.setRoot(HomePage);
      }, 1000);
    }
  }

  getHomeScreen() {
    this.navCtrl.push(HomePage);
  }

}
