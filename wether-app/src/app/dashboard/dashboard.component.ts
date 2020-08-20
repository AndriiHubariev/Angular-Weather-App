import {
  Component,
  OnInit,
  AfterViewInit,
  AfterContentChecked,
  OnDestroy,
} from '@angular/core';
import { DataRepositoryService } from '../model/data-repository.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DashboardService } from './dashboard.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { sidebarAnim } from '../app-animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [sidebarAnim]
})
export class DashboardComponent

  implements OnInit {
  public sidebarToggle;
  public dateReceived: boolean;
  public currentCityName: string;
  public wrongCityErr = '';

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
    this.service.isWrongCity.subscribe(res => res
      ? this.wrongCityErr = 'wrong city name'
      : this.wrongCityErr = '');
    this.service.sidebarToggle.subscribe((res) => (this.sidebarToggle = res));
    this.dataRepository.currentOneDayWr.subscribe(res => {
     if (res.length > 0) {
       this.dateReceived = true;
       this.currentCityName = res[0].name;
     } else{
       this.dateReceived = false;
     }
   });
  }
}
