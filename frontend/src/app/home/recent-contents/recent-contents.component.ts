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

  visits: ExtendedVisitStat[];

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.courseService.updateCourses();
    this.userService.getAuthenticatedUser().subscribe((user) => {
      const visits: VisitStat[] = user.visits.reverse();
      this.visits = visits.map((v: VisitStat) =>  {
        const nV: ExtendedVisitStat = v as ExtendedVisitStat;
        nV.routerUrl = v.url.split('/').slice(3);
        return nV;
      });
    });
  }

}

export interface ExtendedVisitStat extends VisitStat {
  routerUrl: string[];
}
