import { Injectable } from '@angular/core';
import { DataSourceService } from './data-source.service';
import { LocationService } from './location.service';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataRepositoryService {
  public currentOneDayWr = new BehaviorSubject([]);
  public currentMultyWeather = new BehaviorSubject([]);

  getCurrentOneDayWr(lat, lon) {
    return this.dataSource.getCurrentOneDayWr(lat, lon).subscribe(res => this.currentOneDayWr.next([res]));
  }
  getMultipleWrByCr(lat, lon) {
    return this.dataSource.getMultipleWrByCr(lat, lon).subscribe(res => this.currentMultyWeather.next([res]));
  }
  getWeatherData(lat, lon) {
    this.getCurrentOneDayWr(lat, lon);
    this.getMultipleWrByCr(lat, lon);
  }
  constructor(private dataSource: DataSourceService, private geo: LocationService) {
    this.geo.getLocation().subscribe(loc => {
      this.getWeatherData(loc.latitude, loc.longitude);
    });
  }
}
