import { Component, OnInit } from '@angular/core';
import {Project} from "../../shared/core/Project";
import {CourseService} from "../../shared/course.service";
import {Course} from "../../shared/core/Course";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {
  projects: Project[] = [];
  activeCourse: BehaviorSubject<Course> = new BehaviorSubject<Course>(undefined);

  constructor(
    private courses: CourseService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if(params.id) {
        this.courses.getCourseById(params.id).subscribe((course: Course) => {
          this.activeCourse.next(course);
          console.log(course);
        }, (errors) => {
          console.error(errors);
        });
      }
    });
  }

  onProjectSelected(project: Project) {
    // TODO: handle project already existing
    this.projects.push(project);
  }

  onSaveCourse(course: Course) {
    this.snackbar.open("Method not yet implemented!");
    throw new Error("Method not implemented");
  }

}
