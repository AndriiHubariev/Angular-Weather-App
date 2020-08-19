import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourceService } from './data-source.service';
import { DataRepositoryService } from './data-repository.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [DataSourceService, DataRepositoryService]
})
export class ModelModule { }
