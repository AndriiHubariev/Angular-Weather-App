import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { DataRepositoryService } from '../services/data-repository.service';
import { DashboardService } from '../services/dashboard.service';
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
  public isSearchingCity = false;

  constructor(
    private dataRepository: DataRepositoryService,
  ) {}

  toggleSearchCity(state: boolean) {
    this.isSearchingCity = state;
    if (this.isSearchingCity) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  sidebarToogle(state: boolean) {
    this.sidebarToggle = state;
  }

  ngOnInit(): void {
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
