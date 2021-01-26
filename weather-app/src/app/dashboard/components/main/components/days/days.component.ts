import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { daysAnim } from 'src/app/app-animations';
import { Store } from '@ngrx/store';
import { DailyWeatherInterface } from 'src/app/model/dailyWeater.interface';
import { WeatherDataSelector } from 'src/app/dashboard/store/selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss'],
  animations: [daysAnim],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaysComponent implements OnInit, OnDestroy {
  private subs$: Subscription;
  public daysData: DailyWeatherInterface[];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subs$ = this.store.select(WeatherDataSelector).subscribe((res) => {
      this.daysData = res.chartsData?.days;
    });
  }

  toggleDetails(obj: DailyWeatherInterface): DailyWeatherInterface[] {
    obj = { ...obj, details: !obj.details };
    return (this.daysData = this.daysData.map((d) =>
      d.dt === obj.dt ? obj : d
    ));
  }

  ngOnDestroy(): void {
    if (this.subs$) {
      this.subs$.unsubscribe();
    }
  }
}
