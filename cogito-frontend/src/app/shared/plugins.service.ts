import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {AnalysisTemplate} from "./core/AnalysisTemplate";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class PluginsService {

  constructor(
    private auth: AuthService,
    private httpClient: HttpClient
  ) {}

  getAnalysisTemplates(): Observable<AnalysisTemplate[]> {
    return this.httpClient.get('/api/components/analyses',
      {headers: AuthService.getBearerHeader()}).pipe(map(data => <AnalysisTemplate[]>data));
  }

  getAnalysisTemplateByName(name: string): Observable<AnalysisTemplate> {
    return this.httpClient.get(`/api/components/analyses/${name}`,
      {headers: AuthService.getBearerHeader()}).pipe(map(data => <AnalysisTemplate>data));
  }
}
