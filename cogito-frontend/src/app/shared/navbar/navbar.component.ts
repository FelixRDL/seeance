import { Component, OnInit } from '@angular/core';
import {CourseService} from "../course.service";
import {Course} from "../core/Course";
import {Subject} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  courses: Subject<Course[]>;

  constructor(
    private courseService: CourseService
  ) {
    this.courses = courseService.courses;
  }

  ngOnInit(): void {
  }

}
