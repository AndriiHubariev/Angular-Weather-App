import { Component, OnInit } from '@angular/core';
import { DataRepositoryService } from 'src/app/model/data-repository.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private dataRepository: DataRepositoryService) { }

  ngOnInit(): void { }

}
