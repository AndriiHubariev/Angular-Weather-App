import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { searchAnim, sidebarAnim } from 'src/app/app-animations';
import { CurrentWeatherIntreface } from 'src/app/model/currentWeather.interface';
import { Store } from '@ngrx/store';
import { WeatherDataSelector } from '../../store/selectors';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  animations: [searchAnim, sidebarAnim],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideComponent implements OnInit, OnDestroy {
  @Output() onToggleSidebar = new EventEmitter<boolean>();
  public weatherData: CurrentWeatherIntreface;
  public sidebarToggleState = false;

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.select(WeatherDataSelector).subscribe((res) => {
      this.weatherData = res.weatherData?.current;
    });
  }

  sidebarToogle() {
    this.onToggleSidebar.emit(
      (this.sidebarToggleState = !this.sidebarToggleState)
    );
  }

  ngOnDestroy(): void {}
}
