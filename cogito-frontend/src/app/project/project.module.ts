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
import { AddPreprocessorModalComponent } from './plugins/add-preprocessor-modal/add-preprocessor-modal.component';
import { PreprocessorDropdownComponent } from './plugins/preprocessor-dropdown/preprocessor-dropdown.component';

@NgModule({
    declarations: [
        ProjectComponent,
        AddAnalysisModalComponent,
        AnalysisDropdownComponent,
        AnalysisDropdownComponent,
        AnalysisListComponent,
        AddPreprocessorModalComponent,
        PreprocessorDropdownComponent
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
