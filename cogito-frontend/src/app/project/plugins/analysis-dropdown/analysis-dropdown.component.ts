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
  templateGroups: TemplateGroup[];


  constructor(
    private pluginService: PluginsService
  ) { }

  ngOnInit(): void {
    this.pluginService.getAnalysisTemplates().subscribe((templates: AnalysisTemplate[]) => {
      const groupedTemplates = _.groupBy(templates, template => template.category);
      this.templateGroups = Object.keys(groupedTemplates).map(k => {
        let name = k;
        name = k.replace( /\-/gi, ' ');
        return {
          templates: groupedTemplates[k],
          groupName: name !== 'undefined' ? name : 'None'
        };
      });
      this.templateGroups.sort((a, b) => a.groupName >= b.groupName ? 1 : -1);
    });
  }

  selectAnalysis(t: AnalysisTemplate): void {
    this.onSelectTemplate.emit(t);
  }
}

export interface TemplateGroup {
  templates: AnalysisTemplate[];
  groupName: string;
}
