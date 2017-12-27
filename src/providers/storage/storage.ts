import { HttpClient } from '@angular/common/http';
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

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello StorageProvider Provider');
  }

  setCity() :Observable<any> {
    return Observable.create(observ => {

      observ.next(null);
      observ.complete();
    });
  }

  getCity() :Observable<any> {
    return Observable.create(observ => {
      this.storage.get('city').then(city => {
        if(!city) {
          
        } else {
          observ.next(null);
          observ.complete();
        }
      });
    });
  }
}
