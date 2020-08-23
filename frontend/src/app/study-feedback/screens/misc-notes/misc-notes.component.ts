import { Component, OnInit } from '@angular/core';
import {StudyService} from "../../../shared/study.service";

@Component({
  selector: 'app-misc-notes',
  templateUrl: './misc-notes.component.html',
  styleUrls: ['./misc-notes.component.scss']
})
export class MiscNotesComponent implements OnInit {

  notes: string;
  wouldUseInClass: string;
  closenessToReality: string;
  benefit: string;

  isSubmitting = false

  constructor(
    public study: StudyService
  ) { }

  ngOnInit(): void {
  }

  proceed(): void {
    this.isSubmitting = true
    this.study.submitNotes({
      notes: this.notes,
      wouldUseInClass: this.wouldUseInClass,
      closenessToReality: this.closenessToReality,
      benefit: this.benefit
    }).subscribe(() => {
      this.study.proceedTo('thanks');
    })
  }
}
