import { Component, OnInit } from '@angular/core';
import {StudyService} from "../../../shared/study.service";

@Component({
  selector: 'app-demographics',
  templateUrl: './demographics.component.html',
  styleUrls: ['./demographics.component.scss']
})
export class DemographicsComponent implements OnInit {

  timeInDomain: number;
  teamSize: number;
  learningContent: string;
  role: string;

  isSubmitting = false

  constructor(
    private study: StudyService
  ) { }

  ngOnInit(): void {

  }

  proceed(): void {
    this.isSubmitting = true
    this.study.submitDemographics({
      timeInDomain: this.timeInDomain,
      teamSize: this.teamSize,
      learningContent: this.learningContent,
      role: this.role
    }).subscribe(() => {
      this.study.proceedTo('tasks');
    });
  }
}
