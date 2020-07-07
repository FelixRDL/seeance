import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AnalysisTemplate} from "../../../shared/core/AnalysisTemplate";
import {BehaviorSubject} from "rxjs";
import {PluginsService} from "../../../shared/plugins.service";
import {PreprocessorTemplate} from "../../../shared/core/PreprocessorTemplate";

@Component({
  selector: 'app-preprocessor-dropdown',
  templateUrl: './preprocessor-dropdown.component.html',
  styleUrls: ['./preprocessor-dropdown.component.scss']
})
export class PreprocessorDropdownComponent implements OnInit {

  @Output() onSelectTemplate: EventEmitter<PreprocessorTemplate> = new EventEmitter<PreprocessorTemplate>();
  templates: BehaviorSubject<PreprocessorTemplate[]> = new BehaviorSubject<PreprocessorTemplate[]>([]);

  constructor(
    private pluginService: PluginsService
  ) { }

  ngOnInit(): void {
    this.pluginService.getPreprocessorTemplates().subscribe((templates: PreprocessorTemplate[]) => {
      this.templates.next(templates);
    })
  }

  selectAnalysis(t: PreprocessorTemplate): void {
    this.onSelectTemplate.emit(t)
  }
}
