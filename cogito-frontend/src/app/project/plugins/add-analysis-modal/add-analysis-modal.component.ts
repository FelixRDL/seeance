import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-analysis-modal',
  templateUrl: './add-analysis-modal.component.html',
  styleUrls: ['./add-analysis-modal.component.scss']
})
export class AddAnalysisModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddAnalysisModalComponent>) { }

  ngOnInit(): void {
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

  reject(): void {
    this.dialogRef.close(false);
  }

}
