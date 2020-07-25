import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class StudyService {

  state: BehaviorSubject<string> = new BehaviorSubject<string>('start');
  allowedStates: string[] = ['start', 'demographics', 'ueq', 'tasks', 'notes', 'thanks'];

  private lsKey = 'study';
  private lsKeyTasks = 'tasks';

  constructor(
    private auth: AuthService,
    private httpClient: HttpClient
  ) {
    const key = localStorage.getItem(this.lsKey);
    if (key) {
      this.state.next(key);
    }
  }

  proceedTo(state: string) {
    if (this.allowedStates.includes(state)) {
      if (state !== 'tasks') {
        this.state.next(state);
        localStorage.setItem(this.lsKey, state);
      } else {

      }
    }
  }

  submitDemographics(demos: any): Observable<any> {
    return this.httpClient.post(`/api/study/demographies`,
      demos,
      {headers: AuthService.getBearerHeader()});
  }

  submitTask(taskId: string, results: any) {
    console.log('Submitting Task Result', taskId, results);
  }

  submitUeq(value: any): Observable<any> {
    return this.httpClient.post(`/api/study/ueq`,
      value,
      {headers: AuthService.getBearerHeader()});
  }

  submitNotes(note: any) {
    return this.httpClient.post(`/api/study/notes`,
      note,
      {headers: AuthService.getBearerHeader()});
  }

  submitUiEvent(event: any) {
    console.log(event);
    this.httpClient.post(`/api/study/uievents`,
      {
        target: event.target.id,
        classes: Object.keys(event.target.classList).map(key => event.target.classList[key]),
        label: event.target.innerText
      },
      {headers: AuthService.getBearerHeader()}).subscribe(() => {});
  }

  private getNextTask(): string {
    return '';
  }
}
