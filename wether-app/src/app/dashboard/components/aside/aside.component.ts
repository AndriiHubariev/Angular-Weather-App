import { Component, OnInit, AfterContentChecked, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { searchAnim } from 'src/app/app-animations';
import { Subscription, fromEvent, BehaviorSubject } from 'rxjs';
import { DataRepositoryService } from 'src/app/model/data-repository.service';
import { log } from 'console';


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  animations: [searchAnim]
})
export class AsideComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('countryInput') country;
  // Data
  public dataWeather = [];
  public allCitiesList = require('../../../../assets/city.list.json');
  // to HTML
  public mainWeatherCond = 'Sunny';
  public currentTemp: number;
  public weatherDescription: string;
  public currentDate: Date;
  public sunriseTime: Date;
  public sunsetTime: Date;
  public windSpeed: number;
  public sidebarToggle = false;
  private dataSubs$: Subscription;

  constructor(private service: DashboardService, private dataRepository: DataRepositoryService) { }

  ngAfterViewInit(): void {
    fromEvent(this.country.nativeElement, 'change').subscribe((e: {target}) => {
     const country = this.allCitiesList.find(c => c.name.toLowerCase() === e.target.value.toLowerCase());
     if (country) {
       this.dataRepository.getWeatherData(country.coord.lat, country.coord.lon);
       this.service.isWrongCity.next(false);
      } else {
        this.service.isWrongCity.next(true);
      }
    });
  }

  ngOnInit(): void {
   this.service.sidebarToggle.subscribe((res: boolean) => (this.sidebarToggle = res));
   this.dataSubs$ = this.dataRepository.currentOneDayWr.subscribe((res: [{main, weather, sys, wind, data}]) => {
      this.dataWeather = res;
      if (this.dataWeather.length > 0) {
         this.getDataForHTML(this.dataWeather);
      }
   });
  }

  getDataForHTML(data) {
    this.currentTemp = Math.round(data[0].main.temp);
    this.mainWeatherCond = data[0].weather[0].main;
    this.weatherDescription = data[0].weather[0].description;
    this.currentDate = new Date(data[0].dt * 1000);
    this.sunriseTime = new Date(data[0].sys.sunrise * 1000);
    this.sunsetTime = new Date(data[0].sys.sunset * 1000);
    this.windSpeed = data[0].wind.speed;
  }

  ngOnDestroy(): void {
    if (this.dataSubs$) {
      this.dataSubs$.unsubscribe();
    }
  }
}
