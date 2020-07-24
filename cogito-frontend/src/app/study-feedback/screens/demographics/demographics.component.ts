import { Component, OnInit } from '@angular/core';
import {StudyService} from "../../../shared/study.service";

@Component({
  selector: 'app-demographics',
  templateUrl: './demographics.component.html',
  styleUrls: ['./demographics.component.scss']
})
export class DemographicsComponent implements OnInit {

  constructor(
    private study: StudyService
  ) { }

  ngOnInit(): void {

  }

  proceed(): void {
    this.study.proceedTo('tasks')
  }

}
