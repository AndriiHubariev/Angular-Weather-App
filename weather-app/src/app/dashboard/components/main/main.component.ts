import { Component, OnInit } from '@angular/core';
import { DataRepositoryService } from 'src/app/model/data-repository.service';
import { Chart } from 'chart.js';
import { DashboardService } from '../../dashboard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  toggleSidebar: Observable<boolean>;
  constructor(private service: DashboardService) { }

  ngOnInit(): void {
    this.toggleSidebar = this.service.sidebarToggle;
   }

}
