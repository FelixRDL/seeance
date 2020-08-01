import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class StudyService {

  state: BehaviorSubject<string> = new BehaviorSubject<string>('start');
  allowedStates: string[] = ['start', 'demographics', 'ueq', 'tasks', 'notes', 'thanks'];
  knownTasks: string[] = ['1x1', '2x1', '3x1', '4x1']
  finishedTasks: string[]

  private lsKey = 'study_state';
  private lsKeyTasks = 'study_tasks';

  constructor(
    private auth: AuthService,
    private httpClient: HttpClient
  ) {
    const key = localStorage.getItem(this.lsKey);
    if (key) {
      this.state.next(key);
    }
    this.finishedTasks = localStorage.getItem(this.lsKeyTasks) ? JSON.parse(localStorage.getItem(this.lsKeyTasks)) : []
  }

  private setState(state: string) {
    this.state.next(state)
    localStorage.setItem(this.lsKey, state)
  }

  private getNextTask(): string {
    const unsolvedTasks = this.knownTasks.filter((t) => !this.finishedTasks.includes(t))
    const index: number = Math.floor((Math.random()*unsolvedTasks.length))
    return unsolvedTasks.length > 0 ? unsolvedTasks[index] : undefined
  }

  proceedTo(state: string) {
    if(state.includes('ueq')) {
      this.setState(state)
    } else if(state === 'tasks') {
      this.setState(this.getNextTask() || 'notes')
    } else {
      if(this.allowedStates.includes(state)) {
        this.setState(state)
      }
    }
  }

  submitDemographics(demos: any): Observable<any> {
    return this.httpClient.post(`/api/study/demographies`,
      demos,
      {headers: AuthService.getBearerHeader()});
  }

  submitTaskStart(taskId: string) {
    return this.httpClient.post(`/api/study/tasks/${taskId}/start`,
      {},
      {headers: AuthService.getBearerHeader()});
  }

  submitTaskComplete(taskId: string, results: any) {
    this.finishedTasks.push(taskId)
    localStorage.setItem(this.lsKeyTasks, JSON.stringify(this.finishedTasks))
    return this.httpClient.post(`/api/study/tasks/${taskId}/stop`,
      results,
      {headers: AuthService.getBearerHeader()});
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

  submitSystemEvent(type: string, event: any) {
    this.httpClient.post(`/api/study/systemevents/${type}`,
      event,
      {headers: AuthService.getBearerHeader()}).subscribe(() => {});
  }

  isStudyFinished(): boolean {
    return this.state.getValue() === 'thanks'
  }

  getNumberOfTotalTasks(): number {
    return this.knownTasks.length
  }

  getNumberOfAbsolvedTasks(): number {
    return this.finishedTasks.length || 0
  }
}
