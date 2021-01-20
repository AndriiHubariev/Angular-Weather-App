import { Component, OnInit } from '@angular/core';
import { DataRepositoryService } from 'src/app/services/data-repository.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { daysAnim } from 'src/app/app-animations';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss'],
  animations: [daysAnim]
})
export class DaysComponent implements OnInit {
  public weatherDataDays;
  public recivedDates = [];

  constructor(private dateRepository: DataRepositoryService, private service: DashboardService) { }

  ngOnInit(): void {
    this.dateRepository.currentMultyWeather.subscribe(res => {
      if (res.length > 0) {
        this.weatherDataDays = res.filter((i, idx) => idx !== 0);
      }
    });
  }

}
