import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { AuthProvider } from '../../providers/auth/auth';
import { SliderScreenPage } from '../slider-screen/slider-screen';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public viewCtrl: ViewController) {
  }

  getSettings() {
    this.viewCtrl.dismiss();
  }
  logout() {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.push(SliderScreenPage);
    }, (error) => {
      console.log("something went wrong");
    });
  }
}
