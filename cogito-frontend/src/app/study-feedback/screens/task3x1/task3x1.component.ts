import { Component, OnInit } from '@angular/core';
import {StudyService} from "../../../shared/study.service";

@Component({
  selector: 'app-task3x1',
  templateUrl: './task3x1.component.html',
  styleUrls: ['./task3x1.component.scss']
})
export class Task3x1Component implements OnInit {

  private taskId: string = '3x1'

  isSeparationOk: string;
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
    this.study.submitTaskComplete(this.taskId, {
      isSeparationOk: this.isSeparationOk,
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
