import { Component, OnInit } from '@angular/core';
import {StudyService} from "../../../shared/study.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task3x2',
  templateUrl: './task3x2.component.html',
  styleUrls: ['./task3x2.component.scss']
})
export class Task3x2Component implements OnInit {

  private taskId: string = '3x2'

  isSeparationOk: string;
  indicators: string;
  intervention: string;
  supportThroughTool: string;
  indicatorsWithoutTool: string;
  relevance: string;

  projectName: string = 'seminario'


  constructor(
    public study: StudyService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  proceed() {
    this.study.submitTaskComplete(this.taskId, {
      isSeparationOk: this.isSeparationOk,
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
    this.router.navigate([''])
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
