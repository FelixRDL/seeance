import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {StudyService} from "../../shared/study.service";

@Component({
  selector: 'app-study-feedback',
  templateUrl: './study-feedback.component.html',
  styleUrls: ['./study-feedback.component.scss']
})
export class StudyFeedbackComponent implements OnInit {
  isExpanded = true;
  state: string;
  constructor(
    public study: StudyService
  ) { }

  ngOnInit(): void {
    this.study.state.subscribe((newState: string) => {
      this.state = newState;
    });
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

}
