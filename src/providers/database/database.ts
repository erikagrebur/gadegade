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
  
  constructor(public db: AngularFirestore) {
    this.letterCollection = db.collection<any>('letters');
    this.mixedWordsCollection = db.collection<any>('mixedWords');
    this.wordSearchCollection = db.collection<any>('wordSearch');
    this.risingPictureCollection = db.collection<any>('realRisingPicture');
    this.threeQuestionCollection = db.collection<any>('threeQuestion');
    this.selectableCitysCollection = db.collection<any>('selectableCitys');
    this.gamesCollection = db.collection<any>('games');
    this.basicInfoCollection = db.collection<any>('basicInfo');
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
}
