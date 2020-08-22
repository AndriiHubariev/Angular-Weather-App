import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DataRepositoryService } from 'src/app/model/data-repository.service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.scss']
})
export class HumidityComponent implements OnInit {
  @ViewChild('humCanvas') humCanvas;
  public humChart: Chart = [];
  public humidityStat;
  public dates = []

  constructor(private dataRepository: DataRepositoryService, private service: DashboardService) {}

  ngOnInit(): void {
    this.dataRepository.currentMultyWeather.subscribe((res: [{humidity, dt}]) => {
      if (res.length > 0) {
        this.humidityStat = [];
        res.forEach(d => this.humidityStat.push(d.humidity));
        this.dates = this.service.getDates(res);
        if (this.humChart.canvas) {
          this.humCanvas.nativeElement.childNodes[1].remove();
          this.humCanvas.nativeElement.innerHTML = '<canvas id="hum_chart">{{humChart}}</canvas>';
        }
        this.humChart = new Chart ('hum_chart', {
          type: 'bar',
              data: {
                labels: this.dates,
                datasets: [
                  {
                    label: 'Humidity',
                    data: this.humidityStat,
                    fill: false
                  },
                ],
              },
              options: {
                responsive: true,
                elements: {
                  rectangle: {
                    borderColor: 'rgb(37, 37, 245)',
                    borderWidth: 1
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
