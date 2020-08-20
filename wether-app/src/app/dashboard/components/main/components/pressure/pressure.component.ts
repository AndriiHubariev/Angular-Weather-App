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
        this.weatherDataPressure.forEach(e => {
           this.pressureStats.push(e.pressure);
           this.pressureStats.splice(8, this.pressureStats.length);
        });
        this.pressureChart = new Chart('pressure_chart', {
          type: 'bar',
          data: {
            labels: this.dates,
            datasets: [
              {
                label: 'Pressure',
                data: this.pressureStats,
                fill: false
              },
            ],
          },
          options: {
            responsive: true,
            elements: {
              rectangle: {
                borderColor: 'rgb(37, 37, 245)',
                borderWidth: 2
              }
            },
            maintainAspectRatio: false,
            legend: {
              display: true,
            },
            scales: {
              yAxes: [
                {
                  // ticks: {
                  //   min: 0,
                  //   max: 20,
                  //   stepSize: 2,
                  // },
                  drawborder: false,
                },
              ],
              xAxes: [
                {
                  gridLines: {
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
