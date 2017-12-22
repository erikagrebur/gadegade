import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignUpScreenPage } from '../sign-up-screen/sign-up-screen';

/**
 * Generated class for the GiRateScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-gi-rate-screen',
  templateUrl: 'gi-rate-screen.html',
})
export class GiRateScreenPage {

  stars: any[] = [];
  isVoted: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.stars.push(
      {id: 1, src: 'assets/imgs/gameImgs/09_rate/starEmpty.png', alt: 'rating - 1st star'},
      {id: 2, src: 'assets/imgs/gameImgs/09_rate/starEmpty.png', alt: 'rating - 2nd star'},
      {id: 3, src: 'assets/imgs/gameImgs/09_rate/starEmpty.png', alt: 'rating - 3rd star'},
      {id: 4, src: 'assets/imgs/gameImgs/09_rate/starEmpty.png', alt: 'rating - 4th star'},
      {id: 5, src: 'assets/imgs/gameImgs/09_rate/starEmpty.png', alt: 'rating - 5th star'}
    );
  }

  getSignUpScreen() {
    this.navCtrl.push(SignUpScreenPage);
  }

  setRate(id) {
    if(!this.isVoted) {
      console.log('id: ', id);
      for(let i = 0; i < id; i++) {
        this.stars[i].src = 'assets/imgs/gameImgs/09_rate/starFull.png';
      }
      console.log('tomb', this.stars);
      this.isVoted = true;
      setTimeout(() => {
        this.navCtrl.push(SignUpScreenPage);
      }, 1000);
    }
  }

}
