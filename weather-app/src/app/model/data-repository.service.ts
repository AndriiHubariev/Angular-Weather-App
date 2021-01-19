import { Injectable } from '@angular/core';
import { DataSourceService } from './data-source.service';
import { LocationService } from './location.service';
import { BehaviorSubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class DataRepositoryService {
  public currentOneDayWr = new BehaviorSubject([]);
  public currentMultyWeather = new BehaviorSubject([]);

  constructor(
    private dataSource: DataSourceService,
    private geo: LocationService
  ) {
    this.geo.getLocation().subscribe(
      (res) => {
        this.getWeatherData(res.coords.latitude, res.coords.longitude);
      },
      (err) => {
        if (err.code === 1) {
          this.getWeatherData('50.431759', '30.517023');
        }
      }
    );
  }
  getWeatherData(lat, lon) {
    this.dataSource
      .getCurrentOneDayWr(lat, lon)
      .subscribe((res) => this.currentOneDayWr.next([res]));
    this.dataSource
      .getMultipleWrByCr(lat, lon)
      .pipe(
        filter((res: { daily }) => res.daily.filter((e, i) => i < 8)),
        map((res: { daily }) =>
          res.daily.map((day: { dt }) => {
            day.dt = new Date(day.dt * 1000);
            return day;
          })
        )
      )
      .subscribe((res) => this.currentMultyWeather.next(res));
  }
}
