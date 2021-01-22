import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {

  constructor() {}

  getLocation(): Observable<any> {
    return new Observable(observer => {
      navigator.geolocation.getCurrentPosition((res) => observer.next(res), err => observer.error(err));
   });
  }
}
