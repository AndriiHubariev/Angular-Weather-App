import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {

  constructor(private http: HttpClient) {}

  // Wr = Weather
  // Cr = Coordinates

  getWeatherData(lat, lon): Observable<{}> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${API_KEY}&units=metric`
    );
  }
}
const API_KEY = 'a14f52971f65d65431b884a2a65010c2';
