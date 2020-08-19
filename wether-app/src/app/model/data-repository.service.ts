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
  constructor(private dataSource: DataSourceService, private geo: LocationService) {
    this.geo.getLocation().pipe(
      mergeMap((loc: {latitude, longitude} ) => {
        const oneDaye = this.dataSource.getCurrentOneDayWr(loc.latitude, loc.longitude);
        const multiple = this.dataSource.getMultipleWrByCr(loc.latitude, loc.longitude);
        return forkJoin([oneDaye, multiple]);
      })
      ).subscribe(res => {
        this.currentOneDayWr.next([res[0]]);
        this.currentMultyWeather.next([res[1]]);
      });
  }
  getCurrentWrByCityName(city: string) {
    return this.dataSource.getCurrentWrByCityName(city);
  }
  getWrForFiveDaysByName(city: string) {
    return this.dataSource.getWrForFiveDaysByName(city);
  }
}
