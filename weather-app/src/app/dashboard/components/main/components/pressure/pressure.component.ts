import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DataRepositoryService } from 'src/app/services/data-repository.service';
import { DashboardService } from 'src/app/services/dashboard.service';

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
        const arr = [];
        this.weatherDataPressure.forEach(e => {
           arr.push(e.pressure);
        });
        this.pressureStats = arr;
        if (this.pressureChart.canvas) {
          this.pressureChart.destroy();
        }
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
