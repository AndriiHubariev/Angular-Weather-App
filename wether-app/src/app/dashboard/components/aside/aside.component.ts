import { Component, OnInit, AfterContentChecked, OnDestroy, AfterViewInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { searchAnim } from 'src/app/app-animations';
import { Subscription } from 'rxjs';
import { DataRepositoryService } from 'src/app/model/data-repository.service';


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  animations: [searchAnim]
})
export class AsideComponent implements OnInit, OnDestroy {
  public sidebarToggle = false;
  public dataWeather = [];
  public mainWeatherCond = 'Sunny';
  public currentTemp: number;
  public weatherDescription: string;
  public currentDate: Date;
  public sunriseTime: Date;
  public sunsetTime: Date;
  public windSpeed: number;
  private dataSubs$: Subscription;

  constructor(private service: DashboardService, private dataRepository: DataRepositoryService) { }

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
    this.currentTemp = Math.floor(data[0].main.temp);
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
