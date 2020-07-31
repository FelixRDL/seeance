import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task1-1',
  templateUrl: './task1_1.component.html',
  styleUrls: ['./task1_1.component.scss']
})
export class Task1_1Component implements OnInit {

  groupNames: string;
  indicators: string;
  intervention: string;
  supportThroughTool: string;
  indicatorsWithoutTool: string;

  constructor() { }

  ngOnInit(): void {
  }

  proceed(): void {
    return
  }

}
