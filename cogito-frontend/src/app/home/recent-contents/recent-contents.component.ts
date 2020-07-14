import { Component, OnInit } from '@angular/core';
import {CourseService} from "../../shared/course.service";
import {Course} from "../../shared/core/Course";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../shared/user.service";
import {User, VisitStat} from "../../shared/core/User";

@Component({
  selector: 'app-recent-contents',
  templateUrl: './recent-contents.component.html',
  styleUrls: ['./recent-contents.component.scss']
})
export class RecentContentsComponent implements OnInit {

  visits: VisitStat[];

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.courseService.updateCourses();
    this.userService.getAuthenticatedUser().subscribe((user) => {
      this.visits = user.visits.reverse();
    });
  }

}
