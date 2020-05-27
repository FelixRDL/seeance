import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../../shared/project.service";
import {Observable, Subject} from "rxjs";
import {Project} from "../../shared/core/Project";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

  currentProject: Subject<Project> = new Subject<Project>();

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.projectService.getProjectById(params.courseId, params.projectId).subscribe((project: Project) => {
        this.currentProject.next(project);
      })
    });
  }
}
