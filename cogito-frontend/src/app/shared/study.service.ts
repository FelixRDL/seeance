import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudyService {

  state: BehaviorSubject<string> = new BehaviorSubject<string>('start');
  allowedStates: string[] = ['start', 'demographics', 'ueq', 'tasks'];

  private lsKey = 'study';

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
}
