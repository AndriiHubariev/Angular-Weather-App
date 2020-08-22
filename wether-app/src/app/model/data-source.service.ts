import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {
  private appiKey = 'a14f52971f65d65431b884a2a65010c2';

  constructor(private http: HttpClient, private geo: LocationService) {}

  // Wr = Weather
  // Cr = Coordinates

  getMultipleWrByCr(lat, lon): Observable<{}> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${this.appiKey}&units=metric`
    );
  }
  getCurrentOneDayWr(lat, lon): Observable<{}> {
    return this.http.get<{}>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.appiKey}&units=metric`
    );
  }
}
