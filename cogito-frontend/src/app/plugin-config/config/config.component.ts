import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  @Input() schema: string;

  constructor() { }

  ngOnInit(): void {
  }

  submit(data) {
    console.log("SUBMIT", data)
  }
}
