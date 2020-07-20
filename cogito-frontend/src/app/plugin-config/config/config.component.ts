import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Utils} from '../../shared/core/utils';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ConfigComponent implements OnInit, OnChanges {

  @Input() schema: string;
  @Input() initModel: any;
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
  isEmptySchema = false;


  model: BehaviorSubject<any> = new BehaviorSubject<any>({});
  formModel: any = {};

  public displaySchema: any = {
    type: 'object',
    properties: {}
  };



  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('schema') && changes.schema.currentValue) {
      const currentSchema: any = {
        type: 'object',
        properties: changes.schema.currentValue
      };
      this.isEmptySchema = Object.keys(changes.schema.currentValue).length === 0;
      this.displaySchema = currentSchema;
    }
    if (changes.hasOwnProperty('initModel') && changes.initModel.currentValue) {
      console.log(changes.initModel.currentValue);
      this.formModel = changes.initModel.currentValue;
    }
  }

  onFormChanges(change: any) {
    this.model.next(change.value);
  }

  save() {
    this.onSave.emit(this.model.getValue());
  }

  cancel() {
    this.onCancel.emit();
  }
}
