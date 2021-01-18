import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { DataRepositoryService } from '../model/data-repository.service';
import { DashboardService } from './dashboard.service';
import { sidebarAnim, showArrow} from '../app-animations';
import { SubSink } from 'SubSink';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [sidebarAnim, showArrow]
})
export class DashboardComponent

  implements OnInit, OnDestroy {
  public sidebarToggle;
  public dateReceived: boolean;
  public currentCityName: string;
  public wrongCityErr = '';
  private subs$ =  new SubSink();

  constructor(
    private dataRepository: DataRepositoryService,
    private service: DashboardService
  ) {}
  sidebarToogle() {
    this.sidebarToggle
      ? this.service.sidebarToggle.next(false)
      : this.service.sidebarToggle.next(true);
  }
  ngOnInit(): void {
    this.subs$.sink = this.service.isWrongCity.subscribe(res => res
      ? this.wrongCityErr = 'wrong city name'
      : this.wrongCityErr = '');
    this.subs$.sink = this.service.sidebarToggle.subscribe((res) => this.sidebarToggle = res);
    this.subs$.sink = this.dataRepository.currentOneDayWr.subscribe(res => {
     if (res.length > 0) {
       this.dateReceived = true;
       this.currentCityName = res[0].name;
     } else{
       this.dateReceived = false;
     }
   });
  }
  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }
}
