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



@NgModule({
    declarations: [StudyFeedbackComponent, StudyStartComponent, DemographicsComponent, Task1_1Component, UeqComponent, MiscNotesComponent, ThanksComponent],
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
