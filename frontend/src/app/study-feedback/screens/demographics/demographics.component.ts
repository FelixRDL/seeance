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
  isUsingTools: boolean;
  isExperiencedWithGitAnalysis: boolean;

  isSubmitting = false

  constructor(
    public study: StudyService
  ) { }

  ngOnInit(): void {

  }

  proceed(): void {
    this.isSubmitting = true
    this.study.submitDemographics({
      timeInDomain: this.timeInDomain,
      teamSize: this.teamSize,
      learningContent: this.learningContent,
      role: this.role,
      isUsingTools: this.isUsingTools,
      isExperiencedWithGitAnalysis: this.isExperiencedWithGitAnalysis
    }).subscribe(() => {
      this.study.proceedTo('tasks');
    });
  }
}
