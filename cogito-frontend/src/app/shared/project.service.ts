import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {Observable, pipe} from "rxjs";
import {Project} from "./core/Project";
import {map} from "rxjs/operators";
import {Course} from "./core/Course";
import {Analysis} from "./core/Analysis";

@Injectable()
export class ProjectService {

  constructor(
    private auth: AuthService,
    private httpClient: HttpClient
  ) {
  }

  addAnalysis(courseId: string, projectId: string, templateName: string) {
    return this.httpClient.post(`/api/course/${courseId}/projects/${projectId}/analyses`,
      {
        template: templateName
      },
      {headers: AuthService.getBearerHeader()}).pipe(map(data => <string[]>data)
    )
  }

  addPreprocessor(courseId: string, projectId: string, templateName: string) {
    return this.httpClient.post(`/api/course/${courseId}/projects/${projectId}/preprocessors`,
      {
        template: templateName
      },
      {headers: AuthService.getBearerHeader()}).pipe(map(data => <string[]>data)
    )
  }

  getAnalyses(courseId: string, projectId: string) {
    return this.httpClient.get(`/api/course/${courseId}/projects/${projectId}/analyses`,
      {headers: AuthService.getBearerHeader()}).pipe(map(data => <Analysis[]>data)
    )
  }

  getAnalysisView(courseId: string, projectId: string, analysisId: string) {
    return this.httpClient
      .get(`/api/course/${courseId}/projects/${projectId}/analyses/${analysisId}/view`,
        {
          headers: AuthService.getBearerHeader(),
          responseType: 'text'
        })
      .pipe(map(data => <string>data)
      )
  }

  getAnalysisById(courseId: string, projectId: string, analysisId: string) {
    return this.httpClient
      .get(`/api/course/${courseId}/projects/${projectId}/analyses/${analysisId}`,
        {
          headers: AuthService.getBearerHeader()
        }
      )
      .pipe(map(data => <Analysis>data)
      )
  }

  setAnalysisConfig(courseId: string, projectId: string, analysisId: string, config: any) {
    return this.httpClient
      .post(`/api/course/${courseId}/projects/${projectId}/analyses/${analysisId}/configure`,
        config,
        {
          headers: AuthService.getBearerHeader()
        })
      .pipe(map(data => <any>data)
      )
  }

  getProjectsForCourse(courseId: string): Observable<Project[]> {
    return this.httpClient.get('/api/course/' + courseId + "/projects",
      {headers: AuthService.getBearerHeader()}).pipe(map(data => <Project[]>data));
  }

  getProjectById(courseId: string, projectId: string): Observable<Project> {
    return this.httpClient.get('/api/course/' + courseId + "/projects/" + projectId,
      {headers: AuthService.getBearerHeader()}).pipe(map(data => <Project>data));
  }

  createProject(courseId: string, project: Project): Observable<Project> {
    return this.httpClient.post('/api/course/' + courseId + '/projects/', project, {headers: AuthService.getBearerHeader()}).pipe(map(data => <Project>data));
  }

  deleteProjectById(courseId: string, projectId: string): Observable<string> {
    return this.httpClient.delete('/api/course/' + courseId + '/projects/' + projectId, {headers: AuthService.getBearerHeader()}).pipe(map(data => data['id']));
  }
}
