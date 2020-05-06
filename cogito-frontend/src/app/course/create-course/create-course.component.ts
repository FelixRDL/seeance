import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Course} from "../../shared/core/Course";
import {CourseService} from "../../shared/course.service";
import {UserService} from "../../shared/user.service";
import {User} from "../../shared/core/User";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  private user: User;

  constructor(
    private courses: CourseService,
    private users: UserService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.users.authenticatedUser.subscribe((user: User) => {
      this.user = user;
    })
  }

  onSubmit(course: Course) {
    course.owner = this.user;
    this.courses.createCourse(course).subscribe((course: Course) => {
      this.router.navigate(['/courses', course._id]);
    }, (error) => {
      console.error(error);
      this.snackbar.open(error.error, "OK", {
        duration: 2000
      });
    });
  }
}
