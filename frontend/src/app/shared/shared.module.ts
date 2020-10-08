import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import {MaterialModule} from '../material/material.module';
import {RouterModule} from '@angular/router';
import { NavCourseListComponent } from './navbar/nav-course-list/nav-course-list.component';
import { ConfirmModalComponent } from './modals/confirm.modal/confirm.modal.component';
import { NavCourseListEntryComponent } from './navbar/nav-course-list/nav-course-list-entry/nav-course-list-entry.component';
import {AllowRawPipe} from './allow-raw.pipe';
import {InfoModalComponent} from './modals/info.modal/info.modal.component';
import {MarkdownModule} from "ngx-markdown";
import {TransformPluginNamePipe} from "./transform-plugin-name.pipe";



@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    NavCourseListComponent,
    ConfirmModalComponent,
    NavCourseListEntryComponent,
    AllowRawPipe,
    TransformPluginNamePipe,
    InfoModalComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        MaterialModule,
        RouterModule,
        MarkdownModule
    ],
  exports: [
    HeaderComponent,
    NavbarComponent,
    AllowRawPipe,
    TransformPluginNamePipe
  ]
})
export class SharedModule { }
