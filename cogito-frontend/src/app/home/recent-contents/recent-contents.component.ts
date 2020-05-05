import { Component, OnInit } from '@angular/core';
import {CourseService} from "../../shared/course.service";
import {Course} from "../../shared/core/Course";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-recent-contents',
  templateUrl: './recent-contents.component.html',
  styleUrls: ['./recent-contents.component.scss']
})
export class RecentContentsComponent implements OnInit {

  constructor(
    private courseService: CourseService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    /*this.courseService.createCourse(<Course>{
      'title': 'hello world!',
      'description': 'anice lil course'
    }).subscribe((course: Course) => {
        console.log(course);
    }, error => this.snackBar.open(error.message));*/
  }

}
