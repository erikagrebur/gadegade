import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { StorageProvider } from '../storage/storage';

@Injectable()
export class AuthProvider {

  constructor(private storageService: StorageProvider) {
  }

  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(signedUser => {
      this.storageService.setData("signedToken", signedUser.uid).subscribe(()=> {})
    });
  }

  signupUser(email: string, password: string, username: string): Promise<any> {
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then( newUser => {
      this.storageService.setData("signedToken", newUser.uid).subscribe(() => {
        firebase
        .firestore()
        .collection('/users')
        .doc(newUser.uid)
        .set({ 
          email: email,
          username: username, 
          played_times: 0,
          completed_games: {
            games_city: {},
            games_name: {}
          }
        });
      });
    });
  }

  logoutUser(): Promise<void> {
    this.storageService.removeStorage().subscribe(() => {});
    return firebase.auth().signOut();
  }
}
