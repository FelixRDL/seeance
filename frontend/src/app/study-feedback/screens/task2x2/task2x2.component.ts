import { Component, OnInit } from '@angular/core';
import {StudyService} from "../../../shared/study.service";

@Component({
  selector: 'app-task2x2',
  templateUrl: './task2x2.component.html',
  styleUrls: ['./task2x2.component.scss']
})
export class Task2x2Component implements OnInit {

  projectName: string = 'bulletins'

  isHavingIssues: string;
  indicators: string;
  intervention: string;
  supportThroughTool: string;
  indicatorsWithoutTool: string;


  constructor(
    public study: StudyService
  ) { }

  ngOnInit(): void {
  }

  proceed() {
    this.study.submitTaskComplete('2x2', {
      isHavingIssues: this.isHavingIssues,
      indicators: this.indicators,
      intervention: this.intervention,
      supportThroughTool: this.supportThroughTool,
      indicatorsWithoutTool: this.indicatorsWithoutTool
    }).subscribe(() => {
      this.study.proceedTo('ueq_2x2')
    })
  }

  cancel(): void {
    this.study.proceedTo('notes')
  }

}
