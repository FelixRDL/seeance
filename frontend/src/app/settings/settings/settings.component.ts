import { Component, OnInit } from '@angular/core';
import {ConfirmModalComponent} from "../../shared/modals/confirm.modal/confirm.modal.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../shared/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  deleteAccount() {
    let dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        decline: 'Cancel',
        accept: 'Delete',
        title: 'Confirm Account Deletion',
        message: 'Do you really want to delete your account? This action cannot be redone!'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.userService.deleteUser().subscribe(() => {
          this.userService.logout();
          this.router.navigate(['']);
        });
      }
    });
  }

}
