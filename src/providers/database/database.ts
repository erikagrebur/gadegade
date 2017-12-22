import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseProvider {

  private letterCollection: AngularFirestoreCollection<any>;
  private mixedWordsCollection: AngularFirestoreCollection<any>;
  private wordSearchCollection: AngularFirestoreCollection<any>;
  
  constructor(public db: AngularFirestore) {
    this.letterCollection = db.collection<any>('letters');
    this.mixedWordsCollection = db.collection<any>('mixedWords');
    this.wordSearchCollection = db.collection<any>('wordSearch');
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

}
