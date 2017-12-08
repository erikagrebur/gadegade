import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GiWordSearchPage } from '../gi-word-search/gi-word-search';

/**
 * Generated class for the GiStartGamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-gi-start-game',
  templateUrl: 'gi-start-game.html',
})
export class GiStartGamePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GiStartGamePage');
  }

  getFirstGameItem() {
    this.navCtrl.push(GiWordSearchPage);
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: 'Your friend, <img src=\'https://rovinj-apartman.extra.hu/images/rovinj-kepek/rovinj_kepek9.jpg\'> Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }

}
