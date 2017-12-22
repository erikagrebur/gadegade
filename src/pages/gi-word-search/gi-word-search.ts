import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GiRisingPicturePage } from '../gi-rising-picture/gi-rising-picture';
import { DatabaseProvider } from '../../providers/database/database';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';

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
  database: String[] = [];
  typedWord : String;
  answer : String = 'MJOLNIR';
  //answer : String = 'MJ';
  selectedLetters : String[] = [];
  answered : Boolean = false;
  slideStyle : any = { 'color': 'rgba(148, 151, 153, 0.45)' };
  //giNgDivStyle : any = {'backgroundColor': '#2A2F39'};
  //giNgPStyle : any = {'color': '#ff993d'};
  currentSelectedValue: string;
  currentSelectedIdentification: string;
  currentSelectedDivTag: any;
  currentSelectedPTag: any;
  selectedDivTags: any[] = [];
  selectedPTags: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseService: DatabaseProvider, private locationTracker: LocationTrackerProvider) {
    
  }

  ionViewDidLoad() {
    this.databaseService.getRisingPictureFromDataBase().subscribe(data => {
      this.database = data;
      console.log("data", data);
      console.log("???", this.database[0][0]);
    });
    console.log('A', this.database);
  }

  tapDown(giDivTag, giPTag, giValue, giIdentification) {
    if(!this.answered) {
      giDivTag.style.backgroundColor = '#ff993d';
      giPTag.style.color = '#2A2F39';
      this.currentSelectedValue = giValue;
      this.currentSelectedIdentification = giIdentification;
      this.currentSelectedDivTag = giDivTag;
      this.currentSelectedPTag = giPTag;
      console.log("valuee", giValue);
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
          console.log('cond', this.currentSelectedValue, this.answer[this.selectedLetters.length-1]);
          if(this.currentSelectedValue === this.answer[this.selectedLetters.length-1]) {
            console.log("ideugrik if?")
            if(this.typedWord === this.answer) {
              this.slideStyle.color = '#ff993d';
              this.answered = true;
            }
          } else {
            console.log('ideugrik else?')
            /*this.giNgDivStyle.backgroundColor = '#2A2F39 !important';
            this.giNgPStyle.color = '#ff993d';*/
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
      console.log(this.typedWord);
      console.log('selectedletters', this.selectedLetters);
    }
  }

  getNextGameItem() {
    if(this.answered) {
      this.answered = false;
      this.navCtrl.push(GiRisingPicturePage);
    }
  }

}
