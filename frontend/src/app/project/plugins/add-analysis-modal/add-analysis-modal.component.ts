import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AnalysisTemplate} from "../../../shared/core/AnalysisTemplate";

@Component({
  selector: 'app-add-analysis-modal',
  templateUrl: './add-analysis-modal.component.html',
  styleUrls: ['./add-analysis-modal.component.scss']
})
export class AddAnalysisModalComponent implements OnInit {

  private template: AnalysisTemplate;

  constructor(public dialogRef: MatDialogRef<AddAnalysisModalComponent>) { }

  ngOnInit(): void {
  }

  confirm(): void {
    this.dialogRef.close(this.template);
  }

  reject(): void {
    this.dialogRef.close(undefined);
  }

  setTemplate(template: AnalysisTemplate) {
    this.template = template;
  }

}
