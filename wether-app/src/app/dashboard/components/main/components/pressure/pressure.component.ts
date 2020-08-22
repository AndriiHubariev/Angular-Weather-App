import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataRepositoryService } from 'src/app/model/data-repository.service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';

@Component({
  selector: 'app-pressure',
  templateUrl: './pressure.component.html',
  styleUrls: ['./pressure.component.scss']
})
export class PressureComponent implements OnInit {
  public pressureChart: Chart = [];
  public weatherDataPressure;
  public dates = [];
  private pressureStats = [];
  constructor(private dataRepository: DataRepositoryService, private service: DashboardService) { }

  ngOnInit(): void {
    this.dataRepository.currentMultyWeather.subscribe(res => {
      if (res.length > 0) {
        this.weatherDataPressure = res;
        this.dates = this.service.getDates(this.weatherDataPressure);
        this.pressureStats = [];
        this.weatherDataPressure.forEach(e => {
           this.pressureStats.push(e.pressure);
        });
        this.pressureChart = new Chart('pressure_chart', {
          type: 'line',
          data: {
            labels: this.dates,
            datasets: [
              {
                label: 'Pressure',
                data: this.pressureStats,
                backgroundColor: 'rgb(68, 184, 172, .8)',
                borderColor: ['rgb(68, 184, 172, .8)'],
                borderWidth: 3,
                pointBorderColor: 'rgb(68, 184, 172, .8))',
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