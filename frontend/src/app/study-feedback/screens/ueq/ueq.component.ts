import { Component, OnInit } from '@angular/core';
import {StudyService} from '../../../shared/study.service';

@Component({
  selector: 'app-ueq',
  templateUrl: './ueq.component.html',
  styleUrls: ['./ueq.component.scss']
})
export class UeqComponent implements OnInit {

  item1: number = 0;
  item2: number = 0;
  item3: number = 0;
  item4: number = 0;
  item5: number = 0;
  item6: number = 0;
  item7: number = 0;
  item8: number = 0;

  isSubmitting = false

  constructor(
    public study: StudyService
  ) { }

  ngOnInit(): void {
  }

  proceed(): void {
    this.isSubmitting = true
    const result: any = {
      task: this.study.state.getValue().split('_')[1],
      item1: this.item1,
      item2: this.item2,
      item3: this.item3,
      item4: this.item4,
      item5: this.item5,
      item6: this.item6,
      item7: this.item7,
      item8: this.item8
    };
    this.study.submitUeq(result).subscribe(() => {
      this.wipe()
      if(this.study.state.getValue().split('_').length > 1) {
        this.study.proceedTo('tasks');
      } else {
        this.study.proceedTo('notes')
      }
    });
  }

  cancel() {
    this.wipe()
    this.study.proceedTo('notes')
  }

  wipe() {
    this.isSubmitting = false
    this.item1 = 0
    this.item2 = 0
    this.item3 = 0
    this.item4 = 0
    this.item5 = 0
    this.item6 = 0
    this.item7 = 0
    this.item8 = 0
  }

  isComplete(): boolean {
    return this.item1 !== 0 &&
      this.item2 !== 0 &&
      this.item3 !== 0 &&
      this.item4 !== 0 &&
      this.item5 !== 0 &&
      this.item6 !== 0 &&
      this.item7 !== 0 &&
      this.item8 !== 0
  }
}
