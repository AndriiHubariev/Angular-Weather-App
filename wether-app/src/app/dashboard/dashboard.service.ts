import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public sidebarToggle = new BehaviorSubject(false);
  public isWrongCity = new BehaviorSubject(false);
  constructor() { }

  getDates(arr: [{dt}]) {
    const dates = [];
    arr.forEach((i) => {
      const date = new Date(i.dt);
      const dateStr = `${date.getDate()}.${date.getMonth()}`;
      dates.push(dateStr);
    })
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
