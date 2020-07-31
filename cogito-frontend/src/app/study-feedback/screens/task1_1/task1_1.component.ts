import { Component, OnInit } from '@angular/core';
import {StudyService} from "../../../shared/study.service";

@Component({
  selector: 'app-task1-1',
  templateUrl: './task1_1.component.html',
  styleUrls: ['./task1_1.component.scss']
})
export class Task1_1Component implements OnInit {

  groupNames: string;
  indicators: string;
  intervention: string;
  supportThroughTool: string;
  indicatorsWithoutTool: string;

  isSubmitting = false

  constructor(
    private study: StudyService
  ) { }

  ngOnInit(): void {
    this.study.submitTaskStart('1x1')
  }

  proceed(): void {
    this.isSubmitting = true
    this.study.submitTaskComplete('1x1', {
      groupNames: this.groupNames,
      indicators: this.indicators,
      intervention: this.intervention,
      supportThroughTool: this.supportThroughTool,
      indicatorsWithoutTool: this.indicatorsWithoutTool
    }).subscribe(() => {
      this.study.proceedTo('ueq_1x1')
    })
  }

}
