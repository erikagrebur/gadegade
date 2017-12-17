import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GiRisingPicturePage } from '../gi-rising-picture/gi-rising-picture';

/**
 * Generated class for the GiWordSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-gi-word-search',
  templateUrl: 'gi-word-search.html',
})
export class GiWordSearchPage {
  typedWord : String;
  //answer : String = 'MJOLNIR';
  answer : String = 'MJ';
  selectedLetters : String[] = [];
  answered : Boolean = false;
  slideStyle : any = { 'color': 'rgba(148, 151, 153, 0.45)' };
  letterDivStyle : any = {'backgroundColor': '#2A2F39'};
  letterStyle : any = {'color': '#ff993d'};
  currentSquare: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewWillEnter() {
      /*for(let i = 0; i < document.getElementsByClassName('wordSearchPad')[0].getElementsByTagName('div').length; i++) {
        document.getElementsByClassName('wordSearchPad')[0].getElementsByTagName('div')[i].style.backgroundColor = "#2A2F39";
      }
      for(let i = 0; i < document.getElementsByClassName('wordSearchItem').length; i++) {
        document.getElementsByClassName('wordSearchItem')[i].getElementsByTagName('p')[0].style.color = "#ff993d";
      }*/
      /*this.selectedLetters = [];
      this.typedWord = undefined;
      this.answered = false;*/
  }

  tapDown(letter) {
    letter.style.backgroundColor = '#ff993d';
    letter.style.color = '#2A2F39';
    
    console.info(letter);
    /*if(!this.answered) {
      console.log("mükszikBent");
      this.currentSquare = letter;
      console.log("sqr",this.currentSquare);
      this.letterDivStyle = '#ff993d';
      this.letterStyle = '#2A2F39';
    }*/
  }

  tapUp() {

  }

  /*tapDown(e) {
    if(!this.answered) {
      this.currentSquare = e;
      this.letterDivStyle.backgroundColor = '#ff993d';
      this.letterStyle.color = '#2A2F39';
      
    }
  }

  tapUp(e, value) {
    if(!this.answered) {
      if(this.typedWord) {
        if(this.selectedLetters.indexOf(e) === -1) {
          this.selectedLetters.push(e);
          this.typedWord += value;
          if(value === this.answer[this.selectedLetters.length - 1]) {
            if(this.typedWord === this.answer) {
              
              this.slideStyle.color = '#ff993d';
              this.answered = true;
            }
          } else {
            for(let i =0; i < this.typedWord.length; i++) {
              this.currentSquare = this.typedWord[i];
            }
            this.selectedLetters = [];
            this.typedWord = undefined;
          }
        }
      } else {
        if(value === this.answer[0]) {
          this.typedWord = value;
          this.selectedLetters.push(e);
        } else {
          this.currentSquare = value;
        }
      }
    }
  } */

  getNextGameItem() {
    /*if(this.answered) {
      this.answered = false;*/
      this.navCtrl.push(GiRisingPicturePage);
    /*}*/
  }

}
