import { Component, OnInit } from '@angular/core';
import {StudyService} from "../../../shared/study.service";

@Component({
  selector: 'app-task2x2',
  templateUrl: './task2x2.component.html',
  styleUrls: ['./task2x2.component.scss']
})
export class Task2x2Component implements OnInit {

  projectName: string = 'bulletins'
  taskId: string = '2x2'

  isHavingIssues: string;
  indicators: string;
  intervention: string;
  supportThroughTool: string;
  indicatorsWithoutTool: string;
  relevance: string;


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
