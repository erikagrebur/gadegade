import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GiRisingPicturePage } from '../gi-rising-picture/gi-rising-picture';
import { DatabaseProvider } from '../../providers/database/database';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { StorageProvider } from '../../providers/storage/storage';
import * as firebase from 'firebase';

@Component({
  selector: 'page-gi-word-search',
  templateUrl: 'gi-word-search.html',
})
export class GiWordSearchPage {
  
  typedWord : String;
  answer : String = '';
  selectedLetters : String[] = [];
  answered : Boolean = false;
  slideStyle : any = { 'color': 'rgba(148, 151, 153, 0.45)' };
  currentSelectedValue: string;
  currentSelectedIdentification: string;
  currentSelectedDivTag: any;
  currentSelectedPTag: any;
  selectedDivTags: any[] = [];
  selectedPTags: any[] = [];
  letters: string[] = [];
  paragraphs: string[] = [];
  dataElements: string[] = [];
  storedGame: string = '';
  storedCity: string = '';
  logged: boolean = false;
  availableGames: any[] = [];
  gameTitle: string = '';
  objectKeys: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseService: DatabaseProvider, private locationTracker: LocationTrackerProvider, private storageService: StorageProvider) {
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
        });
        this.databaseService.getWordSearchFromDataBase().subscribe(data => {
          
          if(this.logged) {
            this.dataElements = data[1];
          } else {
            this.dataElements = data[0];
          }

          this.answer = this.dataElements[this.storedCity][this.storedGame]['right_answer'];
          this.paragraphs = this.dataElements[this.storedCity][this.storedGame]['prgs'];
          this.letters = this.dataElements[this.storedCity][this.storedGame]['letters'];
          
          this.objectKeys = Object.keys(this.paragraphs);
          
        })
      });
    });
  }

  tapDown(giDivTag, giPTag, giValue, giIdentification) {
    if(!this.answered) {
      giDivTag.style.backgroundColor = '#ff993d';
      giPTag.style.color = '#2A2F39';
      this.currentSelectedValue = giValue;
      this.currentSelectedIdentification = giIdentification;
      this.currentSelectedDivTag = giDivTag;
      this.currentSelectedPTag = giPTag;
    }
  }

  tapUp() {
    if(!this.answered) {
      if(this.typedWord) {
        if(this.selectedLetters.indexOf(this.currentSelectedIdentification) === -1) {
          this.selectedLetters.push(this.currentSelectedIdentification);
          this.selectedDivTags.push(this.currentSelectedDivTag);
          this.selectedPTags.push(this.currentSelectedPTag);
          this.typedWord += this.currentSelectedValue;
          if(this.currentSelectedValue === this.answer[this.selectedLetters.length-1]) {
            if(this.typedWord === this.answer) {
              this.slideStyle.color = '#ff993d';
              this.answered = true;
            }
          } else { 
            for(let i=0; i < this.selectedDivTags.length; i++) {
              this.selectedDivTags[i].style.backgroundColor = '#2A2F39';
              this.selectedPTags[i].style.color = '#ff993d';
            }
            this.selectedDivTags = [];
            this.selectedLetters = [];
            this.selectedPTags = [];
            this.typedWord = undefined;
          }
        }
      } else {
        if(this.currentSelectedValue === this.answer[0]) {
          this.typedWord = this.currentSelectedValue;
          this.selectedLetters.push(this.currentSelectedIdentification);
          this.selectedDivTags.push(this.currentSelectedDivTag);
          this.selectedPTags.push(this.currentSelectedPTag);
        } else {
          this.currentSelectedDivTag.style.backgroundColor = '#2A2F39';
          this.currentSelectedPTag.style.color = '#ff993d';
        }
      }
    }
  }

  getNextGameItem() {
    if(this.answered) {
      this.answered = false;
      this.navCtrl.setRoot(GiRisingPicturePage);
    }
  }

}
