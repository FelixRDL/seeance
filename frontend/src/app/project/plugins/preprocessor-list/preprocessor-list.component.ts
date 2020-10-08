import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Preprocessor} from "../../../shared/core/Preprocessor";

@Component({
  selector: 'app-preprocessor-list',
  templateUrl: './preprocessor-list.component.html',
  styleUrls: ['./preprocessor-list.component.scss']
})
export class PreprocessorListComponent implements OnInit {

  @Input() preprocessors: Preprocessor[] = [];
  @Input() courseId: string;
  @Input() projectId: string;
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  delete(id: string): void {
    this.onDelete.emit(id);
  }

}
