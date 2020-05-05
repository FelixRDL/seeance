import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course/course.component';
import {MaterialModule} from "../material/material.module";
import {MatCommonModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import { CourseEditorComponent } from './course-editor/course-editor.component';
import {SharedModule} from "../shared/shared.module";
import {CourseService} from "../shared/course.service";
import {UserService} from "../shared/user.service";
import { CreateCourseComponent } from './create-course/create-course.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    CourseComponent,
    CourseEditorComponent,
    CreateCourseComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    CourseService,
    UserService
  ],
  exports: [
    CourseComponent
  ]
})
export class CourseModule { }
