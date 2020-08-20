import { Injectable } from '@angular/core';
import { DataSourceService } from './data-source.service';
import { LocationService } from './location.service';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataRepositoryService {
  public currentOneDayWr = new BehaviorSubject([]);
  public currentMultyWeather = new BehaviorSubject([]);

  constructor(private dataSource: DataSourceService, private geo: LocationService) {
    this.geo.getLocation().subscribe(loc => {
      this.getWeatherData(loc.latitude, loc.longitude);
    });
  }
  getWeatherData(lat, lon) {
    this.dataSource.getCurrentOneDayWr(lat, lon).subscribe(res => this.currentOneDayWr.next([res]));
    this.dataSource.getMultipleWrByCr(lat, lon).pipe(
      map((res: {daily}) => res.daily.map(d => {
        d.dt = new Date(d.dt * 1000);
        return d;
      }))
    )
    .subscribe(res => this.currentMultyWeather.next(res));
  }
}
