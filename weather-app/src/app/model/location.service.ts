import { Injectable } from '@angular/core';
import { Subject, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  // public currentGeoLocation: Subject<{}> = new Subject();
  // public locationDone = false;

  constructor() {}

  getLocation(): Observable<any> {
    return new Observable(observer => {
      navigator.geolocation.getCurrentPosition((res) => observer.next(res), err => observer.error(err));
   });
  }
}
