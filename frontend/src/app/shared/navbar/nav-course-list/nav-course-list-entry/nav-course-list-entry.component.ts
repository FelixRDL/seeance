import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../../../core/Course';
import {BehaviorSubject, forkJoin} from 'rxjs';
import {Project} from '../../../core/Project';
import {ProjectService} from '../../../project.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-nav-course-list-entry',
  templateUrl: './nav-course-list-entry.component.html',
  styleUrls: ['./nav-course-list-entry.component.scss']
})
export class NavCourseListEntryComponent implements OnInit {

  @Input() course: Course;
  @Input() isSelected: boolean;
  projects: Project[];



  constructor(
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    if (!this.projects) {
      this.fetchProjects();
    }
  }

  fetchProjects() {
    forkJoin(this.course.projectIds.map(pid => {
      return this.projectService.getProjectById(this.course._id, pid);
    })).subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }
}
