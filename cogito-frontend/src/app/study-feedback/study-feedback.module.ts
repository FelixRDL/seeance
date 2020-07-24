import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyFeedbackComponent } from './study-feedback/study-feedback.component';
import {MaterialModule} from "../material/material.module";
import { StudyStartComponent } from './screens/study-start/study-start.component';



@NgModule({
    declarations: [StudyFeedbackComponent, StudyStartComponent],
    exports: [
        StudyFeedbackComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ]
})
export class StudyFeedbackModule { }
