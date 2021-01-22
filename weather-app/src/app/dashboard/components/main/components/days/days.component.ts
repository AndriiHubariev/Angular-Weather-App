import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { daysAnim } from 'src/app/app-animations';
import { Store } from '@ngrx/store';
import { DailyWeatherInterface } from 'src/app/model/dailyWeater.interface';
import { Observable } from 'rxjs';
import { WeatherDataSelector } from 'src/app/dashboard/store/selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss'],
  animations: [daysAnim],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysComponent implements OnInit {
  public daysData$: Observable<DailyWeatherInterface[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.daysData$ = this.store.select(WeatherDataSelector).pipe(map(res => res.chartsData?.days));
  }

}

