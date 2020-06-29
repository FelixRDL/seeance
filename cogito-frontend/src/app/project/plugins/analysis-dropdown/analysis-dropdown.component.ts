import { Component, OnInit } from '@angular/core';
import {PluginsService} from "../../../shared/plugins.service";
import {AnalysisTemplate} from "../../../shared/core/AnalysisTemplate";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-analysis-dropdown',
  templateUrl: './analysis-dropdown.component.html',
  styleUrls: ['./analysis-dropdown.component.scss']
})
export class AnalysisDropdownComponent implements OnInit {

  templates: BehaviorSubject<AnalysisTemplate[]> = new BehaviorSubject<AnalysisTemplate[]>([]);

  constructor(
    private pluginService: PluginsService
  ) { }

  ngOnInit(): void {
    this.pluginService.getAnalysisTemplates().subscribe((templates: AnalysisTemplate[]) => {
      this.templates.next(templates);
    })
  }
}
