import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/model/appState.interface';
import { DashboardStateInterface } from 'src/app/model/dashboardState.interface';

export const dashboardFutureSelector = createFeatureSelector<AppStateInterface, DashboardStateInterface>('dashboard');

export const WeatherDataSelector = createSelector(
  dashboardFutureSelector,
    (dashboardState: DashboardStateInterface) => dashboardState.weatherData
);
export const LoadingStateSelector = createSelector(
  dashboardFutureSelector,
    (dashboardState: DashboardStateInterface) => dashboardState.isLoading
);
