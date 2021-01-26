import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input() stat: number[];
  @Input() dates: number[];
  @Input() minTemp: number[];
  @Input() maxTemp: number[];
  @Input() labelChart: string;
  @Input() chartType: string;

  public chart: Chart = [];

  constructor() {}
  ngOnInit() {}

  ngAfterViewInit(): void {
    if (this.labelChart) {
      if (this.chart.canvas) {
        this.chart.destroy();
      }
      this.minTemp || this.maxTemp
        ? this.createTempChart()
        : this.createBasicChart();
    }
  }

  setOptions(labelChart: string) {
    switch (labelChart) {
      case labelChart === 'Wind' ? 'Wind' : 'Pressure':
        return {
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
                  zeroLineColor: 'rgb(145, 198, 229, .0)',
                  color: [
                    'rgb(255, 72, 0, .0)',
                    'rgb(68, 184, 172, .1)',
                    'rgb(68, 184, 172, .1)',
                    'rgb(68, 184, 172, .1)',
                    'rgb(68, 184, 172, .1)',
                    'rgb(68, 184, 172, .1)',
                    'rgb(68, 184, 172, .1)',
                    'rgb(68, 184, 172, .1)',
                  ],
                  drawborder: false,
                },
              },
            ],
          },
        };
      case 'Humidity':
        return {
          elements: {
            rectangle: {
              borderColor: 'rgb(37, 37, 245)',
              borderWidth: 1,
            },
          },
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
                  zeroLineColor: 'rgb(145, 198, 229, .0)',
                  drawborder: false,
                },
              },
            ],
          },
        };
      case 'Uvi': {
        return {
          elements: {
            rectangle: {
              borderColor: 'rgb(255, 127, 80, .5)',
              backgroundColor: 'rgb(255, 127, 80, .1)',
              borderWidth: 2,
            },
          },
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
                  zeroLineColor: 'rgb(145, 198, 229, .0)',
                  drawborder: false,
                },
              },
            ],
          },
        };
      }
    }
  }

  setDataSets(labelChart: string) {
    switch (labelChart) {
      case labelChart === 'Wind' ? 'Wind' : 'Pressure':
        return {
          backgroundColor: 'rgb(68, 184, 172, .8)',
          borderColor: ['rgb(68, 184, 172, .8)'],
          borderWidth: 3,
          fill: false,
        };
      case 'Uvi' || 'Humidity':
        return {
          fill: false,
        };
    }
  }

  createBasicChart() {
    this.chart = new Chart(this.labelChart, {
      type: this.chartType,
      data: {
        labels: this.dates,
        datasets: [
          {
            label: this.labelChart,
            data: this.stat,
            ...this.setDataSets(this.labelChart),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...this.setOptions(this.labelChart),
      },
    });
  }

  createTempChart() {
    this.chart = new Chart(this.labelChart, {
      type: this.chartType,
      data: {
        labels: this.dates,
        datasets: [
          {
            label: 'max temp',
            data: this.maxTemp,
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
              ticks: {
                stepSize: 5,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                zeroLineColor: 'rgb(145, 198, 229, .0)',
                color: [
                  'rgb(255, 72, 0, .0)',
                  'rgb(255, 72, 0, .1)',
                  'rgb(255, 72, 0, .1)',
                  'rgb(255, 72, 0, .1)',
                  'rgb(255, 72, 0, .1)',
                  'rgb(255, 72, 0, .1)',
                  'rgb(255, 72, 0, .1)',
                  'rgb(255, 72, 0, .1)',
                ],
                drawborder: false,
              },
            },
          ],
        },
      },
    });
  }
}
