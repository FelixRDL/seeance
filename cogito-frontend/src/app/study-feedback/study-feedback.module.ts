import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyFeedbackComponent } from './study-feedback/study-feedback.component';
import {MaterialModule} from '../material/material.module';
import { StudyStartComponent } from './screens/study-start/study-start.component';
import { DemographicsComponent } from './screens/demographics/demographics.component';
import { Task1Component } from './screens/task1/task1.component';
import {FormsModule} from '@angular/forms';
import { UeqComponent } from './screens/ueq/ueq.component';
import { MiscNotesComponent } from './screens/misc-notes/misc-notes.component';
import { ThanksComponent } from './screens/thanks/thanks.component';



@NgModule({
    declarations: [StudyFeedbackComponent, StudyStartComponent, DemographicsComponent, Task1Component, UeqComponent, MiscNotesComponent, ThanksComponent],
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
