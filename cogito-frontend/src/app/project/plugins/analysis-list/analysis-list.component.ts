import {Component, Input, OnInit} from '@angular/core';
import {Analysis} from "../../../shared/core/Analysis";

@Component({
  selector: 'app-analysis-list',
  templateUrl: './analysis-list.component.html',
  styleUrls: ['./analysis-list.component.scss']
})
export class AnalysisListComponent implements OnInit {

  @Input() analyses: Analysis[] = [];
  @Input() courseId: string;
  @Input() projectId: string;

  constructor() { }

  ngOnInit(): void {
  }

}
