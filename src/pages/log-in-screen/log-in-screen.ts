import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignUpScreenPage } from '../sign-up-screen/sign-up-screen';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email-validator';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-log-in-screen',
  templateUrl: 'log-in-screen.html',
})
export class LogInScreenPage {
  public loginForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public formBuilder: FormBuilder, private storageService: StorageProvider) {
    this.loginForm = formBuilder.group({
      email: ['', 
      Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', 
      Validators.compose([Validators.minLength(8), Validators.required])]
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

  loginUser(){
    if (!this.loginForm.valid){
      console.log("something went wrong");
    } else {     
        this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then(() => {
          this.storageService.setData('signedEmail', this.loginForm.value.email).subscribe(() => this.navCtrl.push(TabsPage));
        }, (error) => {
          console.log("something went wrong");
        });
      
    }
  }

  getSignUpPage() {
    this.navCtrl.push(SignUpScreenPage);
  }

}
