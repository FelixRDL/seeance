import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PluginsService} from '../../../shared/plugins.service';
import {AnalysisTemplate} from '../../../shared/core/AnalysisTemplate';
import {BehaviorSubject} from 'rxjs';
import _ from 'lodash';

@Component({
  selector: 'app-analysis-dropdown',
  templateUrl: './analysis-dropdown.component.html',
  styleUrls: ['./analysis-dropdown.component.scss']
})
export class AnalysisDropdownComponent implements OnInit {
  @Output() onSelectTemplate: EventEmitter<AnalysisTemplate> = new EventEmitter<AnalysisTemplate>();
  templates: BehaviorSubject<AnalysisTemplate[]> = new BehaviorSubject<AnalysisTemplate[]>([]);

  constructor(
    private pluginService: PluginsService
  ) { }

  ngOnInit(): void {
    this.pluginService.getAnalysisTemplates().subscribe((templates: AnalysisTemplate[]) => {
      console.log(templates);
      this.templates.next(templates);
    });
  }

  selectAnalysis(t: AnalysisTemplate): void {
    this.onSelectTemplate.emit(t);
  }
}
