import {Component, Input, OnInit} from '@angular/core';
import {Course} from "../../../core/Course";
import {BehaviorSubject, Observable} from "rxjs";
import {Project} from "../../../core/Project";
import {ProjectService} from "../../../project.service";

@Component({
  selector: 'app-nav-course-list-entry',
  templateUrl: './nav-course-list-entry.component.html',
  styleUrls: ['./nav-course-list-entry.component.scss']
})
export class NavCourseListEntryComponent implements OnInit {

  @Input() course: Course;
  projects: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    if(this.projects.getValue().length < 1) {
      this.fetchProjects();
    }
  }

  fetchProjects() {
    this.projectService.getProjectsForCourse(this.course._id).subscribe(((projects: Project[]) => {
      this.projects.next(projects);
    }));
  }
}