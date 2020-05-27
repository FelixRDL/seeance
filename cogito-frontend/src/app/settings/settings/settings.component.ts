import { Component, OnInit } from '@angular/core';
import {ConfirmModalComponent} from "../../shared/modals/confirm.modal/confirm.modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  deleteAccount() {
    let dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        decline: 'cancel',
        accept: 'delete',
        title: 'Confirm Account Deletion',
        message: 'Do you really want to delete your account? This action cannot be redone!'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        alert("BANG");
      }
    });
  }

}
