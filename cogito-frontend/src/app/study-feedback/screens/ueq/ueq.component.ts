import { Component, OnInit } from '@angular/core';
import {StudyService} from '../../../shared/study.service';

@Component({
  selector: 'app-ueq',
  templateUrl: './ueq.component.html',
  styleUrls: ['./ueq.component.scss']
})
export class UeqComponent implements OnInit {

  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  item7: number;
  item8: number;

  constructor(
    private study: StudyService
  ) { }

  ngOnInit(): void {
  }

  proceed(): void {
    const result: any = {
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
      this.study.proceedTo('notes');
    });
  }
}
