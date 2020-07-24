import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyFeedbackComponent } from './study-feedback/study-feedback.component';
import {MaterialModule} from "../material/material.module";
import { StudyStartComponent } from './screens/study-start/study-start.component';
import { DemographicsComponent } from './screens/demographics/demographics.component';
import { Task1Component } from './screens/task1/task1.component';



@NgModule({
    declarations: [StudyFeedbackComponent, StudyStartComponent, DemographicsComponent, Task1Component],
    exports: [
        StudyFeedbackComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ]
})
export class StudyFeedbackModule { }
