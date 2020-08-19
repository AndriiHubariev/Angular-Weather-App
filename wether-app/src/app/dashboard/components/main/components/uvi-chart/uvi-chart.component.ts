import { Component, OnInit } from '@angular/core';
import { DataRepositoryService } from 'src/app/model/data-repository.service';
import { Chart } from 'chart.js';
import { DashboardService } from 'src/app/dashboard/dashboard.service';

@Component({
  selector: 'app-uvi-chart',
  templateUrl: './uvi-chart.component.html',
  styleUrls: ['./uvi-chart.component.scss']
})
export class UviChartComponent implements OnInit {
  public uvi_chart: Chart = [];
  private weatherData;
  private dates = [];
  private uvi = [];
  constructor(private dataRepository: DataRepositoryService, private service: DashboardService) { }

  ngOnInit(): void {
    this.dataRepository.currentMultyWeather.subscribe(res => {
      this.weatherData = res;
      if (res.length > 0) {
        this.weatherData = res[0].daily;
        this.dates = this.service.getDates(this.weatherData);
        this.weatherData.forEach(e => {
           this.uvi.push(e.uvi);
        });
        this.uvi_chart = new Chart('uvi_chart', {
          type: 'bar',
          data: {
            labels: this.dates,
            datasets: [
              {
                label: 'Uvi',
                data: this.uvi,
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
