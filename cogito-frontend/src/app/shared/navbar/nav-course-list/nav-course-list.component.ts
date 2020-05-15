import {Component, Input, OnInit} from '@angular/core';
import {Course} from "../../core/Course";
import {Observable} from "rxjs";
import {Project} from "../../core/Project";
import {ProjectService} from "../../project.service";

@Component({
  selector: 'app-nav-course-list',
  templateUrl: './nav-course-list.component.html',
  styleUrls: ['./nav-course-list.component.scss']
})
export class NavCourseListComponent implements OnInit {
  @Input() courses: Course[];

  constructor() { }

  ngOnInit(): void {
  }

}
