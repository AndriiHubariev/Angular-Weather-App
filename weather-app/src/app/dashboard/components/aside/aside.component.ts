import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { searchAnim, sidebarAnim } from 'src/app/app-animations';
import { Subscription } from 'rxjs';
import { DataRepositoryService } from 'src/app/model/data-repository.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  animations: [searchAnim, sidebarAnim],
})
export class AsideComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onToggleSidebar = new EventEmitter<boolean>();
  @ViewChild('countryInput') country;
  // Data
  public dataWeather = [];
  // to HTML
  public mainWeatherCond = 'Sunny';
  public currentTemp: number;
  public weatherDescription: string;
  public currentDate: Date;
  public sunriseTime: Date;
  public sunsetTime: Date;
  public windSpeed: number;
  public sidebarToggleState = false;
  private dataSubs$: Subscription;

  constructor(
    private dataRepository: DataRepositoryService
  ) {}
  ngOnInit(): void {
    this.dataSubs$ = this.dataRepository.currentOneDayWr.subscribe(
      (res: [{ main; weather; sys; wind; data }]) => {
        this.dataWeather = res;
        if (this.dataWeather.length > 0) {
          this.getDataForHTML(this.dataWeather);
        }
      }
    );
  }
  sidebarToogle() {
    this.onToggleSidebar.emit(this.sidebarToggleState = !this.sidebarToggleState);
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
