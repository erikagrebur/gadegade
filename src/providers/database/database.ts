import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseProvider {

  private letterCollection: AngularFirestoreCollection<any>;
  constructor(public db: AngularFirestore) {
    this.letterCollection = db.collection<any>('letters');
  }
  checkLettersChanges(): Observable<any> {
    return this.letterCollection.valueChanges();
  }
  getLettersFromDataBase() : Observable<any> {
    return Observable.create( observable => {
      this.checkLettersChanges().subscribe(letters => {
        observable.next(letters);
        observable.complete();
      })
    })
  }

}
