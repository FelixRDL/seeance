import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Analysis} from "../../../shared/core/Analysis";
import {StudyService} from "../../../shared/study.service";

@Component({
  selector: 'app-analysis-list',
  templateUrl: './analysis-list.component.html',
  styleUrls: ['./analysis-list.component.scss']
})
export class AnalysisListComponent implements OnInit {

  @Input() analyses: Analysis[] = [];
  @Input() courseId: string;
  @Input() projectId: string;
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>()

  constructor(
    public study: StudyService
  ) { }

  ngOnInit(): void {
  }

  delete(id: string): void {
    this.onDelete.emit(id)
  }

  isConfigurable(analysis: Analysis): boolean {
    return Object.keys(analysis.template.configSchema).length > 0
  }

  isStudyFinished(): boolean {
    return this.study.isStudyFinished()
  }

}
