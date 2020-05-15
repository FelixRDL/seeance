import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

class DialogOverviewExampleDialog {
}

@Component({
  selector: 'app-confirm.modal',
  templateUrl: './confirm.modal.component.html',
  styleUrls: ['./confirm.modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

  reject(): void {
    this.dialogRef.close(false);
  }

}
