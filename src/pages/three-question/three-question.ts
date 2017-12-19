import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GiMixedWordsPage } from '../gi-mixed-words/gi-mixed-words';

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

  firstOptions: string[] = ['Volstagg','Heimdall','Pista'];
  secondOptions: string[] = ['Hogun','Odin','Pukka'];
  thirdOptions: string[] = ['Jotunheim','Fehérvár','SOD'];

  answer: number[] = [0, 1, 0]; 
  answered: boolean = false;

  currentFirstOptionIndex: number;
  currentSecondOptionIndex: number;
  currentThirdOptionIndex: number;

  /*nextFirstBool: boolean = true;
  prevFirstBool: boolean = true;
  nextSecondBool: boolean = true;
  prevSecondBool: boolean = true;
  nextThirdBool: boolean = true;
  prevThirdBool: boolean = true;*/

  slideStyle: any = {'color': 'rgba(148, 151, 153, 0.45)'}
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    this.currentFirstOptionIndex = Math.floor(Math.random() * this.firstOptions.length);
    this.currentSecondOptionIndex = Math.floor(Math.random() * this.secondOptions.length);
    this.currentThirdOptionIndex = Math.floor(Math.random() * this.thirdOptions.length);
    console.log(this.currentFirstOptionIndex);
  }

  getNextFirstOption() {
    if(!this.answered) {
      if(this.currentFirstOptionIndex === this.firstOptions.length - 1) {
        this.currentFirstOptionIndex = 0;
      } else {
        this.currentFirstOptionIndex += 1;
      } 
    }
    /*if(this.nextFirstBool && !this.answered) {
      this.currentFirstOptionIndex += 1;
      if(this.currentFirstOptionIndex === this.firstOptions.length - 1) {
        this.nextFirstBool = false;
        firstRightArrow'.style.background = 'rgba(148, 151, 153, 0.45)';
      } else if (this.currentFirstOptionIndex === 1) {
        firstRightArrow'.style.background = '#ff993d';
        this.prevFirstBool = true;
      }
    }*/
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
    /*if(this.prevFirstBool && !this.answered) {
      this.currentFirstOptionIndex -= 1;
      if(this.currentFirstOptionIndex === 0) {
        this.prevFirstBool = false;
        document.getElementById('firstLeftArrow').style.background = 'rgba(148, 151, 153, 0.45)';
      } else if(this.currentFirstOptionIndex === this.firstOptions.length - 2) {
        document.getElementById('firstRightArrow').style.background = '#ff993d';
        this.nextFirstBool = true;
      }
    }*/
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
