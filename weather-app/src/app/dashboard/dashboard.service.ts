import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public sidebarToggle = new BehaviorSubject(false);
  public isWrongCity = new BehaviorSubject(false);
  constructor() {
    const docWidth = window.document.body.offsetWidth;
    // --- block the main side
    fromEvent(window, 'resize').subscribe((e: {target}) => {
        if (e.target.document.body.offsetWidth !== docWidth) {
          e.target.document.body.offsetWidth < 500
          ? document.body.style.overflow = 'hidden'
          : document.body.style.overflow = 'visible';
          if (e.target.document.body.offsetWidth > 500) {
            this.sidebarToggle.next(false);
            }
        }
      });
    this.sidebarToggle.subscribe(res => {
      if (document.body.offsetWidth < 500) {
        document.body.style.overflow = 'hidden';
        if (res) {
         document.body.style.overflow = 'visible';
       }
     }
    });
    // end of block
  }

  getDates(arr: [{dt}]) {
    const dates = [];
    arr.forEach((i) => {
      const date = new Date(i.dt);
      const dateStr = `${date.getDate()}.${date.getMonth() + 1}`;
      dates.push(dateStr);
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
