import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
  public options: City[] = [...this.filteredCities];
  public filteredOptions: Observable<City[]>;


  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.cytiesControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): City[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  closeSearch() {
    this.onCloseSearch.emit(IS_CLOSED_SEARCH);
  }

}
const IS_CLOSED_SEARCH = false;
