import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GiMixedWordsPage } from '../gi-mixed-words/gi-mixed-words';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the ThreeQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-three-question',
  templateUrl: 'three-question.html',
})
export class ThreeQuestionPage {

  database: string[] = [];
  firstOptions: string[] = ["Volstagg", "Heimdall", "Sith"];
  secondOptions: string[] = ["Odin", "Ace", "Hogun"];
  thirdOptions: string[] = ["Jotunheim", "Earth", "Kree"];

  answer: number[] = [1, 0, 0]; 
  answered: boolean = false;

  currentFirstOptionIndex: number;
  currentSecondOptionIndex: number;
  currentThirdOptionIndex: number;

  slideStyle: any = {'color': 'rgba(148, 151, 153, 0.45)'}
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseService: DatabaseProvider) {
    
  }

  ionViewDidLoad() {
    this.currentFirstOptionIndex = Math.floor(Math.random() * this.firstOptions.length);
    this.currentSecondOptionIndex = Math.floor(Math.random() * this.secondOptions.length);
    this.currentThirdOptionIndex = Math.floor(Math.random() * this.thirdOptions.length);
    console.log(this.currentFirstOptionIndex);
    
    this.databaseService.getThreeQuestionFromDataBase().subscribe(data => {
      this.database = data;
      console.log('jönátt?', this.database);
      console.log("data", data);
    });
  }

  getNextFirstOption() {
    if(!this.answered) {
      if(this.currentFirstOptionIndex === this.firstOptions.length - 1) {
        this.currentFirstOptionIndex = 0;
      } else {
        this.currentFirstOptionIndex += 1;
      } 
    }
    this.checkAnswers();
  }

  getPrevFirstOption() {
    if(!this.answered) {
      if(this.currentFirstOptionIndex === 0) {
        this.currentFirstOptionIndex = this.firstOptions.length - 1;
      } else {
        this.currentFirstOptionIndex -= 1;
      } 
    }
    this.checkAnswers();
  }

  getNextSecondOption() {
    if(!this.answered) {
      if(this.currentSecondOptionIndex === this.firstOptions.length - 1) {
        this.currentSecondOptionIndex = 0;
      } else {
        this.currentSecondOptionIndex += 1;
      } 
    }
    this.checkAnswers();
  }

  getPrevSecondOption() {
    if(!this.answered) {
      if(this.currentSecondOptionIndex === 0) {
        this.currentSecondOptionIndex = this.firstOptions.length - 1;
      } else {
        this.currentSecondOptionIndex -= 1;
      } 
    }
    this.checkAnswers();
  }

  getNextThirdOption() {
    if(!this.answered) {
      if(this.currentThirdOptionIndex === this.firstOptions.length - 1) {
        this.currentThirdOptionIndex = 0;
      } else {
        this.currentThirdOptionIndex += 1;
      } 
    }
    this.checkAnswers();
  }

  getPrevThirdOption() {
    if(!this.answered) {
      if(this.currentThirdOptionIndex === 0) {
        this.currentThirdOptionIndex = this.firstOptions.length - 1;
      } else {
        this.currentThirdOptionIndex -= 1;
      } 
    }
    this.checkAnswers();
  }

  checkAnswers() {
    if(
      this.currentFirstOptionIndex === this.answer[0] &&
      this.currentSecondOptionIndex === this.answer[1] &&
      this.currentThirdOptionIndex === this.answer[2]
    ) {
      console.log('cond1', this.currentFirstOptionIndex, this.answer[0]);
      console.log('cond2', this.currentSecondOptionIndex, this.answer[1]);
      console.log('cond3', this.currentThirdOptionIndex, this.answer[2]);
      this.answered = true;
      this.slideStyle.color = '#ff993d';
    }
  }

  getNexGameItem() {
    if(this.answered) {
      this.navCtrl.push(GiMixedWordsPage);
    }
  }

}
