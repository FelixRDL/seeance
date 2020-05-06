import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../../shared/core/Project";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  @Input() projects: Project[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
