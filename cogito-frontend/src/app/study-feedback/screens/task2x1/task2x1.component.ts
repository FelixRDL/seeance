import { Component, OnInit } from '@angular/core';
import {StudyService} from "../../../shared/study.service";

@Component({
  selector: 'app-task2x1',
  templateUrl: './task2x1.component.html',
  styleUrls: ['./task2x1.component.scss']
})
export class Task2x1Component implements OnInit {

  isHavingIssues: string;
  indicators: string;
  intervention: string;
  supportThroughTool: string;
  indicatorsWithoutTool: string;


  constructor(
    private study: StudyService
  ) { }

  ngOnInit(): void {
  }

  proceed() {
    this.study.submitTaskComplete('2x1', {
      isHavingIssues: this.isHavingIssues,
      indicators: this.indicators,
      intervention: this.intervention,
      supportThroughTool: this.supportThroughTool,
      indicatorsWithoutTool: this.indicatorsWithoutTool
    }).subscribe(() => {
      this.study.proceedTo('ueq_2x1')
    })
  }

  cancel(): void {
    this.study.proceedTo('notes')
  }

}
