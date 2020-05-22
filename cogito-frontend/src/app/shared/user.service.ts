import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {User} from "./core/User";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class UserService {

  authenticatedUser: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private router: Router
  ) {
  }

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

  setAuthenticatedUser(user: User) {
    this.authenticatedUser.next(user);
  }

  getAutocomplete(q: string): Observable<User[]> {
    return this.httpClient.get('/api/user/search?q=' + q, {headers: AuthService.getBearerHeader(this.authService.getToken())})
      .pipe(map(data => <User[]>data));
  }

  getAuthorizeesForCourse(courseId: string): Observable<User[]> {
    return this.httpClient.get('/api/course/' + courseId + '/users/authorizees', {headers: AuthService.getBearerHeader(this.authService.getToken())})
      .pipe(map(data => <User[]>data));
  }

  addAuthorizeeToCourse(courseId: string, user: User): Observable<any> {
    return this.httpClient.post('/api/course/' + courseId + '/users/authorizees', user, {headers: AuthService.getBearerHeader(this.authService.getToken())});
  }
  removeAuthorizeeFromCourse(courseId: string, user: User): Observable<any> {
    return this.httpClient.delete('/api/course/' + courseId + '/users/authorizees/' + user.id, {headers: AuthService.getBearerHeader(this.authService.getToken())});
  }

  logout() {
    this.authenticatedUser.next(undefined);
    this.authService.clearToken();
    this.router.navigate(['start']);
  }

}
