import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import {CourseService} from "../shared/course.service";
import {UserService} from "../shared/user.service";
import {ProjectService} from "../shared/project.service";
import {SharedModule} from "../shared/shared.module";
import {MaterialModule} from "../material/material.module";
import {RouterModule} from "@angular/router";
import { AddAnalysisModalComponent } from './plugins/add-analysis-modal/add-analysis-modal.component';
import { AnalysisDropdownComponent } from './plugins/analysis-dropdown/analysis-dropdown.component';
import {MatDialogModule} from "@angular/material/dialog";
import { AnalysisListComponent } from './plugins/analysis-list/analysis-list.component';

@NgModule({
    declarations: [
        ProjectComponent,
        AddAnalysisModalComponent,
        AnalysisDropdownComponent,
        AnalysisDropdownComponent,
        AnalysisListComponent
    ],
  imports: [
    MaterialModule,
    MatDialogModule,
    CommonModule,
    SharedModule,
    RouterModule
  ],
  providers: [
    CourseService,
    UserService,
    ProjectService
  ]
})
export class ProjectModule { }
