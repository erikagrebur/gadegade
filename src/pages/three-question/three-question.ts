import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GiMixedWordsPage } from '../gi-mixed-words/gi-mixed-words';
import { DatabaseProvider } from '../../providers/database/database';
import { StorageProvider } from '../../providers/storage/storage';
import * as firebase from 'firebase';

@Component({
  selector: 'page-three-question',
  templateUrl: 'three-question.html',
})
export class ThreeQuestionPage {

  firstOptions: string[] = [];
  secondOptions: string[] = [];
  thirdOptions: string[] = [];

  answers: number[] = []; 
  answered: boolean = false;

  currentFirstOptionIndex: number;
  currentSecondOptionIndex: number;
  currentThirdOptionIndex: number;

  slideStyle: any = {'color': 'rgba(148, 151, 153, 0.45)'}

  storedGame: string = '';
  storedCity: string = '';
  logged: boolean = false;
  availableGames: any[] = [];
  gameTitle: string = '';
  objectKeys: any[] = [];
  paragraphs: string[] = [];
  dataElements: string[] = [];
  answerOptions: string[] = [];
  questions: string[];

  firstOptionKeys: any[] = [];
  secondOptionKeys: any[] = [];
  thirdOptionKeys: any[] = [];
  
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
        });
        this.databaseService.getThreeQuestionFromDataBase().subscribe(data => {
          
          if(this.logged) {
            this.dataElements = data[1];
          } else {
            this.dataElements = data[0];
          }

          this.paragraphs = this.dataElements[this.storedCity][this.storedGame]['prgs'];
          this.questions =  this.dataElements[this.storedCity][this.storedGame]['questions'];
          this.objectKeys = Object.keys(this.paragraphs);
          this.firstOptions = this.dataElements[this.storedCity][this.storedGame]['answer_options'][0];
          this.secondOptions = this.dataElements[this.storedCity][this.storedGame]['answer_options'][1];
          this.thirdOptions = this.dataElements[this.storedCity][this.storedGame]['answer_options'][2];
          this.answers = this.dataElements[this.storedCity][this.storedGame]['right_answers'];

          this.firstOptionKeys = Object.keys(this.firstOptions);
          this.secondOptionKeys = Object.keys(this.secondOptions);
          this.thirdOptionKeys = Object.keys(this.thirdOptions);

          this.currentFirstOptionIndex = Math.floor(Math.random() * this.firstOptionKeys.length);
          this.currentSecondOptionIndex = Math.floor(Math.random() * this.secondOptionKeys.length);
          this.currentThirdOptionIndex = Math.floor(Math.random() * this.thirdOptionKeys.length);
          this.checkAnswers();
        })
      });
    });
  }

  getPrevOption(element) {
    if(!this.answered) {
      switch (element) {
        case 'firstOption':
          if(this.currentFirstOptionIndex === 0) {
            this.currentFirstOptionIndex = this.firstOptionKeys.length - 1;
          } else {
            this.currentFirstOptionIndex -= 1;
          }
        break;
        case 'secondOption':
          if(this.currentSecondOptionIndex === 0) {
            this.currentSecondOptionIndex = this.secondOptionKeys.length - 1;
          } else {
            this.currentSecondOptionIndex -= 1;
          }
        break;
        case 'thirdOption':
          if(this.currentThirdOptionIndex === 0) {
            this.currentThirdOptionIndex = this.thirdOptionKeys.length - 1;
          } else {
            this.currentThirdOptionIndex -= 1;
          }
        break;
      }
      this.checkAnswers();
    }
  }
  
  getNextOption(element) {
    if(!this.answered) {
      switch (element) {
        case 'firstOption':
          if(this.currentFirstOptionIndex === this.firstOptionKeys.length - 1) {
            this.currentFirstOptionIndex = 0;
          } else {
            this.currentFirstOptionIndex += 1;
          }
        break;
        case 'secondOption':
          if(this.currentSecondOptionIndex === this.secondOptionKeys.length - 1) {
            this.currentSecondOptionIndex = 0;
          } else {
            this.currentSecondOptionIndex += 1;
          }
        break;
        case 'thirdOption':
          if(this.currentThirdOptionIndex === this.thirdOptionKeys.length - 1) {
            this.currentThirdOptionIndex = 0;
          } else {
            this.currentThirdOptionIndex += 1;
          }
        break;
      }
      this.checkAnswers(); 
    }
  }

  checkAnswers() {

    if(
      this.currentFirstOptionIndex === this.answers[0] &&
      this.currentSecondOptionIndex === this.answers[1] &&
      this.currentThirdOptionIndex === this.answers[2]
    ) {
      this.answered = true;
      this.slideStyle.color = '#ff993d';
    }
  }

  getNexGameItem() {
    if(this.answered) {
      this.navCtrl.setRoot(GiMixedWordsPage);
    }
  }

}
