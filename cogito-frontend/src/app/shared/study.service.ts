import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudyService {

  state: BehaviorSubject<string> = new BehaviorSubject<string>('start');
  allowedStates: string[] = ['start', 'demographics', 'ueq', 'tasks'];

  private lsKey = 'study';
  private lsKeyTasks = 'tasks';

  constructor() {
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

  submitDemographics(demos: any) {
    console.log('Submitting demographics', demos);
  }

  submitTask(taskId: string, results: any) {
    console.log('Submitting Task Result', taskId, results);
  }

  submitUeq(value: any) {
    console.log('Submitting UEQ', value);
  }

  private getNextTask(): string {
    return '';
  }
}
