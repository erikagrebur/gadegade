import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { GiWordSearchPage } from '../gi-word-search/gi-word-search';

import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { DatabaseProvider } from '../../providers/database/database';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the GameDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-game-description',
  templateUrl: 'game-description.html',
})
export class GameDescriptionPage {

  imgNames: string[] = [];
  imgAltProps: string[] = [];
  imgSrcUrls: string[] = [];
  paragraphs: string[] = [];
  logged: boolean = false;
  dataElements: string[] = [];
  storedCity: string = '';
  storedGame: string = '';
  objectKeys: any[] = [];
  gameTitle: string;
  availableGames: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform, private databaseService: DatabaseProvider, private storageService: StorageProvider) {
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
        this.databaseService.getDescriptionFromDataBase().subscribe(data => {
          
          if(this.logged) {
            this.dataElements = data[1];
          } else {
            this.dataElements = data[0];
          }

          this.imgAltProps = this.dataElements[this.storedCity][this.storedGame]['alts'];
          this.imgNames = this.dataElements[this.storedCity][this.storedGame]['imgs'];
          this.paragraphs = this.dataElements[this.storedCity][this.storedGame]['prgs'];

          this.objectKeys = Object.keys(this.paragraphs);

          if(this.logged) {
            for(let i = 0; i < this.objectKeys.length; i++) {
              if(this.imgNames[i] != "") {
                const storageRef = firebase.storage().ref().child(`giDescription/whole_games/${this.storedCity}/${this.storedGame}/${this.imgNames[i]}`);
                storageRef.getDownloadURL().then(url => this.imgSrcUrls.push(url));
              } else {
                this.imgSrcUrls.push(this.imgNames[i]);
              }
            }
          } else {
            for(let i = 0; i < this.objectKeys.length; i++) {
              if(this.imgNames[i] != "") {
                const storageRef = firebase.storage().ref().child(`giDescription/try_games/${this.storedCity}/${this.storedGame}/${this.imgNames[i]}`);
                storageRef.getDownloadURL().then(url => this.imgSrcUrls.push(url));
              } else {
                this.imgSrcUrls.push(this.imgNames[i]);
              }
            }
          }

          this.databaseService.getGamesFromDataBase().subscribe(data => {
            if(this.logged) {
              this.availableGames = data[1];
            } else {
              this.availableGames = data[0];
            }

            this.gameTitle = this.availableGames[this.storedCity][this.storedGame]['title'];
          });
          
        });    
      });
    });
  }

  getGiWordSearch() {
    this.navCtrl.setRoot(GiWordSearchPage);
  }

  ionViewDidLoad() {
   
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
