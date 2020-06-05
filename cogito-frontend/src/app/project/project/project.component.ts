import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../../shared/project.service";
import {Observable, Subject} from "rxjs";
import {Project} from "../../shared/core/Project";
import {ActivatedRoute} from "@angular/router";
import {Course} from "../../shared/core/Course";
import {CourseService} from "../../shared/course.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

  activeProject: Subject<Project> = new Subject<Project>();
  activeCourse: Subject<Course> = new Subject<Course>();

  constructor(
    private projectService: ProjectService,
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {

      this.courseService.getCourseById(params.courseId).subscribe((course: Course) => {
        this.activeCourse.next(course);
        this.projectService.getProjectById(course._id, params.projectId).subscribe((project: Project) => {
          this.activeProject.next(project);
        });
      })

    });
  }
}
