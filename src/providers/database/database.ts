import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
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
  
  constructor(public db: AngularFirestore) {
    this.letterCollection = db.collection<any>('letters');
    this.mixedWordsCollection = db.collection<any>('mixedWords');
    this.wordSearchCollection = db.collection<any>('wordSearch');
    this.risingPictureCollection = db.collection<any>('realRisingPicture');
    this.threeQuestionCollection = db.collection<any>('threeQuestion');
    this.selectableCitysCollection = db.collection<any>('selectableCitys');
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

}
