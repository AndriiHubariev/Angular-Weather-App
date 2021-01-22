import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocationService } from './services/location.service';
import { SubSink } from 'SubSink';
import { getWeatherDataAction } from './dashboard/store/actions/getWeatherData.action';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private subs$ = new SubSink();
  constructor(private locationService: LocationService, private store: Store) {}

  ngOnInit() {
    this.subs$.sink = this.locationService.getLocation().subscribe(
      (res) =>
        this.store.dispatch(
          getWeatherDataAction({
            coords: { lat: res.coords.latitude, lon: res.coords.latitude },
          })
        ),
      (error) => {
        // User denied Geolocation
        if (error.code === 2 || error.code === 1) {
          this.store.dispatch(
            getWeatherDataAction({ coords: { lat: 50, lon: 30 } })
          );
        }
      }
    );
  }
}
