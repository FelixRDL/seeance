import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import { CourseEditorComponent } from './course-editor/course-editor.component';
import {SharedModule} from "../shared/shared.module";
import {CourseService} from "../shared/course.service";
import {UserService} from "../shared/user.service";
import { CreateCourseComponent } from './create-course/create-course.component';
import {RouterModule} from "@angular/router";
import {ProjectService} from "../shared/project.service";
import { RepositoryAutocompleteComponent } from './edit-course/project-autocomplete/repository-autocomplete.component';
import { ProjectListComponent } from './edit-course/project-list/project-list.component';
import { EditCourseComponent } from './edit-course/edit-course.component';



@NgModule({
  declarations: [
    CourseEditorComponent,
    CreateCourseComponent,
    RepositoryAutocompleteComponent,
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
  ]
})
export class CourseModule { }
