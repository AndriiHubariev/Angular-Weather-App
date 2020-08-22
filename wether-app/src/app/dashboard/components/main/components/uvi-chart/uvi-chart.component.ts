import { Component, OnInit, ViewChild, AfterContentInit, ViewChildren } from '@angular/core';
import { DataRepositoryService } from 'src/app/model/data-repository.service';
import { Chart } from 'chart.js';
import { DashboardService } from 'src/app/dashboard/dashboard.service';


@Component({
  selector: 'app-uvi-chart',
  templateUrl: './uvi-chart.component.html',
  styleUrls: ['./uvi-chart.component.scss']
})
export class UviChartComponent implements OnInit, AfterContentInit {
  @ViewChild('Chart') canvas;
  public uviChart: Chart = [];
  private weatherData;
  private dates = [];
  private uvi = [];
  constructor(private dataRepository: DataRepositoryService, private service: DashboardService) {}
  ngAfterContentInit(): void {
  }

  ngOnInit(): void {
    this.dataRepository.currentMultyWeather.subscribe(res => {
      if (res.length > 0) {
        this.weatherData = res;
        this.dates = this.service.getDates(this.weatherData);
        const arr = [];
        this.weatherData.forEach(e => {
          arr.push(e.uvi);
        });
        this.uvi = arr;
        if (this.uviChart.canvas) {
          this.canvas.nativeElement.childNodes[1].remove();
          this.canvas.nativeElement.innerHTML = '<canvas id="uviChart">{{uviChart}}</canvas>';
        }
        this.uviChart = new Chart('uviChart', {
          type: 'bar',
          data: {
            mouseover: false,
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
                borderColor: 'rgb(255, 127, 80, .5)',
                backgroundColor: 'rgb(255, 127, 80, .1)',
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
                  ticks: {
                    min: 0,
                    max: 20,
                    stepSize: 2,
                  },
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
