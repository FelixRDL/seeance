import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Course} from "../../shared/core/Course";
import {CourseService} from "../../shared/course.service";
import {UserService} from "../../shared/user.service";
import {User} from "../../shared/core/User";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  private user: User;

  constructor(
    private courses: CourseService,
    private users: UserService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.users.authenticatedUser.subscribe((user: User) => {
      this.user = user;
    })
  }

  onSubmit(course: Course) {
    course.owner = this.user;
    this.courses.createCourse(course).subscribe((course: Course) => {
      console.log("Couse Created!");
      console.log(course);
      // TODO: redirect?
    }, (error) => {
      console.error(error);
      this.snackbar.open(error.error, "OK", {
        duration: 2000
      });
    });
  }
}
