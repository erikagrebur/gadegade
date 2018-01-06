import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignUpScreenPage } from '../sign-up-screen/sign-up-screen';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email-validator';

@Component({
  selector: 'page-log-in-screen',
  templateUrl: 'log-in-screen.html',
})
export class LogInScreenPage {
  public loginForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      email: ['', 
      Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', 
      Validators.compose([Validators.minLength(8), Validators.required])]
    });
  }

  loginUser(): void {
    if (!this.loginForm.valid){
      console.log("something went wrong");
    } else {
      this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {
        this.navCtrl.setRoot(HomePage);
      }, error => {
        console.log("something went wrong");
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInScreenPage');
  }

  getSignUpPage() {
    this.navCtrl.push(SignUpScreenPage);
  }

}
