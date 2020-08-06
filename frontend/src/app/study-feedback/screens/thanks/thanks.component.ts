import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../shared/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  finish(): void {
    this.userService.deleteUser().subscribe(() => {
      this.userService.logout();
      this.router.navigate(['start']);
    });
  }

}
