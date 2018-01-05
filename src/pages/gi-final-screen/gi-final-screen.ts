import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GiRateScreenPage } from '../gi-rate-screen/gi-rate-screen';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the GiFinalScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-gi-final-screen',
  templateUrl: 'gi-final-screen.html',
})
export class GiFinalScreenPage {

  storedGame: string = '';
  storedCity: string = '';
  logged: boolean = false;
  availableGames: any[] = [];
  gameTitle: string = '';
  objectKeys: any[] = [];
  paragraphs: string[] = [];
  dataElements: string[] = [];
  imgSrcUrl: string;
  imgName: string;
  congrat: string;
  altProp: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseService: DatabaseProvider, private storageService: StorageProvider) {
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
        });
        this.databaseService.getFinishDatasFromDataBase().subscribe(data => {
          
          if(this.logged) {
            this.dataElements = data[1];
          } else {
            this.dataElements = data[0];
          }

          this.paragraphs = this.dataElements[this.storedCity][this.storedGame]['prgs'];
          this.objectKeys = Object.keys(this.paragraphs);
          this.congrat = this.dataElements[this.storedCity][this.storedGame]['congrat'];
          this.imgName = this.dataElements[this.storedCity][this.storedGame]['img'];
          this.altProp = this.dataElements[this.storedCity][this.storedGame]['alt_prop'];

          let storageRef:any;
          if(this.logged) {
            // TODO
          } else {
            storageRef = firebase.storage().ref().child(`giFinal/try_games/${this.storedCity}/${this.storedGame}/${this.imgName}`);
          }
          storageRef.getDownloadURL().then(url => this.imgSrcUrl = url);
          
        })
      });
    });
  }

  getNextGameItem() {
    this.navCtrl.push(GiRateScreenPage);
  }

}
