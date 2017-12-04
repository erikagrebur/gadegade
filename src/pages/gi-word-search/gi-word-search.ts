import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

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
  answer : String = 'MJOLNIR';
  selectedLetters : String[] = [];
  answered : Boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  tapDown(e) {
    if(!this.answered) {
      document.getElementById(e).style.backgroundColor = "#ff993d";
      document.getElementById(e).getElementsByTagName("p")[0].style.color = "#2A2F39";
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
              document.getElementById("slide").style.color = "#ff993d";
              this.answered = true;
            }
          } else {
            for(let i =0; i < this.selectedLetters.length; i++) {
              document.getElementById(this.selectedLetters[i].toString()).style.backgroundColor = "#2A2F39";
              document.getElementById(this.selectedLetters[i].toString()).getElementsByTagName('p')[0].style.color = "#ff993d";
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
          document.getElementById(e).style.backgroundColor = "#2A2F39";
          document.getElementById(e).getElementsByTagName("p")[0].style.color = "#ff993d";
        }
      }
  
      console.log("type: " + this.typedWord);
    }
  }

  getNextGameItem() {
    this.navCtrl.push(HomePage);
  }

}
