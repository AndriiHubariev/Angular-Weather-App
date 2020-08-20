import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataRepositoryService } from 'src/app/model/data-repository.service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.scss']
})
export class HumidityComponent implements OnInit {
  public humChart = [];

  constructor(private dataRepository: DataRepositoryService, private service: DashboardService) {}

  ngOnInit(): void {
    this.dataRepository.currentMultyWeather.subscribe(res => {
      console.log(res);
    });

    // this.humChart = new Chart ('humChart', {

    // });
  }

}
