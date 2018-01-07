import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor( private storage: Storage) {
  }

  setData(key, value) :Observable<any> {
    return Observable.create(observ => {
      this.storage.set(key, value).then(() => {
        observ.next(null);
        observ.complete();
      });
    });
  }

  getData(key) :Observable<any> {
    return Observable.create(observ => {
      this.storage.get(key).then(data => {
          observ.next(data);
          observ.complete();
      });
    });
  }

  removeStorage() :Observable<any> {
    return Observable.create(observ => {
      this.storage.clear();
      observ.next(null);
      observ.complete();
    });
  }
}
