import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Utils} from "../../shared/core/utils";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit, OnChanges {

  @Input() schema: string;
  public displaySchema: BehaviorSubject<any> = new BehaviorSubject<any>({
    "type": "object",
    "properties": {}
  });


  constructor() { }

  ngOnInit(): void {
  }

  private transformSchemaForDisplay(input: any) {
    for(let key of Object.keys(input)) {
      if(!input[key]['title'])
        input[key]['title'] = Utils.titleCaseWord(key.replace('_', ' '))
    }
    return input;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.schema) {
      console.log(changes.schema.currentValue)
      let currentSchema: any = {
        "type": "object",
        "properties": this.transformSchemaForDisplay(changes.schema.currentValue.manifest.config_schema)
      }
      this.displaySchema.next(currentSchema);
    }
  }

  submit(data) {
    console.log("SUBMIT", data)
  }
}
