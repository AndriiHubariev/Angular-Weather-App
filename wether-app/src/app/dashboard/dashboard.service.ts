import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public sidebarToggle = new BehaviorSubject(false);
  constructor() { }

  getDates(arr: [{dt}]) {
    const dates = [];
    arr.forEach((i) => {
      let date;
      date = `${new Date(i.dt * 1000).getDate()}.${new Date(i.dt * 1000).getMonth()}`;
      dates.push(date);
    });
    return dates;
  }
  getTemps(arr: [{temp}], MinMax: string) {
    const temps = [];
    arr.forEach(i => {
      let temp;
      MinMax === 'max'
      ? temp = Math.floor(i.temp.max)
      : temp = Math.floor(i.temp.min);
      temps.push(temp);
    });
    return temps;
  }

}
