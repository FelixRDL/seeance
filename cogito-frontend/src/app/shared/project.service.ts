import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {Observable, pipe} from "rxjs";
import {Project} from "./core/Project";
import {map} from "rxjs/operators";
import {Course} from "./core/Course";

@Injectable()
export class ProjectService {

  constructor(
    private auth: AuthService,
    private httpClient: HttpClient
  ) { }

  getProjectsForCourse(courseId: string): Observable<Project[]> {
    return this.httpClient.get('/api/course/'+courseId+"/projects",
      {headers: AuthService.getBearerHeader()}).pipe(map(data => <Project[]>data));
  }

  createProject(courseId: string, project: Project): Observable<Project> {
    return this.httpClient.post('/api/course/' + courseId + '/projects/', project, {headers: AuthService.getBearerHeader()}).pipe(map(data => <Project>data));
  }

  deleteProjectById(courseId: string, projectId: string): Observable<string> {
    return this.httpClient.delete('/api/course/' + courseId + '/projects/' + projectId, {headers: AuthService.getBearerHeader()}).pipe(map(data => data['id']));
  }
}
