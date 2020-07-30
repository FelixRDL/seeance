import { Component, OnInit } from '@angular/core';
import {CourseService} from "../course.service";
import {Course} from "../core/Course";
import {Observable, Subject} from "rxjs";
import {Project} from "../core/Project";
import {ProjectService} from "../project.service";
import {StudyService} from "../study.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  courses: Course[];

  constructor(
    private courseService: CourseService,
    private projectService: ProjectService,
    private studyService: StudyService
  ) {
    courseService.courses.subscribe((courses: Course[]) => {
      this.courses = courses;
    });
  }

  ngOnInit(): void {
  }

  isStudyFinished(): boolean {
    return this.studyService.isStudyFinished()
  }

}
