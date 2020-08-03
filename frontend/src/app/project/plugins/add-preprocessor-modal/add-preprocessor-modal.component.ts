import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {PreprocessorTemplate} from "../../../shared/core/PreprocessorTemplate";

@Component({
  selector: 'app-add-preprocessor-modal',
  templateUrl: './add-preprocessor-modal.component.html',
  styleUrls: ['./add-preprocessor-modal.component.scss']
})
export class AddPreprocessorModalComponent implements OnInit {

  private template: PreprocessorTemplate;

  constructor(public dialogRef: MatDialogRef<AddPreprocessorModalComponent>) { }

  ngOnInit(): void {
  }

  confirm(): void {
    this.dialogRef.close(this.template);
  }

  reject(): void {
    this.dialogRef.close(undefined);
  }

  setTemplate(template: PreprocessorTemplate) {
    this.template = template;
  }


}
