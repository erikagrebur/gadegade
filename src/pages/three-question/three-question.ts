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

  currentFirstOptionIndex: number;
  currentSecondOptionIndex: number;
  currentThirdOptionIndex: number;

  nextFirstBool: boolean = true;
  prevFirstBool: boolean = true;
  nextSecondBool: boolean = true;
  prevSecondBool: boolean = true;
  nextThirdBool: boolean = true;
  prevThirdBool: boolean = true;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    this.currentFirstOptionIndex = 1;
    this.currentSecondOptionIndex = 1;
    this.currentThirdOptionIndex = 1;
  }

  getNextFirstOption() {
    if(this.nextFirstBool) {
      console.log("főfele");
      this.currentFirstOptionIndex += 1;
      if(this.currentFirstOptionIndex === this.firstOptions.length - 1) {
        this.nextFirstBool = false;
        document.getElementById('firstRightArrow').style.background = 'rgba(148, 151, 153, 0.45)';
      } else if (this.currentFirstOptionIndex === 1) {
        document.getElementById('firstLeftArrow').style.background = '#ff993d';
        this.prevFirstBool = true;
      }
    }
  }

  getPrevFirstOption() {
    if(this.prevFirstBool) {
      console.log("lefelő");
      this.currentFirstOptionIndex -= 1;
      if(this.currentFirstOptionIndex === 0) {
        this.prevFirstBool = false;
        document.getElementById('firstLeftArrow').style.background = 'rgba(148, 151, 153, 0.45)';
      } else if(this.currentFirstOptionIndex === this.firstOptions.length - 2) {
        document.getElementById('firstRightArrow').style.background = '#ff993d';
        this.nextFirstBool = true;
      }
    }
  }

  getNextSecondOption() {
    if(this.nextSecondBool) {
      console.log("főfele");
      this.currentSecondOptionIndex += 1;
      if(this.currentSecondOptionIndex === this.secondOptions.length - 1) {
        this.nextSecondBool = false;
        document.getElementById('secondRightArrow').style.background = 'rgba(148, 151, 153, 0.45)';
      } else if (this.currentSecondOptionIndex === 1) {
        document.getElementById('secondLeftArrow').style.background = '#ff993d';
        this.prevSecondBool = true;
      }
    }
  }

  getPrevSecondOption() {
    if(this.prevSecondBool) {
      console.log("lefelő");
      this.currentSecondOptionIndex -= 1;
      if(this.currentSecondOptionIndex === 0) {
        this.prevSecondBool = false;
        document.getElementById('secondLeftArrow').style.background = 'rgba(148, 151, 153, 0.45)';
      } else if(this.currentSecondOptionIndex === this.secondOptions.length - 2) {
        document.getElementById('secondRightArrow').style.background = '#ff993d';
        this.nextSecondBool = true;
      }
    }
  }

  getNextThirdOption() {
    if(this.nextThirdBool) {
      console.log("főfele");
      this.currentThirdOptionIndex += 1;
      if(this.currentThirdOptionIndex === this.thirdOptions.length - 1) {
        this.nextThirdBool = false;
        document.getElementById('thirdRightArrow').style.background = 'rgba(148, 151, 153, 0.45)';
      } else if (this.currentThirdOptionIndex === 1) {
        document.getElementById('thirdLeftArrow').style.background = '#ff993d';
        this.prevThirdBool = true;
      }
    }
  }

  getPrevThirdOption() {
    if(this.prevThirdBool) {
      console.log("lefelő");
      this.currentThirdOptionIndex -= 1;
      if(this.currentThirdOptionIndex === 0) {
        this.prevThirdBool = false;
        document.getElementById('thirdLeftArrow').style.background = 'rgba(148, 151, 153, 0.45)';
      } else if(this.currentThirdOptionIndex === this.thirdOptions.length - 2) {
        document.getElementById('thirdRightArrow').style.background = '#ff993d';
        this.nextThirdBool = true;
      }
    }
  }

  getNexGameItem() {
    this.navCtrl.push(GiMixedWordsPage);
  }

}
