import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyFeedbackComponent } from './study-feedback/study-feedback.component';
import {MaterialModule} from '../material/material.module';
import { StudyStartComponent } from './screens/study-start/study-start.component';
import { DemographicsComponent } from './screens/demographics/demographics.component';
import {FormsModule} from '@angular/forms';
import { UeqComponent } from './screens/ueq/ueq.component';
import { MiscNotesComponent } from './screens/misc-notes/misc-notes.component';
import { ThanksComponent } from './screens/thanks/thanks.component';
import {Task1_1Component} from "./screens/task1_1/task1_1.component";
import { Task2x1Component } from './screens/task2x1/task2x1.component';
import { Task3x1Component } from './screens/task3x1/task3x1.component';
import { Task4x1Component } from './screens/task4x1/task4x1.component';
import { Task5x1Component } from './screens/task5x1/task5x1.component';
import { Task2x2Component } from './screens/task2x2/task2x2.component';
import { Task3x2Component } from './screens/task3x2/task3x2.component';



@NgModule({
    declarations: [StudyFeedbackComponent, StudyStartComponent, DemographicsComponent, Task1_1Component, UeqComponent, MiscNotesComponent, ThanksComponent, Task2x1Component, Task3x1Component, Task4x1Component, Task5x1Component, Task2x2Component, Task3x2Component],
    exports: [
        StudyFeedbackComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule
    ]
})
export class StudyFeedbackModule { }
