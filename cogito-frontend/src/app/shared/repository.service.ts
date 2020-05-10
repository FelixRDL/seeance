import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Repository} from "./core/Repository";

@Injectable()
export class RepositoryService {

  constructor(
    private auth: AuthService,
    private httpClient: HttpClient
  ) { }

  getAutocomplete(q: string): Observable<Repository[]>{
    return this.httpClient.get("/api/repositories?q=" + q, {headers: AuthService.getBearerHeader()}).pipe(map(data => <Repository[]>data));
  }
}
