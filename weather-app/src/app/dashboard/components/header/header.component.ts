import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherDataSelector } from '../../store/selectors';
import { OutPutOnToggleSearch } from '../searchCity/searchCity.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input() wrongCityErr: string;
  @Input() cityName: string;
  @Output() onSearchCity = new EventEmitter<OutPutOnToggleSearch>();

  public cityNameFromServer$: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit() {
   this.cityNameFromServer$ = this.store.select(WeatherDataSelector).pipe(map(res => res.weatherData?.timezone));
  }

  searchCity() {
    this.onSearchCity.emit({state: true, cityName: this.cityName});
  }
}
