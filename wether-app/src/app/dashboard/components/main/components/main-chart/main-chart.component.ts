import { Component, OnInit, ViewChild } from '@angular/core';
import { DataRepositoryService } from 'src/app/model/data-repository.service';
import { Chart } from 'chart.js';
import { DashboardService } from 'src/app/dashboard/dashboard.service';

@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.scss'],
})
export class MainChartComponent implements OnInit {
  @ViewChild('tempCanvas') tempCanvas;
  private weatherData;
  public mainChart: Chart = [];
  private allDates = [];
  private maxTemps = [];
  private minTemp = [];
  constructor(private dataRepository: DataRepositoryService, private service: DashboardService) {}

  ngOnInit(): void {
    this.dataRepository.currentMultyWeather.subscribe((res) => {
      if (res.length > 0) {
        this.weatherData = res;
        this.allDates = this.service.getDates(this.weatherData);
        this.maxTemps = this.service.getTemps(this.weatherData, 'max');
        this.minTemp = this.service.getTemps(this.weatherData, 'min');

        Chart.defaults.global.defaultFontColor = 'rgb(192, 191, 191)';
        Chart.defaults.global.defaultFontFamily = 'Poppins, sans-serif';
        (Chart.defaults.global.defaultFontSize = 11);
        if (this.mainChart.canvas) {
          this.tempCanvas.nativeElement.childNodes[1].remove();
          this.tempCanvas.nativeElement.innerHTML = '<canvas id="main_chart">{{mainChart}}</canvas>';
        }
        this.mainChart = new Chart('main_chart', {
          type: 'line',
          data: {
            labels: this.allDates,
            datasets: [
              {
                label: 'max temp',
                data: this.maxTemps,
                backgroundColor: 'red',
                borderColor: ['rgb(247, 62, 62)'],
                borderWidth: 3,
                pointBorderColor: 'rgb(255, 0, 0,.3',
                fill: false,
              },
              {
                label: 'min temp',
                data: this.minTemp,
                borderColor: ['rgb(37, 37, 245)'],
                borderWidth: 3,
                pointBorderColor: 'rgb(0, 0, 255, .3)',
                fill: false
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
                  ticks: {
                    min: 0,
                    max: 60,
                    stepSize: 5,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    color: [
                     'rgb(255, 72, 0, .0)',
                     'rgb(255, 72, 0, .1)',
                     'rgb(255, 72, 0, .1)',
                     'rgb(255, 72, 0, .1)',
                     'rgb(255, 72, 0, .1)',
                     'rgb(255, 72, 0, .1)',
                     'rgb(255, 72, 0, .1)',
                     'rgb(255, 72, 0, .1)'],
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
