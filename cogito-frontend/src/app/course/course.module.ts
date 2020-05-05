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
import {ProjectService} from "../shared/project.service";
import { ProjectAutocompleteComponent } from './edit-course/project-autocomplete/project-autocomplete.component';
import { ProjectListComponent } from './edit-course/project-list/project-list.component';
import { EditCourseComponent } from './edit-course/edit-course.component';



@NgModule({
  declarations: [
    CourseComponent,
    CourseEditorComponent,
    CreateCourseComponent,
    ProjectAutocompleteComponent,
    ProjectListComponent,
    EditCourseComponent
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
    UserService,
    ProjectService
  ],
  exports: [
    CourseComponent
  ]
})
export class CourseModule { }
