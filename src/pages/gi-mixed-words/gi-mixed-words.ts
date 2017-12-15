import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the GiMixedWordsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-gi-mixed-words',
  templateUrl: 'gi-mixed-words.html',
})
export class GiMixedWordsPage {
  letters = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private letterService: DatabaseProvider) {
    
    this.letterService.getLettersFromDataBase().subscribe(letters => {
      this.letters = letters;
      console.log("ittvannak", letters);
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GiMixedWordsPage');
  }

}
