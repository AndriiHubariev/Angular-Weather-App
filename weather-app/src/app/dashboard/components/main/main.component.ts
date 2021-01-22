import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartsDataInterface } from 'src/app/model/chartsData.interface';
import { WeatherDataSelector } from '../../store/selectors';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  @Input() toggleSidebarState: boolean;
  public chartsData: ChartsDataInterface;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.select(WeatherDataSelector).subscribe(res => {
      this.chartsData = res?.chartsData;
    });
  }
}
