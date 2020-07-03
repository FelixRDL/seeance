import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  @Input() schema: string;
  currentSchema: any = {
    "$schema": "http://json-schema.org/draft-04/hyper-schema#",
    "type": "object",
    "properties": {
      "abc": {
        "type": "string",
        "title": "abc",
        "description": "abc"
      },
      "edx": {
        "type": "string",
        "title": "edx",
        "description": "abc"
      }
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  submit(data) {
    console.log("SUBMIT", data)
  }
}
