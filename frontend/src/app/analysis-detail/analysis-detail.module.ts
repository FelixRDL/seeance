import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisDetailComponent } from './analysis-detail/analysis-detail.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material/material.module';



@NgModule({
  declarations: [
    AnalysisDetailComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class AnalysisDetailModule { }
