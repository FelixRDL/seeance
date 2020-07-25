import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';
import {Project} from './core/Project';
import {map} from 'rxjs/operators';
import {Course} from './core/Course';
import {Analysis} from './core/Analysis';
import {Preprocessor} from './core/Preprocessor';
import {StudyService} from './study.service';

@Injectable()
export class ProjectService {

  constructor(
    private auth: AuthService,
    private httpClient: HttpClient,
    private study: StudyService
  ) {
  }

  addAnalysis(courseId: string, projectId: string, templateName: string) {
    this.study.submitSystemEvent('addAnalysis', {
      courseId,
      projectId,
      templateName
    });
    return this.httpClient.post(`/api/course/${courseId}/projects/${projectId}/analyses`,
      {
        template: templateName
      },
      {headers: AuthService.getBearerHeader()}).pipe(map(data => data as string[])
    );
  }

  removeAnalysis(courseId: string, projectId: string, analysisId: string) {
    this.study.submitSystemEvent('removeAnalysis', {
      courseId,
      projectId,
      analysisId
    });
    return this.httpClient.delete(`/api/course/${courseId}/projects/${projectId}/analyses/${analysisId}`,
      {headers: AuthService.getBearerHeader()}).pipe(map(data => data as string[])
    );
  }

  addPreprocessor(courseId: string, projectId: string, templateName: string) {
    this.study.submitSystemEvent('addPreprocessor', {
      courseId,
      projectId,
      templateName
    });
    return this.httpClient.post(`/api/course/${courseId}/projects/${projectId}/preprocessors`,
      {
        template: templateName
      },
      {headers: AuthService.getBearerHeader()}).pipe(map(data => data as string[])
    );
  }

  removePreprocessor(courseId: string, projectId: string, preprocessorId: string) {
    this.study.submitSystemEvent('addAnalysis', {
      courseId,
      projectId,
      preprocessorId
    });
    return this.httpClient.delete(`/api/course/${courseId}/projects/${projectId}/preprocessors/${preprocessorId}`,
      {headers: AuthService.getBearerHeader()}).pipe(map(data => data as string[])
    );

  }

  getAnalyses(courseId: string, projectId: string) {
    return this.httpClient.get(`/api/course/${courseId}/projects/${projectId}/analyses`,
      {headers: AuthService.getBearerHeader()}).pipe(map(data => {console.log(data); return data; })).pipe(map(data => data as Analysis[])
    );
  }

  getPreprocessors(courseId: string, projectId: string) {
    return this.httpClient.get(`/api/course/${courseId}/projects/${projectId}/preprocessors`,
      {headers: AuthService.getBearerHeader()}).pipe(map(data => data as Preprocessor[])
    );
  }

  getAnalysisView(courseId: string, projectId: string, analysisId: string) {
    return this.httpClient
      .get(`/api/course/${courseId}/projects/${projectId}/analyses/${analysisId}/view`,
        {
          headers: AuthService.getBearerHeader(),
          responseType: 'text'
        })
      .pipe(map(data => data as string)
      );
  }

  //
  // PREPROCESSORS
  //
  getPreprocessorById(courseId: string, projectId: string, preprocessor: string): Observable<Preprocessor> {
    return this.httpClient
      .get(`/api/course/${courseId}/projects/${projectId}/preprocessors/${preprocessor}`,
        {
          headers: AuthService.getBearerHeader()
        }
      )
      .pipe(map(data => data as Preprocessor)
      );
  }

  setPreprocessorConfig(courseId: string, projectId: string, preprocessorId: string, config: any) {
    return this.httpClient
      .post(`/api/course/${courseId}/projects/${projectId}/preprocessors/${preprocessorId}/configure`,
        config,
        {
          headers: AuthService.getBearerHeader()
        })
      .pipe(map(data => data as any)
      );
  }

  //
  // ANALYSES
  //

  getAnalysisById(courseId: string, projectId: string, analysisId: string) {
    return this.httpClient
      .get(`/api/course/${courseId}/projects/${projectId}/analyses/${analysisId}`,
        {
          headers: AuthService.getBearerHeader()
        }
      )
      .pipe(map(data => data as Analysis)
      );
  }

  setAnalysisConfig(courseId: string, projectId: string, analysisId: string, config: any) {
    this.study.submitSystemEvent('configureAnalysis', {
      courseId,
      projectId,
      analysisId,
      config
    });
    return this.httpClient
      .post(`/api/course/${courseId}/projects/${projectId}/analyses/${analysisId}/configure`,
        config,
        {
          headers: AuthService.getBearerHeader()
        })
      .pipe(map(data => data as any)
      );
  }

  getProjectsForCourse(courseId: string): Observable<Project[]> {
    return this.httpClient.get('/api/course/' + courseId + '/projects',
      {headers: AuthService.getBearerHeader()}).pipe(map(data => data as Project[]));
  }

  getProjectById(courseId: string, projectId: string): Observable<Project> {
    return this.httpClient.get('/api/course/' + courseId + '/projects/' + projectId,
      {headers: AuthService.getBearerHeader()}).pipe(map(data => data as Project));
  }

  createProject(courseId: string, project: Project): Observable<Project> {
    this.study.submitSystemEvent('createProject', {
      courseId,
      project
    });
    return this.httpClient.post('/api/course/' + courseId + '/projects/', project,
      {headers: AuthService.getBearerHeader()}).pipe(map(data => data as Project));
  }

  deleteProjectById(courseId: string, projectId: string): Observable<string> {
    this.study.submitSystemEvent('deleteProject', {
      courseId,
      projectId
    });
    return this.httpClient.delete('/api/course/' + courseId + '/projects/' + projectId,
      // @ts-ignore
      {headers: AuthService.getBearerHeader()}).pipe(map(data => data.id));
  }
}
