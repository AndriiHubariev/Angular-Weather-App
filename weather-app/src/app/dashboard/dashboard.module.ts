import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelModule } from '../model/model.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DashboardComponent } from './dashboard.component';
import { AsideComponent } from './components/aside/aside.component';
import { MainComponent } from './components/main/main.component';
import { DashboardService } from './dashboard.service';
import { MainChartComponent } from './components/main/components/main-chart/main-chart.component';
import { UviChartComponent } from './components/main/components/uvi-chart/uvi-chart.component';
import { DaysComponent } from './components/main/components/days/days.component';
import { PressureComponent } from './components/main/components/pressure/pressure.component';
import { HumidityComponent } from './components/main/components/humidity/humidity.component';
import { WindComponent } from './components/main/components/wind/wind.component';
import { DirectiveDirective } from '../dashboard/directive.directive';

@NgModule({
  declarations: [
    DashboardComponent,
    AsideComponent,
    MainComponent,
    MainChartComponent,
    UviChartComponent,
    DaysComponent,
    PressureComponent,
    HumidityComponent,
    WindComponent,
    DirectiveDirective
  ],
  imports: [
    CommonModule,
    ModelModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    GooglePlaceModule
  ],
  providers: [DashboardService],
  exports: [DashboardComponent],
})
export class DashboardModule {}
