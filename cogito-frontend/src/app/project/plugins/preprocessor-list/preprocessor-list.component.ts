import {Component, Input, OnInit} from '@angular/core';
import {Preprocessor} from "../../../shared/core/Preprocessor";

@Component({
  selector: 'app-preprocessor-list',
  templateUrl: './preprocessor-list.component.html',
  styleUrls: ['./preprocessor-list.component.scss']
})
export class PreprocessorListComponent implements OnInit {

  @Input() preprocessors: Preprocessor[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
