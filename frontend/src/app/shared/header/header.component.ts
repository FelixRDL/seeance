import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../core/User";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  authenticatedUser: User = undefined;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.authenticatedUser.subscribe((user: User) => {
      this.authenticatedUser = user;
    })
  }

  logout(): void {
    this.userService.logout();
  }

}
