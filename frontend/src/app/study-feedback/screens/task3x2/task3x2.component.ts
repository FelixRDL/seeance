import { Component, OnInit } from '@angular/core';
import {StudyService} from "../../../shared/study.service";

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

  projectName: string = 'seminario'


  constructor(
    public study: StudyService
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
