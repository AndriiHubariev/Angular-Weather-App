import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataRepositoryService } from 'src/app/services/data-repository.service';

interface City {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: {
      lon: number,
      lat: number
  };
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-searchCity',
  templateUrl: './searchCity.component.html',
  styleUrls: ['./searchCity.component.scss']
})
export class SearchCityComponent implements OnInit {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onCloseSearch = new EventEmitter<boolean>();

  public allCitiesList: City[] = require('../../../../assets/city.list.json');
  public filteredCities: City[] = this.allCitiesList.filter((city: City) => city.country === 'UA');
  public cytiesControl = new FormControl();
  public filteredOptions: Observable<City[]>;
  public errorMessage = '';

  constructor(private dataRepositoryService: DataRepositoryService) { }

  ngOnInit() {
    this.filteredOptions = this.cytiesControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): City[] {
    const filterValue = value.toLowerCase();
    return this.filteredCities.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  closeSearch() {
    this.onCloseSearch.emit(IS_CLOSED_SEARCH);
  }

  submitCity() {
    if (this.cytiesControl.value.trim()) {
      const newCity = this.allCitiesList
      .find((city: City) => city.name.toLowerCase() === this.cytiesControl.value.toLowerCase())
      if (newCity) {
        this.errorMessage = ''
        this.cytiesControl.setValue('');
        this.dataRepositoryService.getWeatherData(newCity.coord.lat, newCity.coord.lon);
        this.closeSearch();
      } else {
        this.errorMessage = 'city name is wrong'
      }
    }
  }

}
const IS_CLOSED_SEARCH = false;
