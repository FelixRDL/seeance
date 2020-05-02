import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ls_key: string = 'ghtoken';

  constructor(
    private http: HttpClient
  ) { }

  getTokenFromVerificationCode(code: string): Subject<boolean> {
    if(!code) {
      throw new NoCodeProvidedError();
    } else {
      const subj: Subject<boolean> = new Subject<boolean>();
      // @ts-ignore
      this.http.get<string>('/api/auth/token?code=' + code, {responseType: 'text'}).subscribe((token: string) => {
        this.setToken(token);
        subj.next(true);
        subj.complete();
      });
      return subj;
    }
  }

  isTokenValid(): Observable<boolean> {
    // @ts-ignore
    return this.http.get<string>('/api/auth/token/validate', {headers: AuthService.getBearerHeader(this.getToken()), responseType: 'boolean'});
  }

  setToken(token: string): void {
    localStorage.setItem(this.ls_key, (token));
  }

  clearToken(): void {
    localStorage.removeItem(this.ls_key);
  }

  getToken(): string {
    return localStorage.getItem(this.ls_key);
  }

  static getBearerHeader(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
  }
}

export class NoCodeProvidedError extends Error {
  constructor() {
    super();
    this.message = "No Code Available";
  }
}
