import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-study-feedback',
  templateUrl: './study-feedback.component.html',
  styleUrls: ['./study-feedback.component.scss']
})
export class StudyFeedbackComponent implements OnInit {
  isExpanded = true;
  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

}
