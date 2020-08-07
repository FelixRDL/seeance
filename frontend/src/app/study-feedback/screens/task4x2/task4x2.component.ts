import { Component, OnInit } from '@angular/core';
import {StudyService} from "../../../shared/study.service";

@Component({
  selector: 'app-task4x2',
  templateUrl: './task4x2.component.html',
  styleUrls: ['./task4x2.component.scss']
})
export class Task4x2Component implements OnInit {

  private taskId: string = '4x2'

  projectName: string = 'seminario'

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
    this.study.submitTaskComplete(this.taskId, {
      isHavingIssues: this.isHavingIssues,
      indicators: this.indicators,
      intervention: this.intervention,
      supportThroughTool: this.supportThroughTool,
      indicatorsWithoutTool: this.indicatorsWithoutTool
    }).subscribe(() => {
      this.study.proceedTo(`ueq_${this.taskId}`)
    })
  }

  cancel(): void {
    this.study.proceedTo('notes')
  }
}
