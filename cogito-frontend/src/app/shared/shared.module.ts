import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCommonModule} from "@angular/material/core";
import {HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './navbar/navbar.component';
import {MaterialModule} from "../material/material.module";
import {RouterModule} from "@angular/router";
import { NavCourseListComponent } from './navbar/nav-course-list/nav-course-list.component';



@NgModule({
  declarations: [HeaderComponent, NavbarComponent, NavCourseListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    RouterModule
  ],
    exports: [
        HeaderComponent,
        NavbarComponent
    ]
})
export class SharedModule { }
