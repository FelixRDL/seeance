import { Component, OnInit } from '@angular/core';
import {StudyService} from "../../../shared/study.service";

@Component({
  selector: 'app-misc-notes',
  templateUrl: './misc-notes.component.html',
  styleUrls: ['./misc-notes.component.scss']
})
export class MiscNotesComponent implements OnInit {

  notes: string;

  constructor(
    private study: StudyService
  ) { }

  ngOnInit(): void {
  }

  proceed(): void {
    this.study.proceedTo('thanks');
  }

}
