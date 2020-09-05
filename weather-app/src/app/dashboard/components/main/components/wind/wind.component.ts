import { Component, OnInit, ViewChild } from '@angular/core';
import { DataRepositoryService } from 'src/app/model/data-repository.service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-wind',
  templateUrl: './wind.component.html',
  styleUrls: ['./wind.component.scss']
})
export class WindComponent implements OnInit {
  public windChart: Chart = [];
  private dates;
  private windSpeedStat = [];
  constructor(private dataRepository: DataRepositoryService, private service: DashboardService) { }

  ngOnInit(): void {
    this.dataRepository.currentMultyWeather.subscribe((res: [{dt, wind_speed}]) => {
      if (res.length > 0) {
        this.dates = this.service.getDates(res);
        this.windSpeedStat = [];
        res.forEach(d => this.windSpeedStat.push(d.wind_speed));
        if (this.windChart.canvas) {
          this.windChart.destroy();
        }
        this.windChart = new Chart('windChart', {
          type: 'line',
          data: {
            labels: this.dates,
            datasets: [
              {
                label: 'Wind speed',
                data: this.windSpeedStat,
                backgroundColor: 'rgb(68, 184, 172, .8)',
                borderColor: ['rgb(68, 184, 172, .8)'],
                borderWidth: 3,
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: true,
            },
            scales: {
              yAxes: [
                {
                  gridLines: false,
                  color: ['rgb(255, 72, 0, .1)'],
                  drawborder: false,
                  // ticks: {
                  //   min: 0,
                  //   max: 60,
                  //   stepSize: 5,
                  // },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    color: [
                     'rgb(255, 72, 0, .0)',
                     'rgb(68, 184, 172, .1)',
                     'rgb(68, 184, 172, .1)',
                     'rgb(68, 184, 172, .1)',
                     'rgb(68, 184, 172, .1)',
                     'rgb(68, 184, 172, .1)',
                     'rgb(68, 184, 172, .1)',
                     'rgb(68, 184, 172, .1)'],
                    drawborder: false
                  },
                },
              ],
            },
          },
        });
      }
    });
  }

}
