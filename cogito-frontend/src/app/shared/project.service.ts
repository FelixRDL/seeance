import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "./core/Project";
import {map} from "rxjs/operators";

@Injectable()
export class ProjectService {

  constructor(
    private auth: AuthService,
    private httpClient: HttpClient
  ) { }

  getAutocomplete(q: string): Observable<Project[]>{
    return this.httpClient.get("/api/projects?q=" + q, {headers: AuthService.getBearerHeader()}).pipe(map(data => <Project[]>data));
  }
}
