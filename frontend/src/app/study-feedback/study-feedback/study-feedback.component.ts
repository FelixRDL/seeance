import {Component, ElementRef, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {StudyService} from "../../shared/study.service";

@Component({
  selector: 'app-study-feedback',
  templateUrl: './study-feedback.component.html',
  styleUrls: ['./study-feedback.component.scss']
})

export class StudyFeedbackComponent implements OnInit {
  isExpanded = true;
  isStudyFinished = false;
  state: string;
  constructor(
    public study: StudyService,
    private elRef:ElementRef
  ) { }

  ngOnInit(): void {
    this.study.state.subscribe((newState: string) => {
      this.state = newState;
      if(newState === 'thanks') {
        this.isStudyFinished = true
      }
      if(!newState.includes('_reading')) {
        this.elRef.nativeElement.classList.add('normal-size')
        this.elRef.nativeElement.classList.remove('maxi-size')
      } else {
        this.elRef.nativeElement.classList.add('maxi-size')
        this.elRef.nativeElement.classList.remove('normal-size')
      }
    })
  }

  toggle() {
    this.isExpanded = !this.isExpanded
  }
}
