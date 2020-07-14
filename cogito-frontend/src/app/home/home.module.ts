import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { RecentContentsComponent } from './recent-contents/recent-contents.component';
import {MaterialModule} from "../material/material.module";
import {AppRoutingModule} from "../app-routing.module";



@NgModule({
  declarations: [StartComponent, RecentContentsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ],
  exports: [
    StartComponent,
    RecentContentsComponent
  ]
})
export class HomeModule { }
