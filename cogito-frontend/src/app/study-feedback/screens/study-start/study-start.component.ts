import { Component, OnInit } from '@angular/core';
import {StudyService} from "../../../shared/study.service";

@Component({
  selector: 'app-study-start',
  templateUrl: './study-start.component.html',
  styleUrls: ['./study-start.component.scss']
})
export class StudyStartComponent implements OnInit {

  constructor(
    private study: StudyService
  ) { }

  ngOnInit(): void {
  }

  proceed(): void {
    this.study.proceedTo('demographics')
  }

}