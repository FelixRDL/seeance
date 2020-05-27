import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import {CourseService} from "../shared/course.service";
import {UserService} from "../shared/user.service";
import {ProjectService} from "../shared/project.service";
import {SharedModule} from "../shared/shared.module";
import {MaterialModule} from "../material/material.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    ProjectComponent
  ],
  imports: [
    MaterialModule,
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
