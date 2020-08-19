import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelModule } from '../model/model.module';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AsideComponent } from './components/aside/aside.component';
import { MainComponent } from './components/main/main.component';
import { DashboardService } from './dashboard.service';
import { MainChartComponent } from './components/main/components/main-chart/main-chart.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UviChartComponent } from './components/main/components/uvi-chart/uvi-chart.component';
import { DaysComponent } from './components/main/components/days/days.component';
import { PressureComponent } from './components/main/components/pressure/pressure.component';
import { HumidityComponent } from './components/main/components/humidity/humidity.component';
import { WindComponent } from './components/main/components/wind/wind.component';




@NgModule({
  declarations: [DashboardComponent, AsideComponent, MainComponent, MainChartComponent, UviChartComponent, DaysComponent, PressureComponent, HumidityComponent, WindComponent],
  imports: [
    CommonModule,
    ModelModule,
    RouterModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  providers: [DashboardService],
  exports: [DashboardComponent]
})
export class DashboardModule { }
