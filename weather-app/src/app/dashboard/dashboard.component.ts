import { Component, OnInit, OnDestroy } from '@angular/core';
import { sidebarAnim, showArrow } from '../app-animations';
import { SubSink } from 'SubSink';
import { LoadingStateSelector } from './store/selectors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { OutPutOnToggleSearch } from './components/searchCity/searchCity.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [sidebarAnim, showArrow],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public sidebarToggle: boolean;
  public cityName: string;
  public wrongCityErr = '';
  private subs$ = new SubSink();
  public isSearchingCity = false;
  public isLoading$: Observable<boolean>;

  constructor(private store: Store) {}

  toggleSearchCity(data: OutPutOnToggleSearch) {
    this.isSearchingCity = data.state;
    this.cityName = data.cityName;
    if (this.isSearchingCity) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  sidebarToogle(state: boolean) {
    this.sidebarToggle = state;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(LoadingStateSelector);
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }
}
