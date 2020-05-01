import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { RecentContentsComponent } from './recent-contents/recent-contents.component';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCommonModule} from "@angular/material/core";



@NgModule({
  declarations: [StartComponent, RecentContentsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatCommonModule
  ],
  exports: [
    StartComponent,
    RecentContentsComponent
  ]
})
export class HomeModule { }
