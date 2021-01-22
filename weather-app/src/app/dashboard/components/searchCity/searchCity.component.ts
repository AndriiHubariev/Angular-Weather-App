import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { getWeatherDataAction } from '../../store/actions/getWeatherData.action';

interface City {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
}
export interface OutPutOnToggleSearch {
  state: boolean;
  cityName?: string;
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-searchCity',
  templateUrl: './searchCity.component.html',
  styleUrls: ['./searchCity.component.scss'],
})
export class SearchCityComponent implements OnInit {
  @Output() onCloseSearch = new EventEmitter<OutPutOnToggleSearch>();

  public allCitiesList: City[] = require('../../../../assets/city.list.json');
  public filteredCities: City[] = this.allCitiesList.filter(
    (city: City) => city.country === 'UA'
  );
  public cytiesControl = new FormControl();
  public filteredOptions: Observable<City[]>;
  public errorMessage = '';

  constructor(private store: Store) {}

  ngOnInit() {
    this.filteredOptions = this.cytiesControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): City[] {
    const filterValue = value.toLowerCase();
    return this.filteredCities.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  closeSearch(cityName?: string) {
    this.onCloseSearch.emit({state: IS_CLOSED_SEARCH, cityName});
  }

  submitCity() {
    if (this.cytiesControl.value.trim()) {
      const newCity = this.allCitiesList.find(
        (city: City) =>
          city.name.toLowerCase() === this.cytiesControl.value.toLowerCase()
      );
      if (newCity) {
        this.errorMessage = '';
        this.cytiesControl.setValue('');
        this.store.dispatch(
          getWeatherDataAction({
            coords: { lat: newCity.coord.lat, lon: newCity.coord.lon },
          })
        );
        this.closeSearch(newCity.name);
      } else {
        this.errorMessage = 'city name is wrong';
      }
    }
  }
}
const IS_CLOSED_SEARCH = false;
