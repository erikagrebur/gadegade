import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LogInScreenPage } from '../log-in-screen/log-in-screen';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email-validator';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-sign-up-screen',
  templateUrl: 'sign-up-screen.html',
})
export class SignUpScreenPage {
  public signupForm: FormGroup;
  password: string;
  confirmPassword: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public authProvider: AuthProvider, public formBuilder: FormBuilder, private storageService: StorageProvider) {
    this.signupForm = formBuilder.group({
      email: ['', 
        Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', 
        Validators.compose([Validators.minLength(8), Validators.required])],
      username: ['', 
        Validators.compose([Validators.required])],
      confirm_password: ['',
        Validators.compose([Validators.required])]
    });
  }

  ionViewWillEnter() {
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(56px)';
        tabs[ key ].style.display = 'none';
      });
    } // end if
  }

  signupUser(){
    if (!this.signupForm.valid){
      console.log("something went wrong");
    } else {     
        this.authProvider.signupUser(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.username)
        .then(() => {
          this.storageService.setData('signedEmail', this.signupForm.value.email).subscribe(() => this.navCtrl.setRoot(HomePage));
        }, (error) => {
          console.log("something went wrong");
        });
      
    }
  }

  getLoginPage() {
    this.navCtrl.push(LogInScreenPage);
  }

}
