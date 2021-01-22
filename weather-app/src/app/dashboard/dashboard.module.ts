import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DashboardComponent } from './dashboard.component';
import { AsideComponent } from './components/aside/aside.component';
import { MainComponent } from './components/main/main.component';
import { DaysComponent } from './components/main/components/days/days.component';
import { HeaderComponent } from './components/header/header.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchCityComponent } from './components/searchCity/searchCity.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { reducer } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import { ChartComponent } from './components/main/components/chart/chart.component';
import { FetchEffect } from './store/effects/fetchWeatherData.effect';

const routes: Routes = [
  {
    path: '', component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    AsideComponent,
    MainComponent,
    DaysComponent,
    HeaderComponent,
    SearchCityComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    GooglePlaceModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('dashboard', reducer),
    EffectsModule.forFeature([FetchEffect])
  ],
  providers: [],
  exports: [DashboardComponent],
})
export class DashboardModule {}
