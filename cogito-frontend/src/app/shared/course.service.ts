import { Injectable } from '@angular/core';
import {Course} from "./core/Course";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {User} from "./core/User";
import {AuthService} from "./auth.service";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CourseService {

  courses: Subject<Course[]> = new Subject<Course[]>();

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  createCourse(course: Course): Observable<Course> {
      return this.httpClient.post('/api/course/',
        course,
        {headers: AuthService.getBearerHeader()})
        .pipe(map(data => <Course>data));
  }

  updateCourses(): void {
    this.getCourses().subscribe((data: Course[]) => {
      this.courses.next(data);
    })
  }

  getCourses(): Observable<Course[]> {
    return this.httpClient.get('/api/course/',
      {headers: AuthService.getBearerHeader()})
      .pipe(map(data => <Course[]>data));
  }
}
