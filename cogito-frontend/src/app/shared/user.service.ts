import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {User} from "./core/User";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class UserService {

  authenticatedUser: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) { }

  registerUser(): Observable<User> {
    return this.httpClient.post('/api/user/register', {},
      {headers: AuthService.getBearerHeader(this.authService.getToken())})
      .pipe(map((data) => <User>data));
  }

  getAuthenticatedUser(): Observable<User> {
    return this.httpClient.get('/api/user/',
      {headers: AuthService.getBearerHeader(this.authService.getToken())})
      .pipe(map(data => <User>data));
  }

  setUser(user: User) {
    this.authenticatedUser.next(user);
  }

}
