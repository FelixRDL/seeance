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

  constructor(
    private study: StudyService
  ) { }

  ngOnInit(): void {

  }

  proceed(): void {
    this.study.submitDemographics({
      timeInDomain: this.timeInDomain,
      teamSize: this.teamSize,
      learningContent: this.learningContent,
      role: this.role
    });
    // TODO: remove this later on!
    this.study.proceedTo('ueq');
  }
}
