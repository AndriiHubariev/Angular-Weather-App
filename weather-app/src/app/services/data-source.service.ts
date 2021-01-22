import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResponseWeatherDataInterface } from '../model/responseWeatherData.interface';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {
  private apiKey = 'a14f52971f65d65431b884a2a65010c2';

  constructor(private http: HttpClient) {}

  // Wr = Weather
  // Cr = Coordinates

  getWeatherData(lat, lon): Observable<{}> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${this.apiKey}&units=metric`
    ).pipe(
      map((response: ResponseWeatherDataInterface) => {
        //  FORMAT DATE
        response.current.sunrise = (response.current.sunrise + response.timezone_offset) * 1000;
        response.current.sunset = (response.current.sunset + response.timezone_offset) * 1000;
        response.current.dt = (response.current.dt + response.timezone_offset) * 1000;
        for (const hour of response.hourly) {
          hour.dt = (hour.dt + response.timezone_offset) * 1000;
        }
        response.timezone = this.sliceCityName(response.timezone);
        response.daily = response.daily.filter((day, idx) => idx !== 0);
        // format sunrize/sunset
        response.daily.forEach(day => day.sunrise = (day.sunrise + response.timezone_offset) * 1000);
        response.daily.forEach(day => day.sunset = (day.sunset + response.timezone_offset) * 1000);
        return response;
      }));
  }

  sliceCityName(name: string): string {
    return name.replace(/^.*\/(.*)$/, '$1');
  }
}
