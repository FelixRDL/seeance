import { Component, OnInit } from '@angular/core';
import {StudyService} from "../../../shared/study.service";

@Component({
  selector: 'app-task1-1',
  templateUrl: './task1_1.component.html',
  styleUrls: ['./task1_1.component.scss']
})
export class Task1_1Component implements OnInit {

  private taskId: string = '1x1'

  groupNames: string;
  indicators: string;
  intervention: string;
  supportThroughTool: string;
  indicatorsWithoutTool: string;
  relevance: string;

  isSubmitting = false

  constructor(
    public study: StudyService
  ) { }

  ngOnInit(): void {
    this.study.submitTaskStart(this.taskId, 'reading')
  }

  submit(): void {
    this.isSubmitting = true
    this.study.submitTaskComplete(this.taskId, {
      groupNames: this.groupNames,
      indicators: this.indicators,
      intervention: this.intervention,
      supportThroughTool: this.supportThroughTool,
      indicatorsWithoutTool: this.indicatorsWithoutTool,
      relevance: this.relevance
    }).subscribe(() => {
      this.study.proceedTo(`ueq_${this.taskId}`)
    })
  }

  cancel(): void {
    this.study.proceedTo('notes')
  }

  startTask(): void {
    this.study.submitSystemEvent('taskStarted', {
      task: this.taskId,
      timestamp: Date.now()
    })
    this.study.proceedTo(`${this.taskId}_working`)
  }

  finishTask(): void {
    this.study.submitSystemEvent('taskFinished', {
      task: this.taskId,
      timestamp: Date.now()
    })
    this.study.proceedTo(`${this.taskId}_questionnaire`)
  }

  skipTask(): void {
    this.study.submitSystemEvent('taskSkipped', {
      task: this.taskId,
      timestamp: Date.now()
    })
    this.study.proceedTo(`ueq_${this.taskId}`)
  }

}
