import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';

@Injectable()
export class DatabaseProvider {

  private letterCollection: AngularFirestoreCollection<any>;
  private mixedWordsCollection: AngularFirestoreCollection<any>;
  private wordSearchCollection: AngularFirestoreCollection<any>;
  private risingPictureCollection: AngularFirestoreCollection<any>;
  private threeQuestionCollection: AngularFirestoreCollection<any>;
  private selectableCitysCollection: AngularFirestoreCollection<any>;
  private gamesCollection: AngularFirestoreCollection<any>;
  private gamesDoc: AngularFirestoreDocument<any>;
  private basicInfoCollection: AngularFirestoreCollection<any>;
  private descriptionCollection: AngularFirestoreCollection<any>;
  private obscureCollection: AngularFirestoreCollection<any>;
  private finishCollection: AngularFirestoreCollection<any>;
  private ratingCollection: AngularFirestoreCollection<any>;
  private usersCollection: AngularFirestoreCollection<any>;
  private citiesCollection: AngularFirestoreCollection<any>;
  private usersDoc: AngularFirestoreDocument<any>;
  
  constructor(public db: AngularFirestore) {
    this.letterCollection = db.collection<any>('letters');
    this.mixedWordsCollection = db.collection<any>('giMixedWords');
    this.wordSearchCollection = db.collection<any>('giWordSearch');
    this.risingPictureCollection = db.collection<any>('giRisingPicture');
    this.threeQuestionCollection = db.collection<any>('giThreeQuestions');
    this.selectableCitysCollection = db.collection<any>('selectableCitys');
    this.gamesCollection = db.collection<any>('games');
    this.basicInfoCollection = db.collection<any>('basicInfo');
    this.descriptionCollection = db.collection<any>('giDescription');
    this.obscureCollection = db.collection<any>('giObscureImage');
    this.finishCollection = db.collection<any>('giFinal');
    this.ratingCollection = db.collection<any>('giRating');
    this.usersCollection = db.collection<any>('users');
    this.citiesCollection = db.collection<any>('cities');
  }

  checkLettersChanges(): Observable<any> {
    return this.letterCollection.valueChanges();
  }

  checkMixedWordsChanges(): Observable<any> {
    return this.mixedWordsCollection.valueChanges();
  }

  getLettersFromDataBase() : Observable<any> {
    return Observable.create( observable => {
      this.checkLettersChanges().subscribe(letters => {
        observable.next(letters);
        observable.complete();
      })
    })
  }

  getMixedWordsFromDataBase() : Observable<any> {
    return Observable.create( observable => {
      this.checkMixedWordsChanges().subscribe(mixedwords => {
        observable.next(mixedwords);
        observable.complete();
      })
    })
  }

  checkWordSearchChanges(): Observable<any> {
    return this.wordSearchCollection.valueChanges();
  }

  getWordSearchFromDataBase() : Observable<any> {
    return Observable.create( observable => {
      this.checkWordSearchChanges().subscribe(data => {
        observable.next(data);
        observable.complete();
      })
    })
  }

  checkRisingPictureChanges(): Observable<any> {
    return this.risingPictureCollection.valueChanges();
  }

  getRisingPictureFromDataBase() : Observable<any> {
    return Observable.create( observable => {
      this.checkRisingPictureChanges().subscribe(data => {
        observable.next(data);
        observable.complete();
      })
    })
  }

  checkThreeQuestionChanges(): Observable<any> {
    return this.threeQuestionCollection.valueChanges();
  }

  getThreeQuestionFromDataBase() : Observable<any> {
    return Observable.create( observable => {
      this.checkThreeQuestionChanges().subscribe(data => {
        observable.next(data);
        observable.complete();
      })
    })
  }

  checkSelectableCitysChanges(): Observable<any> {
    return this.selectableCitysCollection.valueChanges();
  }

  getSelectableCitysFromDataBase() : Observable<any> {
    return Observable.create( observable => {
      this.checkSelectableCitysChanges().subscribe(data => {
        observable.next(data);
        observable.complete();
      })
    })
  }

  checkGamesChanges(): Observable<any> {
    return this.gamesCollection.valueChanges();
  }

  getGamesFromDataBase() : Observable<any> {
    return Observable.create( observable => {
      this.checkGamesChanges().subscribe(data => {
        observable.next(data);
        observable.complete();
      })
    })
  }

  updateGames(document, selectedCity, selectedGame, value) {
    this.gamesDoc = this.db.doc<any>(`games/${document}`);
    return this.gamesDoc.update({
      [`${selectedCity}.${selectedGame}.background_img_url`]: value
    });
  }

  checkBasicInfoChanges(): Observable<any> {
    return this.basicInfoCollection.valueChanges();
  }

  getBasicInfoFromDataBase() : Observable<any> {
    return Observable.create( observable => {
      this.checkBasicInfoChanges().subscribe(data => {
        observable.next(data);
        observable.complete();
      })
    })
  }

  checkDescriptionChanges(): Observable<any> {
    return this.descriptionCollection.valueChanges();
  }

  getDescriptionFromDataBase() : Observable<any> {
    return Observable.create( observable => {
      this.checkDescriptionChanges().subscribe(data => {
        observable.next(data);
        observable.complete();
      })
    })
  }

  checkObscureImageChanges(): Observable<any> {
    return this.obscureCollection.valueChanges();
  }

  getObscureImageFromDataBase() : Observable<any> {
    return Observable.create( observable => {
      this.checkObscureImageChanges().subscribe(data => {
        observable.next(data);
        observable.complete();
      })
    })
  }

  checkFinishDatasChanges(): Observable<any> {
    return this.finishCollection.valueChanges();
  }

  getFinishDatasFromDataBase() : Observable<any> {
    return Observable.create( observable => {
      this.checkFinishDatasChanges().subscribe(data => {
        observable.next(data);
        observable.complete();
      })
    })
  }

  checkRatingChanges(): Observable<any> {
    return this.ratingCollection.valueChanges();
  }

  getRatingFromDataBase() : Observable<any> {
    return Observable.create( observable => {
      this.checkRatingChanges().subscribe(data => {
        observable.next(data);
        observable.complete();
      })
    })
  }

  evaluation(document, selectedCity, selectedGame, valueOfVotes, numberOfVotes) {
    this.gamesDoc = this.db.doc<any>(`games/${document}`);
    return this.gamesDoc.update({
      [`${selectedCity}.${selectedGame}.value_of_votes`]: valueOfVotes, 
      [`${selectedCity}.${selectedGame}.number_of_votes`]: numberOfVotes 
    });
  }

  checkUsersChanges(): Observable<any> {
    return this.usersCollection.valueChanges();
  }

  updateUserStatistics(document, completedCities, completedGames, playedTimes) {
    this.usersDoc = this.db.doc<any>(`users/${document}`);
    return this.usersDoc.update({
      [`completed_games.games_city`] : completedCities,
      [`completed_games.games_name`] : completedGames,
      [`played_times`] : playedTimes
    });
  }

  getUsersFromDataBase() : Observable<any> {
    return Observable.create( observable => {
      this.checkUsersChanges().subscribe(data => {
        observable.next(data);
        observable.complete();
      })
    })
  }

  checkCitiesChanges(): Observable<any> {
    return this.citiesCollection.valueChanges();
  }

  getCitiesFromDataBase() : Observable<any> {
    return Observable.create( observable => {
      this.checkCitiesChanges().subscribe(data => {
        observable.next(data);
        observable.complete();
      })
    })
  }
}
